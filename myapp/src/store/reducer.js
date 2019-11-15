import { checkRegisterInfo,makeUuid } from '../components/common/Common'

const defaultState = {
    'mobile-number':'',
    'picture-qrcode':'',
    'uuid':makeUuid(),
}
export default (state = defaultState,action)=>{
    // 值改变时的store处理
    if(action.type === 'changeInput'){
        let newState = JSON.parse(JSON.stringify((state)));
        newState[action.key]=action.value;
        return newState;
    }
    // 提交时的store处理
    if(action.type === 'submitInput'){
        let newState = JSON.parse(JSON.stringify((state)));
        // 图片验证码业务
        if(action.action == 'check-pic-qrcode' ){
            // 验证号码及验证码合法性
            newState = {...state,...checkRegisterInfo(state)};
        }
        return newState;
    }

    // 修改图片验证码uuid
    if(action.type === 'changeUuid'){
        let newState = JSON.parse(JSON.stringify((state)));
        newState.uuid = makeUuid();
        return  newState;
    }

    return state
}