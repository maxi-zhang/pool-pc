import { makeUuid } from '../components/common/Common'
import {CHANGE_INPUT, CHANGE_MENU, CHANGE_STORE, CHANGE_UUID, SUBMIT_INPUT} from './config'
import {ACTION, BHDSET, COIN, FILSET, HOST, OPERATION, YTASET} from "../components/common/Config";

const defaultState = {
    [OPERATION.USER_INFO]:{
        [ACTION.LOGIN_STATUS]:1,
        [ACTION.ADMIN_USER_ID]:'',
        [ACTION.ADMIN_TOKEN]:'',
        [ACTION.ADMIN_ACCOUNT]:'',
        [ACTION.ADMIN_USER_NAME]:'',
        [ACTION.ADMIN_USER_ICON]:'',
        [ACTION.ADMIN_TYPE]:1,
        [ACTION.TENANT_ID]:0,
        [ACTION.CAN_CHANGE_TENANT]:0,
        [ACTION.CAN_CHANGE_TYPE]:0,
        [ACTION.TENANT_PERMISSION]:'',

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
        [ACTION.CURRENT_OPEN]:'',
    },
    [OPERATION.MENU_INFO]:{
        [ACTION.INDEX_MENU]:OPERATION.INDEX_MENU_1,
        [ACTION.SECONDARY_MENU]:{
            [OPERATION.INDEX_MENU_1]:'',
            [OPERATION.INDEX_MENU_2]:OPERATION.SECOND_MENU_4,
            [OPERATION.INDEX_MENU_3]:'',
            [OPERATION.INDEX_MENU_4]:'',
        },
        [ACTION.CURRENT_GROUP]:{},
    },
    [OPERATION.POOL_INFO]:{
        [OPERATION.CREATE_POOL]:{
            [ACTION.POOL_NAME]:'',
            [ACTION.POOL_NOTICE]:'',
            [ACTION.AP_ID]:0,
            [ACTION.AP_NAME]:'',
            [ACTION.IF_IS_DEFAULT]:1,
            [ACTION.IF_IS_RENT]:0,
            [ACTION.RENT_PRICE]:0,
            [ACTION.AP_TYPE]:'',
            [ACTION.POOL_ID]:0,
            [ACTION.CURRENT_COIN]:'',
            [COIN.FIL]:{
                [FILSET.MINING_ID]:'',
                [FILSET.GAS_LIMIT]:'',
                [FILSET.GAS_PRICE]:'',
                [FILSET.PRICE]:'',
                [FILSET.BLOCK]:'',
                [FILSET.MIN_INCOME]:'',
            },
            [COIN.YTA]:{
                [YTASET.DISK_SPACE]:'',
                [YTASET.USER_MORTGAGE]:'',
                [YTASET.MORTGAGE_BALANCE]:'',
                [YTASET.USER_MANAGE]:'',
                [YTASET.AlIANCE_POOL_ID]:'',
                [YTASET.MINING_ID]:'',
                [YTASET.MORTGAGE_KEY]:'',
                [YTASET.MANAGE_KEY]:'',
                [YTASET.ALIANCE_POOL_KEY]:'',
                [YTASET.NODE_COUNT]:'',
                [YTASET.PORT_FROM]:'',
                [YTASET.PORT_TO]:'',
                [YTASET.HOST_URI]:'',
                [YTASET.ALIANCE_POOL_SPACE]:'',
            },
            [COIN.BHD]:{
                [BHDSET.MINING_ID]:'',
                [BHDSET.GAS_LIMIT]:'',
                [BHDSET.GAS_PRICE]:'',
                [BHDSET.PRICE]:'',
                [BHDSET.BLOCK]:'',
                [BHDSET.MIN_INCOME]:'',
            }

        },
        [ACTION.POOL_DATA]:{

        },
        [ACTION.POOL_COIN]:{

        },
        [OPERATION.POOL_MAIN]:{
            [ACTION.POOL_INDEX]:{},
            [ACTION.CURRENT_COIN]:{},
            [ACTION.ADD_GROUP]:{},
            [ACTION.DEL_GROUP]:{},
            [ACTION.UNGROUP_INFO]:{},
            [ACTION.GROUP_INFO]:{},
            [ACTION.CHOOSE_DEL_GROUP]:[]
        },
        [OPERATION.POOL_SET]:{
            [ACTION.POOL_ID]:0,
            [ACTION.POOL_NAME]:'',
            [ACTION.POOL_NOTICE]:'',
            [ACTION.WARNING_DROP]:true,
            [ACTION.WARNING_BAD_LINE]:true,
            [ACTION.WARNING_TEMP_CPU]:true,
            [ACTION.WARNING_TEMP_DISK]:true,
            [ACTION.WARNING_NO_ROOM]:true,
            [ACTION.WARNING_RATE]:600,
        },
        [OPERATION.ADD_MINER]:{
            [ACTION.CAN_ADD_MINER]:{},
            [ACTION.GROUP_CAN_ADD_MINER]:{},
            [ACTION.CHOOSE_CAN_ADD]:[],
        },
        [OPERATION.DELETE_MINER]:{
            [ACTION.CAN_DEL_MINER]:{},
            [ACTION.GROUP_CAN_DELETE_MINER]:{},
            [ACTION.CHOOSE_CAN_DEL]:[],
            [ACTION.IF_CLEAR]:true
        }
    },
    [OPERATION.DEVICE_INFO]:{
        [ACTION.UNGROUP_DEVICE]:{},
        [ACTION.DEVICE_SELECT]:[],
        [ACTION.DEVICE_SCREEN]:"",
    },
    [OPERATION.PROFIT_INFO]:{
        [ACTION.PROFIT_DATA]:{},
        [ACTION.PROFIT_CONDITION]:{
            [ACTION.PROFIT_FROM_DATA]:{},
            [ACTION.PROFIT_TO_DATA]:{},
            [ACTION.PROFIT_PAGE]:{},
            [ACTION.PROFIT_PAGE_SIZE]:{},
            [ACTION.PROFIT_KEYWORD]:{},
        },
    },
    [OPERATION.SERVER_INFO]:{
        [ACTION.DEVICE_SCREEN]:{
            [ACTION.IS_ONLINE]:'all',
            [ACTION.ORDER_CHOOSE]:'',
            [ACTION.IS_ENTRUST]:0,
            [ACTION.CURRENT_OPEN]:'',
            [ACTION.PROFIT_FROM_DATA]:{},
            [ACTION.PROFIT_TO_DATA]:{},
            [ACTION.PROFIT_PAGE]:{},
            [ACTION.PROFIT_PAGE_SIZE]:{},
            [ACTION.PROFIT_KEYWORD]:'',
        },
        [ACTION.VIRTUAL_NODE]:{
            [ACTION.CURRENT_OPEN]:OPERATION.MY_NODE,
        },
        [ACTION.MY_DEVICE]:{},
        [ACTION.CURRENT_DEVICE]:'',
        [ACTION.MY_ENTRUST]:'',
        [ACTION.ENTRUST_TO_ME]:'',
    }
}

export default (state = defaultState,action)=>{
    // 值改变时的store处理
    if(action.type === CHANGE_INPUT){
        let newState = JSON.parse(JSON.stringify((state)));
        newState[OPERATION.USER_INFO][action.model][action.key]=action.value;
        return newState;
    }
    if(action.type === CHANGE_STORE){
        let newState = JSON.parse(JSON.stringify((action.info)));
        let menu = JSON.parse(JSON.stringify((state)));
        newState[OPERATION.MENU_INFO] = menu[OPERATION.MENU_INFO]
        return newState;
    }
    if(action.type === CHANGE_MENU){
        let newState = JSON.parse(JSON.stringify((action.info)));
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
        newState[OPERATION.SYSTEM_INFO].uuid = makeUuid();
        return  newState;
    }


    return state
}