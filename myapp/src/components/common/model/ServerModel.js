import store from "../../../store";
import Axios from "axios";
import qs from 'qs';
import {ACTION, OPERATION} from "../Config";
import {CHANGE_STORE} from "../../../store/config";
import {checkPhoneNumber, isEmpty} from "../Common";
import {message} from "antd";

//获取我的设备
let getMyDevice = () => {
    let info = store.getState()
    let screen = info[OPERATION.SERVER_INFO][ACTION.DEVICE_SCREEN];
    Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    Axios.post('/device/device/list/', qs.stringify(
        {
            'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
            'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
            // 用户模式id为自己   管理员模式为-1
            'device_user_id': (info[OPERATION.USER_INFO][ACTION.ADMIN_TYPE] === 1)?info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID]:-1,
            'group_id':-1,
            'is_trusteeship':-1,
            'up_id':-1,
            'trust_user_id':-1,
            'is_online':-1,
            'page': (isEmpty(screen[ACTION.PROFIT_PAGE]))?screen[ACTION.PROFIT_PAGE]:1,
            'page_size': (isEmpty(screen[ACTION.PROFIT_PAGE_SIZE]))?screen[ACTION.PROFIT_PAGE_SIZE]:100,
            'keyword': (isEmpty(screen[ACTION.PROFIT_KEYWORD]))?screen[ACTION.PROFIT_KEYWORD]:'',
        })
    ).then(function(data){
        if(data.data.code === 0){
            let info = store.getState()
            info[OPERATION.SERVER_INFO][ACTION.MY_DEVICE] = data.data.data
            const action = {
                type:CHANGE_STORE,
                info:info
            }
            store.dispatch(action)
        }
    })
}

//修改我的设备筛选的在线状态
let minerScreen = (status,key) =>{
    let info = store.getState()
    info[OPERATION.SERVER_INFO][ACTION.DEVICE_SCREEN][key] = status
    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)
}

//修改选择时间
let changePickTime = (range,update,value) =>{
    let info = store.getState();
    if(range === 'all'){
        info[OPERATION.SERVER_INFO][ACTION.DEVICE_SCREEN][ACTION.PROFIT_FROM_DATA] = value
        info[OPERATION.SERVER_INFO][ACTION.DEVICE_SCREEN][ACTION.PROFIT_TO_DATA] = value
    }
    if(range === 'from'){
        info[OPERATION.SERVER_INFO][ACTION.DEVICE_SCREEN][ACTION.PROFIT_FROM_DATA] = value
    }
    if(range === 'to'){
        info[OPERATION.SERVER_INFO][ACTION.DEVICE_SCREEN][ACTION.PROFIT_TO_DATA] = value
    }
    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)
    if(update){
        getMyDevice();
    }
}

//修改设备筛选是否委托状态
let changeEntrust = (status) =>{
    let info = store.getState()
    let current = info[OPERATION.SERVER_INFO][ACTION.DEVICE_SCREEN][ACTION.IS_ENTRUST]
    if(current === status){
        info[OPERATION.SERVER_INFO][ACTION.DEVICE_SCREEN][ACTION.IS_ENTRUST] = 0
    }else{
        info[OPERATION.SERVER_INFO][ACTION.DEVICE_SCREEN][ACTION.IS_ENTRUST] = status
    }
    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)
}

//弹出框操作
let operOpenArea = (status) =>{
    let info = store.getState()
    info[OPERATION.SERVER_INFO][ACTION.DEVICE_SCREEN][ACTION.CURRENT_OPEN] = status

    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)
}

//关闭弹出框
let closeOpenArea = () =>{
    let info = store.getState()
    info[OPERATION.SERVER_INFO][ACTION.DEVICE_SCREEN][ACTION.CURRENT_OPEN] = ''

    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)
}

//取消委托
let cancelTrusteeship = (hid) =>{
    let info = store.getState()
    Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    Axios.post('/user/deviceUser/untrust', qs.stringify(
        {
            'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
            'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
            'hardware_id': hid,
        })
    ).then(function(data){
        if(data.data.code === 0){
            getMyDevice()
        }
    })
}

//解绑设备
let unbindHardware = (hid) =>{
    let info = store.getState()
    Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    Axios.post('/user/deviceUser/unbind/', qs.stringify(
        {
            'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
            'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
            'hardware_id': hid,
        })
    ).then(function(data){
        if(data.data.code === 0){
            getMyDevice()
        }
    })
}

//添加委托
let addEnTrust = (select,account) =>{
    let info = store.getState();
    info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 0;
    info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "操作成功";

    if(isEmpty(select)){
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000;
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "请选择委托对象";
    }
    if(select === 2){
        if(isEmpty(account)){
            info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000;
            info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "请填写用户账号";
        }
        if(!checkPhoneNumber(account)){
            info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000;
            info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "用户账号检测非法";
        }
    }
    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)

    if(info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE]>0){
        return;
    }

    Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    Axios.post('/user/deviceUser/trust/', qs.stringify(
        {
            'user_id': info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
            'token': info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
            'hardware_id': info[OPERATION.SERVER_INFO][ACTION.CURRENT_DEVICE],
            'account':(select === 2)?account:0
        })
    ).then(function(data){
        if(data.data.code === 0){
            message.config({
                top: '50%'
            })
            message.success('委托成功', 2);
            getMyDevice()
        }else{
            let info = store.getState();
            info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = data.data.code;
            info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = data.data.description;

            const action = {
                type:CHANGE_STORE,
                info:info
            }
            store.dispatch(action)
        }
    })
}

let chooseUserEntrust = (uid,type) =>{
    let info = store.getState();
    // 我的委托
    if(type === 1){
        info[OPERATION.SERVER_INFO][ACTION.MY_ENTRUST] = uid;
    }
    // 委托给我
    if(type === 2){
        info[OPERATION.SERVER_INFO][ACTION.ENTRUST_TO_ME] = uid;
    }
    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)
}

let backCommon = (key) =>{
    let info = store.getState();
    info[OPERATION.SERVER_INFO][key] = "";

    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)
}

// 虚拟节点改变目录
let virtualMenuTitle = (title) =>{
    let info = store.getState();
    info[OPERATION.SERVER_INFO][ACTION.VIRTUAL_NODE][ACTION.CURRENT_OPEN] = title;

    const action = {
        type:CHANGE_STORE,
        info:info
    }
    store.dispatch(action)
}


export {virtualMenuTitle,backCommon,chooseUserEntrust,addEnTrust,closeOpenArea,unbindHardware,cancelTrusteeship,getMyDevice,minerScreen,
    changePickTime,changeEntrust,operOpenArea}