import {SUBMIT_INPUT,CHANGE_MENU} from "../../../store/config";
import store from "../../../store";
import Axios from "axios";
import {ACTION, OPERATION} from "../Config";
import qs from 'qs';

// 更该目录信息
let changeMenuStatus = (menu, value,state) =>{
    let info = {};
    info['menu'] = menu;
    info['value'] = value;
    info['current'] = state[OPERATION.MENU_INFO][ACTION.INDEX_MENU];

    const action = {
        type:CHANGE_MENU,
        info:info
    }
    store.dispatch(action)
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

let changeCommonStatus = (data,name='') =>{
    let info = {};
    info[OPERATION.ERROR_INFO] = {};
    info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = data.data.code;
    info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = data.data.description;
    if(data.data.code === 0){
        if(name === OPERATION.UPDATE_POOL_DATA){
            info[OPERATION.POOL_INFO] = {};
            info[OPERATION.POOL_INFO][ACTION.POOL_DATA] = data.data.data;
        }
    }
    const action = {
        type:SUBMIT_INPUT,
        info:info
    }
    store.dispatch(action)
}

export {changeMenuStatus,getUserPool}

