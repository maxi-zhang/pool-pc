import {SUBMIT_INPUT} from "../../../store/config";
import store from "../../../store";
import Axios from "axios";
import {ACTION, OPERATION} from "../Config";
import qs from 'qs';

// 更该目录信息
let changeMenuStatus = (menu, value,state) =>{
    let info = [];
    if(menu === ACTION.SECONDARY_MENU){
        info[menu] = {[state[ACTION.INDEX_MENU]]:value};
        info[menu] = {...state[ACTION.SECONDARY_MENU],...info[menu]}
    }else{
        info[menu] = value;
    }
    const action = {
        type:SUBMIT_INPUT,
        info:info
    }
    store.dispatch(action)
}

// 获取用户矿场信息并更新
let getUserPool = (state) =>{
    Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    Axios.post('/pool/pool/list/', qs.stringify(
        {
            'user_id': state[ACTION.ADMIN_USER_ID],
            'token': state[ACTION.ADMIN_TOKEN]}
            )
    ).then(function(data){
        changeCommonStatus(data,OPERATION.UPDATE_POOL_DATA);
    });
}

let changeCommonStatus = (data,name='') =>{
    let info = [];
    info[ACTION.ERROR_CODE] = data.data.code;
    info[ACTION.ERROR_DESCRIPTION] = data.data.description;

    if(data.data.code === 0){
        if(name === OPERATION.UPDATE_POOL_DATA){
            info[ACTION.POOL_DATA] = data.data.data;
        }
    }
    const action = {
        type:SUBMIT_INPUT,
        info:info
    }
    store.dispatch(action)
}

export {changeMenuStatus,getUserPool}

