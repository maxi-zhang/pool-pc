import {SUBMIT_INPUT, CHANGE_INPUT, CHANGE_UUID} from "../../store/config";
import store from "../../store";
import Axios from "axios";
import {checkPassword, checkPhoneNumber, checkQrcodeNumber,makeClientCode} from "./Common";
import {ACTION,OPERATION} from "./Config";

// 验证注册信息
let checkRegisterInfo = (state,name,model) =>{
    if(mobileNumberCheck(state[model][ACTION.MOBILE_NUMBER],name)){
        return;
    }
    if(picQrcodeCheck(state,model,name)){
        return;
    }
}

// 检测短信验证码
let checkSmsCode = (state,name)=>{
    let info = [];
    Axios({
        method:"post",
        url:"/basic/checkSms/",
        data:{
            account:state[OPERATION.REGISTER_MODEL][ACTION.MOBILE_NUMBER],
            type:"register",
            sms:state[OPERATION.REGISTER_MODEL][ACTION.SMS_CODE],
        }
    }).then(function(data){
        changeCommonStatus(data,name)
    })
}

// 注册账号
let registerAccount = (state,name) =>{
    let info = checkPassword(state[OPERATION.REGISTER_MODEL][ACTION.SET_PASSWORD],state[OPERATION.REGISTER_MODEL][ACTION.RESET_PASSWORD]);
    if(info[ACTION.ERROR_CODE] !== 0){
        const action = {
            type:SUBMIT_INPUT,
            info:info
        }
        store.dispatch(action)
    }
    Axios({
        method:"post",
        url:"/user/register",
        data:{
            account:state[OPERATION.REGISTER_MODEL][ACTION.MOBILE_NUMBER],
            name:"register",
            password:state[OPERATION.REGISTER_MODEL][ACTION.SET_PASSWORD],
            repassword:state[OPERATION.REGISTER_MODEL][ACTION.RESET_PASSWORD],
            smscode:state[OPERATION.REGISTER_MODEL][ACTION.SMS_CODE],
            client_name:OPERATION.CLIENT_NAME,
            client_code:OPERATION.CLIENT_CODE,
            client_version:OPERATION.CLIENT_VERSION,
            device_type:OPERATION.DEVICE_TYPE,
        }
    }).then(function(data){
        changeCommonStatus(data,name)
    })
}

// 修改输入框信息
let changeInputValue = (key,value,model) =>{
    const action = {
        type:CHANGE_INPUT,
        key:key,
        value:value,
        model:model
    }
    store.dispatch(action)
}

// 验证码倒计时
let timeCountDown = (state) => {
    if(state[ACTION.SMS_START_COUNT] === 0 && state[ACTION.SMS_LEFT_TIME]> 0){
        let info = [];
        let time = state[ACTION.SMS_LEFT_TIME];
        info[ACTION.SMS_START_COUNT] = 1;
        info[ACTION.SMS_LEFT_TIME] = state[ACTION.SMS_LEFT_TIME];
        // 全局计数器开启，不准其他地方开启
        const action = {
            type:SUBMIT_INPUT,
            info:info
        }
        store.dispatch(action);

        let timerID = setInterval(
            function () {
                time = time - 1;
                info[ACTION.SMS_LEFT_TIME] = time;
                if(time === 0){
                    info[ACTION.SMS_START_COUNT] = 0;
                    clearInterval(timerID);
                }
                const action = {
                    type:SUBMIT_INPUT,
                    info:info
                }
                store.dispatch(action)
            },1000
        );
    }
}

// 注册成功后跳转回登录页
let locationToLogin = (state,click) =>{
    let info = [];
    if(click === 1){
        clearRegisterStatus();
        return;
    }
    if(state[ACTION.CURRENT_OPERATION] === OPERATION.SUCCESS_REGISTER){
        if(state[ACTION.JUMP_COUNT] == 0){
            let time = 4;
            let timerID = setInterval(
                function () {
                    time = time - 1;
                    info[ACTION.JUMP_COUNT] = time;
                    if(time === 0){
                        clearInterval(timerID);
                        clearRegisterStatus();
                    }
                    const action = {
                        type:SUBMIT_INPUT,
                        info:info
                    }
                    store.dispatch(action)
                },1000
            );
        }
    }
}

// 登陆流程
let loginAccount = (state,name) => {
    if(mobileNumberCheck(state[OPERATION.LOGIN_MODEL][ACTION.MOBILE_NUMBER])){
        return;
    }
    if(state[OPERATION.LOGIN_MODEL][ACTION.SET_PASSWORD].length < 6){
        let info = [];
        info[ACTION.ERROR_CODE] = 100000;
        info[ACTION.ERROR_DESCRIPTION] = '密码长度不能小于6位';
        littleDispatch(info);
        return;
    }
    // 远程获取账号的登陆状态
    Axios({
        method:"post",
        url:"/user/checkAccount",
        data:{
            account:state[OPERATION.LOGIN_MODEL][ACTION.MOBILE_NUMBER],
            client_code: makeClientCode(state),
        }
    }).then(function(data){
        // 首次检测弹出图像及手机验证码
        if((state[ACTION.LOGIN_STATUS] === 1 || state[ACTION.LOGIN_STATUS] === 0)&& data.data.data.status !== 1 ){
            changeCommonStatus(data,name);
        }else{
            if(state[ACTION.LOGIN_STATUS] === 3){
                if(checkQrcodeNumber(state[OPERATION.LOGIN_MODEL][ACTION.PICTURE_QRCODE])){
                    let info = [];
                    info[ACTION.ERROR_CODE] = 100000;
                    info[ACTION.ERROR_DESCRIPTION] = '图片验证码错误';
                    littleDispatch(info);
                    return;
                }
                if(state[OPERATION.LOGIN_MODEL][ACTION.SMS_CODE].length != 6){
                    let info = [];
                    info[ACTION.ERROR_CODE] = 100000;
                    info[ACTION.ERROR_DESCRIPTION] = '手机验证码错误';
                    littleDispatch(info);
                    return;
                }
            }else if(state[ACTION.LOGIN_STATUS] === 5){
                if(checkQrcodeNumber(state[OPERATION.LOGIN_MODEL][ACTION.PICTURE_QRCODE])){
                    let info = [];
                    info[ACTION.ERROR_CODE] = 100000;
                    info[ACTION.ERROR_DESCRIPTION] = '图片验证码错误';
                    littleDispatch(info);
                    return;
                }
            }
            Axios({
                method:"post",
                url:"/user/login",
                data:{
                    account:state[OPERATION.LOGIN_MODEL][ACTION.MOBILE_NUMBER],
                    password:state[OPERATION.LOGIN_MODEL][ACTION.SET_PASSWORD],
                    authcode:state[OPERATION.LOGIN_MODEL][ACTION.PICTURE_QRCODE],
                    uuid:state[ACTION.UUID],
                    smscode:state[OPERATION.LOGIN_MODEL][ACTION.SMS_CODE],
                    client_name:OPERATION.CLIENT_NAME,
                    client_code:makeClientCode(state),
                    client_version:OPERATION.CLIENT_VERSION,
                    device_type:OPERATION.DEVICE_TYPE,
                }
            }).then(function(data){
                changeCommonStatus(data,OPERATION.LOGIN_SUCCESS)
            })


        }
    })

}

// 修改验证码UUID
let changeUuid = () => {
    const action = {
        type:CHANGE_UUID
    }
    store.dispatch(action)
}

//-----------------------------------------------
// 异步调用之后的处理公用
let changeCommonStatus = (data,name='') =>{
    let info = [];
    info[ACTION.ERROR_CODE] = data.data.code;
    info[ACTION.ERROR_DESCRIPTION] = data.data.description;

    if(data.data.code === 0){
        if(name === OPERATION.CHECK_QRCODE){
            info[ACTION.CURRENT_OPERATION] = OPERATION.CHECK_SMS_CODE;
            info[ACTION.SMS_LEFT_TIME] = 9;
            info[ACTION.SMS_START_COUNT] = 0;
        }else if(name === OPERATION.CHECK_SMS_CODE){
            info[ACTION.CURRENT_OPERATION] = OPERATION.SET_PASSWORD;
        }else if(name === OPERATION.REGISTER_NOW){
            info[ACTION.CURRENT_OPERATION] = OPERATION.SUCCESS_REGISTER;
        }else if(name === OPERATION.NETWORK_CHECK){
            info[ACTION.CLIENT_IP] = data.data.data;
        }else if(name === OPERATION.LOGIN_OPERATION){
            info[ACTION.CURRENT_OPERATION] = OPERATION.LOGIN_OPERATION;
            info[ACTION.LOGIN_STATUS] = data.data.data.status;
            if(data.data.data.status === 0){
                info[ACTION.ERROR_CODE] = 100000;
                info[ACTION.ERROR_DESCRIPTION] = "账号未注册，请先注册";
            }else if(data.data.data.status === 3){
                info[ACTION.ERROR_CODE] = 100000;
                info[ACTION.ERROR_DESCRIPTION] = "检测为异地登录，需验证手机号";
            }else if(data.data.data.status === 5){
                info[ACTION.ERROR_CODE] = 100000;
                info[ACTION.ERROR_DESCRIPTION] = "密码错误过多，请输入图片验证码";
            }
        }else if(name === OPERATION.LOGIN_SUCCESS){
            info[ACTION.ADMIN_TOKEN] = data.data.data.token;
            info[ACTION.ADMIN_USER_ID] = data.data.data['user_id'];
            window.location.href = '/#/'
        }else if(name === OPERATION.UPDATE_TOKEN){
            window.location.href = data.data.location
        }else{

        }
    }
    const action = {
        type:SUBMIT_INPUT,
        info:info
    }
    store.dispatch(action)

}

// 注册成功后跳转情况状态
let clearRegisterStatus = () =>{
    let info = [];
    info[ACTION.JUMP_COUNT] = 0;
    info[ACTION.CURRENT_OPERATION] = '';
    info[OPERATION.REGISTER_MODEL] = {};
    info[OPERATION.REGISTER_MODEL][ACTION.MOBILE_NUMBER] = '';
    info[OPERATION.REGISTER_MODEL][ACTION.PICTURE_QRCODE] = '';
    info[OPERATION.REGISTER_MODEL][ACTION.SET_PASSWORD] = '';
    info[OPERATION.REGISTER_MODEL][ACTION.RESET_PASSWORD] = '';
    info[OPERATION.REGISTER_MODEL][ACTION.SMS_CODE] = '';

    const action = {
        type:SUBMIT_INPUT,
        info:info
    }
    store.dispatch(action);
    window.location.href = '/#/userPage/login'
}

// 验证手机号码操作
let mobileNumberCheck = (phoneNumber) => {
    let info = [];
    if(!checkPhoneNumber(phoneNumber)){
        info[ACTION.ERROR_CODE] = 100000;
        info[ACTION.ERROR_DESCRIPTION] = '手机号验证错误';
        const action = {
            type:SUBMIT_INPUT,
            info:info
        }
        store.dispatch(action)
        return true;
    }
}

// 发送短信验证码
let picQrcodeCheck = (state,model,name) =>{
    let info = [];
    let type = ''
    if(model === OPERATION.LOGIN_MODEL){
        type = 'login';
    }else if(model === OPERATION.REGISTER_MODEL){
        type = 'register';
    }
    if(checkQrcodeNumber(state[model][ACTION.PICTURE_QRCODE])){
        info[ACTION.ERROR_CODE] = 100000;
        info[ACTION.ERROR_DESCRIPTION] = '图片验证码错误';
        const action = {
            type:SUBMIT_INPUT,
            info:info
        }
        store.dispatch(action)
        return true;
    }
    Axios({
        method:"post",
        url:"/basic/sendSms/",
        data:{
            account:state[model][ACTION.MOBILE_NUMBER],
            type:type,
            authcode:state[model][ACTION.PICTURE_QRCODE],
            uuid:state[ACTION.UUID]
        }
    }).then(function(data){
        changeCommonStatus(data,name)
        timeCountDown(state);
    })
}

// 清空redux暂存数据
let clearReduxData = (location) =>{
    let info = {};
    info[ACTION.CURRENT_PATH] = location;
    info[ACTION.ERROR_CODE] = 0;
    info[ACTION.ERROR_DESCRIPTION] = '';
    info[ACTION.CURRENT_OPERATION] = '';
    info[ACTION.LOGIN_STATUS] = 1;
    info[OPERATION.REGISTER_MODEL] = {};
    info[OPERATION.LOGIN_MODEL] = {};
    info[OPERATION.FIND_PASSWORD_MODEL] = {};
    info[OPERATION.REGISTER_MODEL][ACTION.MOBILE_NUMBER] = ''
    info[OPERATION.REGISTER_MODEL][ACTION.PICTURE_QRCODE] = ''
    info[OPERATION.REGISTER_MODEL][ACTION.SET_PASSWORD] = ''
    info[OPERATION.REGISTER_MODEL][ACTION.RESET_PASSWORD] = ''
    info[OPERATION.REGISTER_MODEL][ACTION.SMS_CODE] = ''

    info[OPERATION.LOGIN_MODEL][ACTION.MOBILE_NUMBER] = ''
    info[OPERATION.LOGIN_MODEL][ACTION.PICTURE_QRCODE] = ''
    info[OPERATION.LOGIN_MODEL][ACTION.SET_PASSWORD] = ''
    info[OPERATION.LOGIN_MODEL][ACTION.RESET_PASSWORD] = ''
    info[OPERATION.LOGIN_MODEL][ACTION.SMS_CODE] = ''

    info[OPERATION.FIND_PASSWORD_MODEL][ACTION.MOBILE_NUMBER] = ''
    info[OPERATION.FIND_PASSWORD_MODEL][ACTION.PICTURE_QRCODE] = ''
    info[OPERATION.FIND_PASSWORD_MODEL][ACTION.SET_PASSWORD] = ''
    info[OPERATION.FIND_PASSWORD_MODEL][ACTION.RESET_PASSWORD] = ''
    info[OPERATION.FIND_PASSWORD_MODEL][ACTION.SMS_CODE] = ''

    const action = {
        type:SUBMIT_INPUT,
        info:info
    }
    store.dispatch(action)
}

// 更新redux中的状态
let littleDispatch = (info) =>{
    const action = {
        type:SUBMIT_INPUT,
        info:info
    }
    store.dispatch(action);
}


export {checkRegisterInfo,changeInputValue,changeUuid,checkSmsCode,timeCountDown,registerAccount,locationToLogin,loginAccount,changeCommonStatus,clearReduxData};