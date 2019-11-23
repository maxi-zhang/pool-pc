import { makeUuid } from '../components/common/Common'
import {CHANGE_INPUT ,CHANGE_UUID,SUBMIT_INPUT} from  './config'
import {ACTION, HOST, OPERATION} from "../components/common/Config";

const defaultState = {
    [ACTION.ERROR_CODE]:0,
    [ACTION.ERROR_DESCRIPTION]:'',
    [ACTION.CURRENT_OPERATION]:'',
    [ACTION.SMS_LEFT_TIME]:0,
    [ACTION.SMS_START_COUNT]:0,
    [ACTION.UUID]:makeUuid(),
    [ACTION.JUMP_COUNT]:0,
    [ACTION.LOGIN_STATUS]:1,
    [ACTION.CLIENT_IP]:'',
    [ACTION.CURRENT_PATH]:'',
    [ACTION.ADMIN_USER_ID]:'',
    [ACTION.ADMIN_TOKEN]:'',
    [ACTION.INDEX_MENU]:OPERATION.INDEX_MENU_1,

    [OPERATION.REGISTER_MODEL]:{
        [ACTION.MOBILE_NUMBER]:'',
        [ACTION.PICTURE_QRCODE]:'',
        [ACTION.SET_PASSWORD]:'',
        [ACTION.RESET_PASSWORD]:'',
        [ACTION.SMS_CODE]:'',
    },
    [OPERATION.LOGIN_MODEL]:{
        [ACTION.MOBILE_NUMBER]:'',
        [ACTION.PICTURE_QRCODE]:'',
        [ACTION.SET_PASSWORD]:'',
        [ACTION.RESET_PASSWORD]:'',
        [ACTION.SMS_CODE]:''
    },
    [OPERATION.FIND_PASSWORD_MODEL]:{
        [ACTION.MOBILE_NUMBER]:'',
        [ACTION.PICTURE_QRCODE]:'',
        [ACTION.SET_PASSWORD]:'',
        [ACTION.RESET_PASSWORD]:'',
        [ACTION.SMS_CODE]:''
    },
    [OPERATION.POOL_MODEL]:{

    }

}
export default (state = defaultState,action)=>{
    // 值改变时的store处理
    if(action.type === CHANGE_INPUT){
        let newState = JSON.parse(JSON.stringify((state)));
        newState[action.model][action.key]=action.value;
        return newState;
    }

    // 提交时的store处理
    if(action.type === SUBMIT_INPUT){
        let newState;
        newState = {...state,...action.info};
        return newState;
    }

    // 修改图片验证码uuid
    if(action.type === CHANGE_UUID){
        let newState = JSON.parse(JSON.stringify((state)));
        newState.uuid = makeUuid();
        return  newState;
    }

    return state
}