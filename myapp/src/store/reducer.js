import { makeUuid } from '../components/common/Common'
import {CHANGE_INPUT, CHANGE_MENU, CHANGE_UUID, SUBMIT_INPUT} from './config'
import {ACTION, HOST, OPERATION} from "../components/common/Config";

const defaultState = {
    [OPERATION.USER_INFO]:{
        [ACTION.LOGIN_STATUS]:1,
        [ACTION.ADMIN_USER_ID]:'',
        [ACTION.ADMIN_TOKEN]:'',
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
    },
    [OPERATION.SYSTEM_INFO]:{
        [ACTION.CLIENT_IP]:'',
        [ACTION.UUID]:makeUuid(),
        [ACTION.SMS_LEFT_TIME]:0,
        [ACTION.SMS_START_COUNT]:0,
        [ACTION.JUMP_COUNT]:0,
    },
    [OPERATION.ERROR_INFO]:{
        [ACTION.ERROR_CODE]:0,
        [ACTION.ERROR_DESCRIPTION]:'',
    },
    [OPERATION.PATH_INFO]:{
        [ACTION.CURRENT_OPERATION]:'',
        [ACTION.CURRENT_PATH]:'',
    },
    [OPERATION.MENU_INFO]:{
        [ACTION.INDEX_MENU]:OPERATION.INDEX_MENU_1,
        [ACTION.SECONDARY_MENU]:{
            [OPERATION.INDEX_MENU_1]:'',
            [OPERATION.INDEX_MENU_2]:'',
            [OPERATION.INDEX_MENU_3]:'',
            [OPERATION.INDEX_MENU_4]:'',
        },
    },
    [OPERATION.POOL_INFO]:{
        [ACTION.POOL_DATA]:{},
    }
}

export default (state = defaultState,action)=>{
    // 值改变时的store处理
    if(action.type === CHANGE_INPUT){
        let newState = JSON.parse(JSON.stringify((state)));
        newState[OPERATION.USER_INFO][action.model][action.key]=action.value;
        return newState;
    }

    // 提交时的store处理
    if(action.type === SUBMIT_INPUT){
        let newState = JSON.parse(JSON.stringify((state)));

        if(action.info[OPERATION.USER_INFO] !== undefined){
            newState[OPERATION.USER_INFO] = {...state[OPERATION.USER_INFO],...action.info[OPERATION.USER_INFO]}
        }
        if(action.info[OPERATION.SYSTEM_INFO] !== undefined){
            newState[OPERATION.SYSTEM_INFO] = {...state[OPERATION.SYSTEM_INFO],...action.info[OPERATION.SYSTEM_INFO]}
        }
        if(action.info[OPERATION.ERROR_INFO] !== undefined){
            newState[OPERATION.ERROR_INFO] = {...state[OPERATION.ERROR_INFO],...action.info[OPERATION.ERROR_INFO]}
        }
        if(action.info[OPERATION.PATH_INFO] !== undefined){
            newState[OPERATION.PATH_INFO] = {...state[OPERATION.PATH_INFO],...action.info[OPERATION.PATH_INFO]}
        }
        if(action.info[OPERATION.MENU_INFO] !== undefined){
            newState[OPERATION.MENU_INFO] = {...state[OPERATION.MENU_INFO],...action.info[OPERATION.MENU_INFO]}
        }
        if(action.info[OPERATION.POOL_INFO] !== undefined){
            newState[OPERATION.POOL_INFO] = {...state[OPERATION.POOL_INFO],...action.info[OPERATION.POOL_INFO]}
        }
        return newState;
    }

    // 修改图片验证码uuid
    if(action.type === CHANGE_UUID){
        let newState = JSON.parse(JSON.stringify((state)));
        newState.uuid = makeUuid();
        return  newState;
    }

    // 修改菜单
    if(action.type === CHANGE_MENU){
        let newState = JSON.parse(JSON.stringify((state)));
        if(action.info.menu === ACTION.INDEX_MENU){
            newState[OPERATION.MENU_INFO][ACTION.INDEX_MENU] = action.info.value
            console.log(action.info.value)
        }
        if(action.info.menu === ACTION.SECONDARY_MENU ){
            newState[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][action.info.current] = action.info.value
        }
        return  newState;
    }

    return state
}