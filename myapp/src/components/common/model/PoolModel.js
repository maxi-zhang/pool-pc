import {CHANGE_STORE,CHANGE_MENU} from "../../../store/config";
import store from "../../../store";
import Axios from "axios";
import {ACTION, BHDSET, COIN, FILSET, OPERATION, YTASET} from "../Config";
import qs from 'qs';
import {checkSpecialCharacter, isStringLen,isEmpty} from "../Common";
import {message} from "antd";

// 更该目录信息
let changeMenuStatus = (menu, value) =>{
    let info = store.getState()
    let get = false;
    if(info[OPERATION.MENU_INFO][ACTION.INDEX_MENU] === OPERATION.INDEX_MENU_3 && menu === ACTION.SECONDARY_MENU && value !== info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]){
        get = true;
    }
    if(menu === ACTION.INDEX_MENU){
        info[OPERATION.MENU_INFO][ACTION.INDEX_MENU] = value
    }
    if(menu === ACTION.SECONDARY_MENU){
        info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][info[OPERATION.MENU_INFO][ACTION.INDEX_MENU]] = value
    }
    const action = {
        type:CHANGE_MENU,
        info:info
    }
    store.dispatch(action)
    if(get){
        getPoolInfo(value);
    }
}

// 获取用户矿场信息并更新
let getUserPool = (state) =>{
    Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    Axios.post('/pool/pool/list/', qs.stringify(
        {
            'user_id': state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
            'token': state[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN]}
            )
    ).then(function(data){
        changeCommonStatus(data,OPERATION.UPDATE_POOL_DATA);
    });
}

// 获取当前的矿池组信息
let getPoolCoin = () => {
    let state = store.getState();
    Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    Axios.post("/pool/aPool/list/", qs.stringify(
        {
            'user_id': state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
            'token': state[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN]}
        )
    ).then(function(data){
        changeCommonStatus(data,OPERATION.UPDATE_POOL_COIN);
    });
}

// 清空错误信息
let closeClearError = () =>{
    let info = store.getState();
    info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 0;
    info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = '';
    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)
}

// 打开创建矿场
let openPopupBox = (window) =>{
    let info = store.getState();
    info[OPERATION.PATH_INFO][ACTION.CURRENT_OPEN] = window;
    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)
}

// 关闭操作弹框操作
let closeOpenArea = (area  = '') =>{
    let info = store.getState();
    info[OPERATION.PATH_INFO][ACTION.CURRENT_OPEN] = '';
    if(area === OPERATION.CREATE_POOL_ONE || area === OPERATION.CREATE_POOL_TWO){
        info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.POOL_NAME] = '';
        info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_NAME] = '';
        info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_ID] = 0;
        info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.IF_IS_RENT] = 0;
        info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE] = '';
        info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.POOL_ID] = '';
        info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.CURRENT_COIN] = '';
    }
    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)
}

// 公共提交函数
let changeCommonStatus = (data,name='') =>{
    let info = store.getState();
    info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = data.data.code;
    info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = data.data.description;
    if(data.data.code === 0){
        if(name === OPERATION.UPDATE_POOL_DATA){
            info[OPERATION.POOL_INFO][ACTION.POOL_DATA] = data.data.data;
            for(let i in data.data.data){
                info[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.CURRENT_COIN][data.data.data[i]['up_id']] = data.data.data[i]['mining_list'][0]['mining_type']
            }
            if(info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3] === '' && data.data.data.length>0){
                info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3] = data.data.data[0]['up_id']
                getPoolInfo();
            }
        }
        if(name === OPERATION.UPDATE_POOL_COIN){
            info[OPERATION.POOL_INFO][ACTION.POOL_COIN] = data.data.data;
        }
        if(name === OPERATION.CREATE_POOL_ONE){
            info[OPERATION.PATH_INFO][ACTION.CURRENT_OPEN] = OPERATION.CREATE_POOL_TWO;
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.POOL_ID] = data.data.data['up_id'];
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.CURRENT_COIN] = info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE].split("|")[0];
            getPoolInfo(data.data.data['up_id'])
        }
        if(name === OPERATION.SINGLE_POOL_DATA){
            info[OPERATION.POOL_INFO][data.data.data.up_id] = data.data.data
            if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.CURRENT_COIN][data.data.data.up_id])){
                info[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.CURRENT_COIN][data.data.data.up_id] = info[OPERATION.POOL_INFO][data.data.data.up_id]['mining_info'][0]['mining_type'];
            }
        }
    }
    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)
}

// 创建矿场矿池选择
let poolCoinChoose = (id,name,type) =>{
    let info = store.getState();
    info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_ID] = id;
    info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_NAME] = name;
    info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE] = type;
    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)
}

// 修改是否默认目录
let changeIfDefaultRoot = (status) =>{
    let info = store.getState();
    info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.IF_IS_DEFAULT] = status;
    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)
}

// 修改创建矿场矿场名称
let modifyPoolName = (name) => {
    let info = store.getState();
    info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.POOL_NAME] = name;
    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)
}

// 检查创建矿场步骤1所需参数
let checkCreatePoolOne = () =>{
    let info = store.getState();
    info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 0;
    info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "操作成功";
    if(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.POOL_NAME] === ''){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000;
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "矿场名称不能为空";
    }
    if(isStringLen(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.POOL_NAME])> 40){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000;
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "矿场名称过长请修改";
    }
    if(checkSpecialCharacter(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.POOL_NAME])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000;
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "矿场名称包含特殊字符";
    }
    if(!(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_ID] > 0)){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000;
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "请选择一个矿池";
    }
    if( info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE] === 'YTA' &&  info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.IF_IS_RENT] === 1 ){
        if(!(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.RENT_PRICE] > 0)){
            info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000;
            info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "请填写节点租金";
        }
        if(isNaN(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.RENT_PRICE])){
            info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000;
            info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "节点租金必须为数字";
        }
    }
    if(info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] > 0){
        const action = {
            type:CHANGE_STORE,
            info:info
        }
        store.dispatch(action)
        return false
    }else{
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/pool/pool/add/', qs.stringify(
            {
                'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
                'ap_id':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_ID],
                'pool_type':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.IF_IS_RENT]?3:1,
                'name':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.POOL_NAME],
                'is_default_group':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.IF_IS_DEFAULT]?5:1,
                'price':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.RENT_PRICE]
            })
        ).then(function(data){
            changeCommonStatus(data,OPERATION.CREATE_POOL_ONE)
        });
    }
}

// 修改是否为分组矿场
let changeRentStatus = (status) =>{
    let info = store.getState();
    info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.IF_IS_RENT] = status;
    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)
}

// 修改新建矿场租金
let changeRentPrice = (price) =>{
    let info = store.getState();
    info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.RENT_PRICE] = price;
    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)
}

let changeCurrentCoin = (coin) =>{
    let info = store.getState();
    info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.CURRENT_COIN] = coin;
    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)
}

// 修改钱包信息
let changeCoinValue = (coin,key,value) =>{
    let info = store.getState();
    info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][coin][key] = value;
    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)
}

// 获取单个矿场的全部信息
let getPoolInfo = (pool_id) =>{
    let info = store.getState()
    Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    Axios.post('/pool/pool/get/', qs.stringify(
        {
            'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
            'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
            'up_id': pool_id?pool_id:info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3],
        })
    ).then(function(data){
        changeCommonStatus(data,OPERATION.SINGLE_POOL_DATA)
    });
    delPoolGroupData()
}

// 修改钱包设置
let setPoolWallet = () =>{
    let info = store.getState();
    info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.POOL_NAME] = info[OPERATION.POOL_INFO][info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['name'];
    info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.POOL_NOTICE] = info[OPERATION.POOL_INFO][info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['notice'];
    info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_ID] = info[OPERATION.POOL_INFO][info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['ap_id'];
    info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_NAME] = info[OPERATION.POOL_INFO][info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['ap_name'];
    let type = ''
    if(info[OPERATION.POOL_INFO][info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info'].length > 1){
        type = info[OPERATION.POOL_INFO][info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info'][0]['mining_type'] + '|'+info[OPERATION.POOL_INFO][info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info'][1]['mining_type']
    }else{
        type = info[OPERATION.POOL_INFO][info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info'][0]['mining_type']
    }
    info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE] = type;
    info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.POOL_ID] = info[OPERATION.POOL_INFO][info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['up_id'];
    info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.CURRENT_COIN] = info[OPERATION.POOL_INFO][info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info'][0]['mining_type']
    info[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.POOL_NAME] = info[OPERATION.POOL_INFO][info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['name'];
    info[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.POOL_NOTICE] = info[OPERATION.POOL_INFO][info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['notice'];
    info[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.POOL_ID] = info[OPERATION.POOL_INFO][info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['up_id'];

    info[OPERATION.PATH_INFO][ACTION.CURRENT_OPEN] = OPERATION.POOL_SET;

    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)
}

// 获取矿场当前币设置
let getPoolCoinSet = () => {
    let info = store.getState();
    let ifYTA = 0;
    let ifFIL = 0;
    let ifBHD = 0;

    // alert(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.POOL_ID])
    for(let i = 0;i<info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE].split("|").length;i++ ){
        if(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE].split("|")[i] === COIN.YTA){
            ifYTA = 1;
        }
        if(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE].split("|")[i] === COIN.BHD){
            ifBHD = 1;
        }
        if(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE].split("|")[i] === COIN.FIL){
            ifFIL = 1;
        }
    }

    if(ifFIL === 1){
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/pool/pool/miningGet/', qs.stringify(
            {
                'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
                'up_id': info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.POOL_ID],
                'mining_type':'FIL'
            })
        ).then(function(data){
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.MINING_ID] = data.data.data['mining_id']
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.MIN_INCOME] = data.data.data['min_income']
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.GAS_PRICE] = data.data.data['gas_price']
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.GAS_LIMIT] = data.data.data['gas_limit']
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.PRICE] = data.data.data['price']
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.BLOCK] = data.data.data['block']

            const action = {
                type:CHANGE_STORE,
                info:info
            }
            console.log(info)
            store.dispatch(action)
        });
    }
    if(ifBHD === 1){
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/pool/pool/miningGet/', qs.stringify(
            {
                'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
                'up_id': info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.POOL_ID],
                'mining_type':'BHD'
            })
        ).then(function(data){
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.MINING_ID] = data.data.data['mining_id']
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.MIN_INCOME] = data.data.data['min_income']
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.GAS_PRICE] = data.data.data['gas_price']
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.GAS_LIMIT] = data.data.data['gas_limit']
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.PRICE] = data.data.data['price']
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.BLOCK] = data.data.data['block']

            const action = {
                type:CHANGE_STORE,
                info:info
            }
            console.log(info)
            store.dispatch(action)

        });
    }
    if(ifYTA === 1){
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/pool/pool/miningYTAGet/', qs.stringify(
            {
                'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
                'up_id': info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.POOL_ID],
            })
        ).then(function(data){
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.NODE_COUNT] = data.data.data['node_count']
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.PORT_FROM] = data.data.data['port_from']
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.PORT_TO] = data.data.data['port_to']
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.DISK_SPACE] = data.data.data['disk_space']
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.USER_MORTGAGE] = data.data.data['user_mortgage']
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.MORTGAGE_BALANCE] = data.data.data['mortgage_balance']
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.USER_MANAGE] = data.data.data['user_manage']
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.AlIANCE_POOL_ID] = data.data.data['aliance_pool_id']
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.ALIANCE_POOL_KEY] = data.data.data['aliance_pool_key']
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.ALIANCE_POOL_SPACE] = data.data.data['aliance_pool_space']
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.MINING_ID] = data.data.data['mining_id']
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.MORTGAGE_KEY] = data.data.data['mortgage_key']
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.MANAGE_KEY] = data.data.data['manage_key']
            info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.HOST_URI] = data.data.data['host_uri']
            const action = {
                type:CHANGE_STORE,
                info:info
            }
            console.log(info)
            store.dispatch(action)
        });
    }
}

//检查设置钱包地址页面
let checkCreatePoolTwo = () =>{
    let info = store.getState();
    info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 0;
    info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = '操作成功';
    for(let i = 0; i< info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE].split("|").length; i++){
        if(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE].split("|")[i] === COIN.YTA){
            info = checkYTASet(info)
        }
        if(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE].split("|")[i] === COIN.BHD){
            info = checkBHDSet(info)
        }
        if(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE].split("|")[i] === COIN.FIL){
            info = checkFILSet(info)
        }
    }
    if(info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] > 0){
        const action = {
            type:CHANGE_STORE,
            info:info
        }
        console.log(info)
        store.dispatch(action)
    }else{
        if(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE].split("|").indexOf(COIN.BHD) !== -1){
            if(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE].split("|").indexOf(COIN.FIL) !== -1){
                submitBHDSet(submitFILSet)
            }else if(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE].split("|").indexOf(COIN.YTA) !== -1){
                submitBHDSet(submitYTASet)
            }else{
                submitBHDSet()
            }
        }else{
            if(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE].split("|").indexOf(COIN.FIL) !== -1){
                if(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE].split("|").indexOf(COIN.YTA) !== -1){
                    submitFILSet(submitYTASet)
                }else{
                    submitFILSet()
                }
            }else{
                submitYTASet()
            }
        }
    }
}

// 检查各种币的设置
let checkYTASet = (info) => {
    if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.NODE_COUNT])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "YTA节点数不能为空"
    }
    if(!(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.DISK_SPACE] > 0) || isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.DISK_SPACE])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "YTA储存空间大小不合法"
    }
    if(!(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.MORTGAGE_BALANCE] > 0)){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "YTA抵押额度不合法"
    }
    let r =/^\d+(\.\d+)?$/;
    if(!r.test(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.MORTGAGE_BALANCE]) || isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.MORTGAGE_BALANCE]) ){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "YTA抵押额度为正实数"
    }
    if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.PORT_FROM])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "YTA端口开始点不能为空"
    }
    if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.PORT_TO])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "YTA端口结束点不能为空"
    }
    if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.USER_MORTGAGE])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "YTA抵押用户名不能为空"
    }
    if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.USER_MANAGE])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "YTA管理员账号不能为空"
    }
    if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.AlIANCE_POOL_ID])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "YTA矿池ID不能为空"
    }
    if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.ALIANCE_POOL_KEY])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "YTA矿池密钥不能为空"
    }
    if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.ALIANCE_POOL_SPACE])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "YTA矿池配额不能为空"
    }
    if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.MINING_ID])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "YTA收益账号不能为空"
    }
    if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.MORTGAGE_KEY])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "YTA抵押账号私钥不能为空"
    }
    if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.MANAGE_KEY])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "YTA管理账号私钥不能为空"
    }
    if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.HOST_URI])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "YTA查询服务器不能为空"
    }

    if(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.PORT_TO] <  info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.PORT_FROM] > 34999){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "YTA端口结束点不能小于开始点"
    }
    if(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.PORT_FROM] < 31000 || info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.PORT_FROM] > 34999){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "YTA端口开始点取值31000-34999"
    }
    if(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.PORT_TO] < 31000 || info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.PORT_TO] > 34999){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "YTA端口结束点取值31000-34999"
    }

    return info
}
let checkBHDSet = (info) => {
    if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.MINING_ID])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "BHD钱包地址不能为空"
    }
    if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.GAS_LIMIT])|| parseFloat(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.GAS_LIMIT]) == 0){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "BHD最高手续费不能为空"
    }
    if(isNaN(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.GAS_LIMIT])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "BHD最高手续费必须为数字"
    }
    if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.GAS_PRICE])|| parseFloat(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.GAS_PRICE]) == 0){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "BHD最低手续费不能为空"
    }
    if(isNaN(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.GAS_PRICE])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "BHD最低手续费必须为数字"
    }
    if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.PRICE])|| parseFloat(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.PRICE]) == 0 ){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "BHD报价不能为空"
    }
    if(isNaN(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.PRICE])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "BHD报价必须为数字"
    }
    if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.BLOCK])|| parseFloat(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.BLOCK]) == 0 ){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "BHD有效区块数不能为空"
    }
    if(isNaN(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.BLOCK])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "BHD有效区块数为数字"
    }
    if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.MIN_INCOME]) || parseFloat(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.MIN_INCOME]) == 0  ){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "BHD最小打款数不能为空"
    }
    if(parseFloat(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.GAS_LIMIT]) < parseFloat(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.GAS_PRICE])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "BHD最高手续费不能低于最低手续费"
    }

    return info
}
let checkFILSet = (info) =>{
    if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.MINING_ID])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "FIL钱包地址不能为空"
    }
    if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.GAS_LIMIT])|| parseFloat(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.GAS_LIMIT]) == 0 ){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "FIL最高手续费不能为空"
    }
    if(isNaN(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.GAS_LIMIT])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "FIL最高手续费必须为数字"
    }
    if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.GAS_PRICE])|| parseFloat(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.GAS_PRICE]) == 0 ){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "FIL最低手续费不能为空"
    }
    if(isNaN(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.GAS_PRICE])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "FIL最低手续费必须为数字"
    }
    if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.PRICE])|| parseFloat(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.PRICE]) == 0){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "FIL报价不能为空"
    }
    if(isNaN(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.PRICE])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "FIL报价必须为数字"
    }
    if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.BLOCK]) || parseFloat(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.BLOCK]) == 0 ){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "FIL有效区块数不能为空"
    }
    if(isNaN(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.BLOCK])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "FIL有效区块数为数字"
    }
    if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.MIN_INCOME]) || parseFloat(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.MIN_INCOME]) == 0  ){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "FIL最小打款数不能为空"
    }
    if(parseFloat(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.GAS_LIMIT]) < parseFloat(info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.GAS_PRICE])){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "FIL最高手续费不能低于最低手续费"
    }

    return info
}

//提交各种币的设置
let submitYTASet = (func) =>{
    let info = store.getState()
    Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    Axios.post('/pool/pool/miningYTAUpdate/', qs.stringify(
        {
            'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
            'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
            'up_id':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.POOL_ID],
            'mining_type':'YTA',
            'disk_space':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.DISK_SPACE],
            'user_mortgage':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.USER_MORTGAGE],
            'mortgage_balance':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.MORTGAGE_BALANCE],
            'user_manage':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.USER_MANAGE],
            'aliance_pool_id':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.AlIANCE_POOL_ID],
            'mining_id':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.MINING_ID],
            'mortgage_key':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.MORTGAGE_KEY],
            'manage_key':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.MANAGE_KEY],
            'aliance_pool_key':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.ALIANCE_POOL_KEY],
            'node_count':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.NODE_COUNT],
            'port_from':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.PORT_FROM],
            'port_to':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.PORT_TO],
            'host_uri':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.HOST_URI],
            'aliance_pool_space':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.ALIANCE_POOL_SPACE],
        })
    ).then(function(data){
        submitBack(data,func)
    });
}
let submitFILSet = (func) =>{
    let info = store.getState()
    Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    Axios.post('/pool/pool/miningUpdate/', qs.stringify(
        {
            'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
            'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
            'up_id':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.POOL_ID],
            'mining_type':'FIL',
            'mining_id':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.MINING_ID],
            'gas_limit':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.GAS_LIMIT],
            'gas_price':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.GAS_PRICE],
            'price':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.PRICE],
            'block':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.BLOCK],
            'min_income':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.MIN_INCOME],
            'status':-1,
        })
    ).then(function(data){
        submitBack(data,func)
    });
}
let submitBHDSet = (func) =>{
    let info = store.getState()
    Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    Axios.post('/pool/pool/miningUpdate/', qs.stringify(
        {
            'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
            'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
            'up_id':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.POOL_ID],
            'mining_type':'BHD',
            'mining_id':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.MINING_ID],
            'gas_limit':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.GAS_LIMIT],
            'gas_price':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.GAS_PRICE],
            'price':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.PRICE],
            'block':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.BLOCK],
            'min_income':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][BHDSET.MIN_INCOME],
        })
    ).then(function(data){
        submitBack(data,func)
    });
}
let submitBack = (data,func) =>{
    let info = store.getState()
    if(data.data.code === 0){
        if(isEmpty(func)){
            message.config({
                top: '50%'
            })
            message.success('设置成功', 2);
        }else{
            func();
        }
    }else{
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = data.data.code
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = data.data.description
        const action = {
            type:CHANGE_STORE,
            info:info
        }
        console.log(info)
        store.dispatch(action)
    }
}

// 修改矿场信息redux
let changePoolInfo = (key,value) =>{
    let info = store.getState();
    info[OPERATION.POOL_INFO][OPERATION.POOL_SET][key] = value
    const action = {
        type:CHANGE_STORE,
        info:info
    }
    console.log(info)
    store.dispatch(action)
    if(key !== ACTION.POOL_NAME && key !== ACTION.POOL_NOTICE){
        submitWarning(info)
    }
}

let submitWarning = (info) =>{
    let warning = 0 ;
    if(info[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.WARNING_BAD_LINE]){
        warning = warning + 2;
    }
    if(info[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.WARNING_NO_ROOM]){
        warning = warning + 4;
    }
    if(info[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.WARNING_TEMP_CPU]){
        warning = warning + 8;
    }
    if(info[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.WARNING_TEMP_DISK]){
        warning = warning + 16;
    }
    Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    Axios.post('/pool/pool/warningUpdate/', qs.stringify(
        {
            'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
            'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
            'up_id':info[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.POOL_ID],
            'warning': warning,
            'warning_rate':info[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.WARNING_RATE],
        })
    ).then(function(data){
        console.log(data)
    });

}
// 矿场开始挖矿，关闭挖矿
let changeMiningStatus = (type,status) =>{
    let info = store.getState()
    if(type === COIN.YTA){
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/pool/pool/miningYTAUpdate/', qs.stringify(
            {
                'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
                'up_id':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.POOL_ID],
                'status':status,
            })
        ).then(function(data){
            getPoolInfo()
        });
    }else{
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/pool/pool/miningUpdate/', qs.stringify(
            {
                'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
                'up_id':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.POOL_ID],
                'status':status,
                'mining_type':type,
                'mining_id':'',
                'gas_price':-1,
                'gas_limit':-1,
                'price':-1,
                'block':-1,
                'min_income':-1,
            })
        ).then(function(data){
            getPoolInfo()
        });
    }
}
// 获取告警信息
let getWarningInfo = () => {
    let info = store.getState();
    Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    Axios.post('/pool/pool/warningGet/', qs.stringify(
        {
            'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
            'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
            'up_id':info[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.POOL_ID],
        })
    ).then(function(data){
        if(data.data.code === 0){
            info[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.WARNING_RATE] = data.data.data['warning_rate']
            let arr = data.data.data['warning'].toString("2");

            arr = arr.split("").reverse();

            if(arr[1] == 1){
                info[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.WARNING_BAD_LINE] = true
            }else{
                info[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.WARNING_BAD_LINE] = false
            }
            if(arr[2] == 1){
                info[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.WARNING_NO_ROOM] = true
            }else{
                info[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.WARNING_NO_ROOM] = false
            }
            if(arr[3] == 1){
                info[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.WARNING_TEMP_CPU] = true
            }else{
                info[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.WARNING_TEMP_CPU] = false
            }
            if(arr[4] == 1){
                info[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.WARNING_TEMP_DISK] = true
            }else{
                info[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.WARNING_TEMP_DISK] = false
            }

            const action = {
                type:CHANGE_STORE,
                info:info
            }
            store.dispatch(action)
        }
    });
}

// 矿场设置修改
let submitPoolSetModify = () =>{
    let info = store.getState()
    let name = info[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.POOL_NAME]
    let notice = info[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.POOL_NOTICE]
    info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 0;
    info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "操作成功"
    message.config({
        top: '50%'
    })

    if(isEmpty(name)){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000;
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "矿场名称不能为空"
    }
    const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
        regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

    if(regEn.test(name) || regCn.test(name)) {
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000;
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "矿场名称包含特殊字符"
    }
    if(isStringLen(name)>40){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000;
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "矿场名称过长请修改"
    }
    if(info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] ===0 ){
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/pool/pool/update/', qs.stringify(
            {
                'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
                'up_id':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.POOL_ID],
                'ap_id':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_ID],
                'name':name
            })
        ).then(function(data){
            if(data.data.code === 0){
                if(isEmpty(notice)){
                    info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000;
                    info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "矿场公告不能为空"
                }
                if(info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] ===0 ){
                    Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                    Axios.post('/pool/pool/noticeUpdate/', qs.stringify(
                        {
                            'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                            'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
                            'up_id':info[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.POOL_ID],
                            'notice': notice
                        })
                    ).then(function(data){
                        if(data.data.code === 0){
                            message.success('设置成功', 2);
                        }else{
                            message.info(data.data.description, 2);
                        }
                    });
                }else{
                    message.info(info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION], 2);
                }
            }else{
                message.info(data.data.description, 2);
            }
        });
    }else{
        message.info(info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION], 2);
    }
}

//---------------------------------------------------

// 获取可以添加的矿机
let getCanAddMiner = () =>{
    let info = store.getState()
    info[OPERATION.POOL_INFO][OPERATION.ADD_MINER][ACTION.CAN_ADD_MINER] = {}
    info[OPERATION.POOL_INFO][OPERATION.ADD_MINER][ACTION.CHOOSE_CAN_ADD] = []
    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)

    Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    Axios.post('/device/device/list/', qs.stringify(
        {
            'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
            'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
            'device_user_id':-1,
            'trust_user_id':info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
            'up_id':0,
            'group_id':-1,
            'is_trusteeship':-1,
            'is_online':-1,
            'page_size':1000,
        })
    ).then(function(data){
        info[OPERATION.POOL_INFO][OPERATION.ADD_MINER][ACTION.CAN_ADD_MINER] = data.data.data.data
        const action = {
            type:CHANGE_STORE,
            info:info
        }
        store.dispatch(action)
    })
}

// 获取可以删除的矿机
let getCanDelMiner = () =>{
    let info = store.getState()
    info[OPERATION.POOL_INFO][OPERATION.DELETE_MINER][ACTION.CAN_DEL_MINER] = {}
    info[OPERATION.POOL_INFO][OPERATION.DELETE_MINER][ACTION.CHOOSE_CAN_DEL] = []
    info[OPERATION.POOL_INFO][OPERATION.DELETE_MINER][ACTION.IF_CLEAR] = true
    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)

    Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    Axios.post('/device/device/list/', qs.stringify(
        {
            'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
            'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
            'device_user_id':-1,
            'trust_user_id':info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
            'up_id':info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3],
            'group_id':-1,
            'is_trusteeship':-1,
            'is_online':-1,
            'page_size':1000,
        })
    ).then(function(data){
        info[OPERATION.POOL_INFO][OPERATION.DELETE_MINER][ACTION.CAN_DEL_MINER] = data.data.data.data
        const action = {
            type:CHANGE_STORE,
            info:info
        }
        store.dispatch(action)
    })
}

// 已选择矿机修改
let addChooseMiner = (checked,hid,operation='') =>{
    let info = store.getState()
    if(operation === OPERATION.DELETE_MINER){
        if(checked){
            info[OPERATION.POOL_INFO][OPERATION.DELETE_MINER][ACTION.CHOOSE_CAN_DEL].push(hid)
        }else{
            let index = info[OPERATION.POOL_INFO][OPERATION.DELETE_MINER][ACTION.CHOOSE_CAN_DEL].indexOf(hid);
            info[OPERATION.POOL_INFO][OPERATION.DELETE_MINER][ACTION.CHOOSE_CAN_DEL].splice(index,1)
        }
    }else if(operation === OPERATION.ADD_MINER){
        if(checked){
            info[OPERATION.POOL_INFO][OPERATION.ADD_MINER][ACTION.CHOOSE_CAN_ADD].push(hid)
        }else{
            let index = info[OPERATION.POOL_INFO][OPERATION.ADD_MINER][ACTION.CHOOSE_CAN_ADD].indexOf(hid);
            info[OPERATION.POOL_INFO][OPERATION.ADD_MINER][ACTION.CHOOSE_CAN_ADD].splice(index,1)
        }
    }
    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)
}

// 修改是否清空矿机数据
let changeIfClear = (status) =>{
    let info = store.getState()
    info[OPERATION.POOL_INFO][OPERATION.DELETE_MINER][ACTION.IF_CLEAR] = status
    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)
}

let addPoolMiner = () =>{
    let info = store.getState()
    for(let i in info[OPERATION.POOL_INFO][OPERATION.ADD_MINER][ACTION.CHOOSE_CAN_ADD]){
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/pool/poolDevice/add/', qs.stringify(
            {
                'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
                'hardware_id':info[OPERATION.POOL_INFO][OPERATION.ADD_MINER][ACTION.CHOOSE_CAN_ADD][i],
                'up_id':info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]
            })
        ).then(function(data){
            if(data.data.code === 0){
                if(i == (info[OPERATION.POOL_INFO][OPERATION.ADD_MINER][ACTION.CHOOSE_CAN_ADD].length -1)){
                    getCanAddMiner();
                }
            }
        })
    }
}

// 删除矿场矿机
let delPoolMiner = () => {
    let info = store.getState()
    for(let i in info[OPERATION.POOL_INFO][OPERATION.DELETE_MINER][ACTION.CHOOSE_CAN_DEL]){
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/pool/poolDevice/delete/', qs.stringify(
            {
                'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
                'hardware_id':info[OPERATION.POOL_INFO][OPERATION.DELETE_MINER][ACTION.CHOOSE_CAN_DEL][i],
                'is_clear':info[OPERATION.POOL_INFO][OPERATION.DELETE_MINER][ACTION.IF_CLEAR]?1:0,
            })
        ).then(function(data){
            if(data.data.code === 0){
                if(i == (info[OPERATION.POOL_INFO][OPERATION.DELETE_MINER][ACTION.CHOOSE_CAN_DEL].length -1)){
                    getCanDelMiner();
                }
            }
        })
    }
}

//---------------------------------------------------
// 矿场当前选择的币种
let changePoolCoin = (coin) =>{
    let info = store.getState();
    info[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.CURRENT_COIN][info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]] = coin;

    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)
}

// 矿场当前选择的操作模块
let changeIndex = (module) =>{
    let info = store.getState();
    info[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.POOL_INDEX][info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]] = module;

    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)
}

// --------------------------------------------------

//添加矿场分组初始化
let addPoolGroupData = (prop) =>{
    let info = store.getState();
    info[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.ADD_GROUP][info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]] = prop;
    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)
}

//删除分组初始化
let delPoolGroupData = () =>{
    let info = store.getState();
    if(isEmpty(info[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.DEL_GROUP][info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]])){
        info[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.DEL_GROUP][info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]] = {};
        info[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.CHOOSE_DEL_GROUP] = []
        const action = {
            type:CHANGE_STORE,
            info:info
        }
        store.dispatch(action);
    }
    Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    Axios.post('/pool/poolGroup/list/', qs.stringify(
        {
            'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
            'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
            'up_id':info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3],
        })
    ).then(function(data){
        if(data.data.code === 0){
            info[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.DEL_GROUP][info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]] = data.data.data
            const action = {
                type:CHANGE_STORE,
                info:info
            }
            store.dispatch(action);
        }
    })

}

// 添加分组
let addPoolGroup = () =>{
    let info = store.getState()
    closeClearError()
    let group_name = info[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.ADD_GROUP][info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]];
    if(isEmpty(group_name)){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000;
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "矿场组名称不能为空";
    }
    if(checkSpecialCharacter(group_name)){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000;
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "矿场组名称包含特殊字符";
    }
    if(isStringLen(group_name)> 40){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000;
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "矿场组名称过长请修改";
    }
    if(info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] > 0){
        const action = {
            type:CHANGE_STORE,
            info:info
        }
        store.dispatch(action)
    }else{
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/pool/poolGroup/add/', qs.stringify(
            {
                'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
                'up_id':info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3],
                'name':group_name
            })
        ).then(function(data){
            if(data.data.code === 0){
                message.config({
                    top: '50%'
                })
                message.success('添加成功', 2);
            }else{
                info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = data.data.code;
                info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = data.data.description;
                const action = {
                    type:CHANGE_STORE,
                    info:info
                }
                store.dispatch(action)
            }
        });
    }
}

// 选择要删除的分组
let selectDeleteGroup = (group,status)=>{
    let info = store.getState();
    if(status){
        info[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.CHOOSE_DEL_GROUP].push(group)
    }else{
        let index = info[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.CHOOSE_DEL_GROUP].indexOf(group);
        info[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.CHOOSE_DEL_GROUP].splice(index,1)
    }
    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action);
}

// 删除矿场分组操作
let deleteGroup = () =>{
    let info = store.getState()
    for(let i in info[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.CHOOSE_DEL_GROUP]){
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/pool/poolGroup/delete/', qs.stringify(
            {
                'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
                'group_id':info[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.CHOOSE_DEL_GROUP][i],
            })
        ).then(function(data){
            if(data.data.code === 0){
                if(i == (info[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.CHOOSE_DEL_GROUP].length -1)){
                    delPoolGroupData();
                }
            }
        })
    }
}

// 获取未分组矿机
let getUngroupInfo = () =>{
    let info = store.getState()
    Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    Axios.post('/pool/poolGroup/get/', qs.stringify(
        {
            'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
            'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
            'up_id':info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3],
            'group_id':0,
            'mining_type':''
        })
    ).then(function(data){
        if(data.data.code === 0){
            info[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.UNGROUP_INFO][info[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]] = data.data.data;
            const action = {
                type:CHANGE_STORE,
                info:info
            }
            store.dispatch(action);
        }
    })
}


export {changeIfClear,deleteGroup,selectDeleteGroup,delPoolGroupData,addPoolGroup,addPoolGroupData,changeIndex,changePoolCoin,addPoolMiner,delPoolMiner,addChooseMiner,getUngroupInfo
    ,getCanAddMiner,getCanDelMiner,submitPoolSetModify,getWarningInfo,changeMiningStatus,changePoolInfo,getPoolCoinSet,setPoolWallet,getPoolInfo,changeCoinValue,
    changeMenuStatus,getUserPool,openPopupBox,closeOpenArea,getPoolCoin,closeClearError,poolCoinChoose,changeIfDefaultRoot,modifyPoolName,checkCreatePoolOne,changeRentStatus,
    changeRentPrice,checkCreatePoolTwo,changeCurrentCoin}

