import {SUBMIT_INPUT, CHANGE_INPUT, CHANGE_UUID} from "../../../store/config";
import store from "../../../store";
import Axios from "axios";
import {checkPassword, checkPhoneNumber, checkQrcodeNumber,makeClientCode} from "../Common";
import {ACTION, OPERATION, PATH} from "../Config";
import { message } from 'antd';

import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

// 验证注册信息
let checkRegisterInfo = (state,name,model) =>{
    if(mobileNumberCheck(state[OPERATION.USER_INFO][model][ACTION.MOBILE_NUMBER],name)){
        return;
    }
    if(picQrcodeCheck(state,model,name)){
        return;
    }
}

// 检测短信验证码
let checkSmsCode = (state,name)=>{
    Axios({
        method:"post",
        url:"/basic/checkSms/",
        data:{
            account:state[OPERATION.USER_INFO][OPERATION.REGISTER_MODEL][ACTION.MOBILE_NUMBER],
            type:"register",
            sms:state[OPERATION.USER_INFO][OPERATION.REGISTER_MODEL][ACTION.SMS_CODE],
        }
    }).then(function(data){
        changeCommonStatus(data,name)
    })
}

// 注册账号
let registerAccount = (state,name) =>{
    let info = checkPassword(state[OPERATION.USER_INFO][OPERATION.REGISTER_MODEL][ACTION.SET_PASSWORD],state[OPERATION.USER_INFO][OPERATION.REGISTER_MODEL][ACTION.RESET_PASSWORD]);
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
            account:state[OPERATION.USER_INFO][OPERATION.REGISTER_MODEL][ACTION.MOBILE_NUMBER],
            name:"register",
            password:state[OPERATION.USER_INFO][OPERATION.REGISTER_MODEL][ACTION.SET_PASSWORD],
            repassword:state[OPERATION.USER_INFO][OPERATION.REGISTER_MODEL][ACTION.RESET_PASSWORD],
            smscode:state[OPERATION.USER_INFO][OPERATION.REGISTER_MODEL][ACTION.SMS_CODE],
            client_name:OPERATION.CLIENT_NAME,
            client_code:OPERATION.CLIENT_CODE,
            client_version:OPERATION.CLIENT_VERSION,
            device_type:OPERATION.DEVICE_TYPE,
        }
    }).then(function(data){
        //register_now
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
    if(state[OPERATION.SYSTEM_INFO][ACTION.SMS_START_COUNT] === 0 && state[OPERATION.SYSTEM_INFO][ACTION.SMS_LEFT_TIME]> 0){
        let info = [];
        let time = state[OPERATION.SYSTEM_INFO][ACTION.SMS_LEFT_TIME];
        info[OPERATION.SYSTEM_INFO] = {};
        info[OPERATION.SYSTEM_INFO][ACTION.SMS_START_COUNT] = 1;
        info[OPERATION.SYSTEM_INFO][ACTION.SMS_LEFT_TIME] = state[OPERATION.SYSTEM_INFO][ACTION.SMS_LEFT_TIME];
        // 全局计数器开启，不准其他地方开启
        const action = {
            type:SUBMIT_INPUT,
            info:info
        }
        store.dispatch(action);

        let timerID = setInterval(
            function () {
                time = time - 1;
                info[OPERATION.SYSTEM_INFO][ACTION.SMS_LEFT_TIME] = time;
                if(time === 0){
                    info[OPERATION.SYSTEM_INFO][ACTION.SMS_START_COUNT] = 0;
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
    let info = {};
    info[OPERATION.PATH_INFO] ={};
    if(click === 1){
        clearRegisterStatus();
        return;
    }
    if(state[OPERATION.PATH_INFO][ACTION.CURRENT_OPERATION] === OPERATION.SUCCESS_REGISTER){
        if(state[OPERATION.SYSTEM_INFO][ACTION.JUMP_COUNT] == 0){
            let time = 4;
            info[OPERATION.SYSTEM_INFO] ={};
            let timerID = setInterval(
                function () {
                    time = time - 1;
                    info[OPERATION.SYSTEM_INFO][ACTION.JUMP_COUNT] = time;
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
    if(mobileNumberCheck(state[OPERATION.USER_INFO][OPERATION.LOGIN_MODEL][ACTION.MOBILE_NUMBER])){
        return;
    }
    if(state[OPERATION.USER_INFO][OPERATION.LOGIN_MODEL][ACTION.SET_PASSWORD].length < 6){
        let info = [];
        info[OPERATION.ERROR_INFO] ={};
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000;
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = '密码长度不能小于6位';
        littleDispatch(info);
        return;
    }
    // 远程获取账号的登陆状态
    Axios({
        method:"post",
        url:"/user/checkAccount",
        data:{
            account:state[OPERATION.USER_INFO][OPERATION.LOGIN_MODEL][ACTION.MOBILE_NUMBER],
            client_code: makeClientCode(state),
        }
    }).then(function(data){
        // 首次检测弹出图像及手机验证码
        if((state[OPERATION.USER_INFO][ACTION.LOGIN_STATUS] === 1 || state[OPERATION.USER_INFO][ACTION.LOGIN_STATUS] === 0)&& data.data.data.status !== 1 ){
            changeCommonStatus(data,name);
        }else{
            if(state[OPERATION.USER_INFO][ACTION.LOGIN_STATUS] === 3){
                if(checkQrcodeNumber(state[OPERATION.USER_INFO][OPERATION.LOGIN_MODEL][ACTION.PICTURE_QRCODE])){
                    let info = [];
                    info[OPERATION.ERROR_INFO] ={};
                    info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000;
                    info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = '图片验证码错误';
                    littleDispatch(info);
                    return;
                }
                if(state[OPERATION.USER_INFO][OPERATION.LOGIN_MODEL][ACTION.SMS_CODE].length != 6){
                    let info = [];
                    info[OPERATION.ERROR_INFO] ={};
                    info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000;
                    info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = '手机验证码错误';
                    littleDispatch(info);
                    return;
                }
            }else if(state[OPERATION.USER_INFO][ACTION.LOGIN_STATUS] === 5){
                if(checkQrcodeNumber(state[OPERATION.USER_INFO][OPERATION.LOGIN_MODEL][ACTION.PICTURE_QRCODE])){
                    let info = [];
                    info[OPERATION.ERROR_INFO] ={};
                    info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000;
                    info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = '图片验证码错误';
                    littleDispatch(info);
                    return;
                }
            }
            Axios({
                method:"post",
                url:"/user/login",
                data:{
                    account:state[OPERATION.USER_INFO][OPERATION.LOGIN_MODEL][ACTION.MOBILE_NUMBER],
                    password:state[OPERATION.USER_INFO][OPERATION.LOGIN_MODEL][ACTION.SET_PASSWORD],
                    authcode:state[OPERATION.USER_INFO][OPERATION.LOGIN_MODEL][ACTION.PICTURE_QRCODE],
                    uuid:state[OPERATION.SYSTEM_INFO][ACTION.UUID],
                    smscode:state[OPERATION.USER_INFO][OPERATION.LOGIN_MODEL][ACTION.SMS_CODE],
                    client_name:OPERATION.CLIENT_NAME,
                    client_code:makeClientCode(state),
                    client_version:OPERATION.CLIENT_VERSION,
                    device_type:OPERATION.DEVICE_TYPE,
                }
            }).then(function(data){
                if(data.data.code === 0){
                    message.config({
                        top: '50%'
                    })
                    message.success('登录成功', 2);
                }
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
    let info = {};
    info[OPERATION.ERROR_INFO] = {};
    info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = data.data.code;
    info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = data.data.description;

    if(data.data.code === 0){
        if(name === OPERATION.CHECK_QRCODE){
            info[OPERATION.PATH_INFO] = {};
            info[OPERATION.SYSTEM_INFO] = {};
            info[OPERATION.PATH_INFO][ACTION.CURRENT_OPERATION] = OPERATION.CHECK_SMS_CODE;
            info[OPERATION.SYSTEM_INFO][ACTION.SMS_LEFT_TIME] = 9;
            info[OPERATION.SYSTEM_INFO][ACTION.SMS_START_COUNT] = 0;
        }else if(name === OPERATION.CHECK_SMS_CODE){
            info[OPERATION.PATH_INFO] = {};
            info[OPERATION.PATH_INFO][ACTION.CURRENT_OPERATION] = OPERATION.SET_PASSWORD;
        }else if(name === OPERATION.REGISTER_NOW){
            info[OPERATION.PATH_INFO] = {};
            info[OPERATION.PATH_INFO][ACTION.CURRENT_OPERATION] = OPERATION.SUCCESS_REGISTER;
        }else if(name === OPERATION.NETWORK_CHECK){
            info[OPERATION.SYSTEM_INFO] = {};
            info[OPERATION.SYSTEM_INFO][ACTION.CLIENT_IP] = data.data.data;
        }else if(name === OPERATION.LOGIN_OPERATION){
            info[OPERATION.PATH_INFO] = {};
            info[OPERATION.USER_INFO] = {};
            info[OPERATION.PATH_INFO][ACTION.CURRENT_OPERATION] = OPERATION.LOGIN_OPERATION;
            info[OPERATION.USER_INFO][ACTION.LOGIN_STATUS] = data.data.data.status;
            if(data.data.data.status === 0){
                info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000;
                info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "账号未注册，请先注册";
            }else if(data.data.data.status === 3){
                info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000;
                info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "检测为异地登录，需验证手机号";
            }else if(data.data.data.status === 5){
                info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000;
                info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = "密码错误过多，请输入图片验证码";
            }
        }else if(name === OPERATION.LOGIN_SUCCESS){
            info[OPERATION.USER_INFO] = {};
            info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN] = data.data.data.token;
            info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID] = data.data.data['user_id'];
        }else if(name === OPERATION.UPDATE_TOKEN){

        }else{

        }
    }else{
        if(name === OPERATION.LOGIN_SUCCESS){
            info[OPERATION.USER_INFO] = {};
            info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN] = '';
            info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID] = '';
        }else if(name === OPERATION.UPDATE_TOKEN){
            info[OPERATION.USER_INFO] = {};
            info[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN] = '';
            info[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID] = '';
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
    let info = {};
    info[OPERATION.SYSTEM_INFO] = {};
    info[OPERATION.PATH_INFO] = {};
    info[OPERATION.USER_INFO] = {};
    info[OPERATION.SYSTEM_INFO][ACTION.JUMP_COUNT] = 0;
    info[OPERATION.PATH_INFO][ACTION.CURRENT_OPERATION] = '';
    info[OPERATION.PATH_INFO][ACTION.CURRENT_PATH] = PATH.USER_LOGIN;
    info[OPERATION.USER_INFO][OPERATION.REGISTER_MODEL] = {};
    info[OPERATION.USER_INFO][OPERATION.REGISTER_MODEL][ACTION.MOBILE_NUMBER] = '';
    info[OPERATION.USER_INFO][OPERATION.REGISTER_MODEL][ACTION.PICTURE_QRCODE] = '';
    info[OPERATION.USER_INFO][OPERATION.REGISTER_MODEL][ACTION.SET_PASSWORD] = '';
    info[OPERATION.USER_INFO][OPERATION.REGISTER_MODEL][ACTION.RESET_PASSWORD] = '';
    info[OPERATION.USER_INFO][OPERATION.REGISTER_MODEL][ACTION.SMS_CODE] = '';

    const action = {
        type:SUBMIT_INPUT,
        info:info
    }
    store.dispatch(action);
}

// 验证手机号码操作
let mobileNumberCheck = (phoneNumber) => {
    let info = [];
    if(!checkPhoneNumber(phoneNumber)){
        info[OPERATION.ERROR_INFO] = {};
        info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 100000;
        info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = '手机号验证错误';
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
    if(checkQrcodeNumber(state[OPERATION.USER_INFO][model][ACTION.PICTURE_QRCODE])){
        info[OPERATION.SYSTEM_INFO] = {};
        info[OPERATION.SYSTEM_INFO][ACTION.ERROR_CODE] = 100000;
        info[OPERATION.SYSTEM_INFO][ACTION.ERROR_DESCRIPTION] = '图片验证码错误';
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
            account:state[OPERATION.USER_INFO][model][ACTION.MOBILE_NUMBER],
            type:type,
            authcode:state[OPERATION.USER_INFO][model][ACTION.PICTURE_QRCODE],
            uuid:state[OPERATION.SYSTEM_INFO][ACTION.UUID]
        }
    }).then(function(data){
        changeCommonStatus(data,name)
        timeCountDown(state);
    })
}

// 清空redux暂存数据
let clearReduxData = () =>{
    let info = {};
    info[OPERATION.ERROR_INFO] = {};
    info[OPERATION.PATH_INFO] = {};
    info[OPERATION.USER_INFO] = {};
    info[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] = 0;
    info[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION] = '';
    info[OPERATION.PATH_INFO][ACTION.CURRENT_OPERATION] = '';
    info[OPERATION.USER_INFO][ACTION.LOGIN_STATUS] = 1;
    info[OPERATION.USER_INFO][OPERATION.REGISTER_MODEL] = {};
    info[OPERATION.USER_INFO][OPERATION.LOGIN_MODEL] = {};
    info[OPERATION.USER_INFO][OPERATION.FIND_PASSWORD_MODEL] = {};
    info[OPERATION.USER_INFO][OPERATION.REGISTER_MODEL][ACTION.MOBILE_NUMBER] = ''
    info[OPERATION.USER_INFO][OPERATION.REGISTER_MODEL][ACTION.PICTURE_QRCODE] = ''
    info[OPERATION.USER_INFO][OPERATION.REGISTER_MODEL][ACTION.SET_PASSWORD] = ''
    info[OPERATION.USER_INFO][OPERATION.REGISTER_MODEL][ACTION.RESET_PASSWORD] = ''
    info[OPERATION.USER_INFO][OPERATION.REGISTER_MODEL][ACTION.SMS_CODE] = ''

    info[OPERATION.USER_INFO][OPERATION.LOGIN_MODEL][ACTION.MOBILE_NUMBER] = ''
    info[OPERATION.USER_INFO][OPERATION.LOGIN_MODEL][ACTION.PICTURE_QRCODE] = ''
    info[OPERATION.USER_INFO][OPERATION.LOGIN_MODEL][ACTION.SET_PASSWORD] = ''
    info[OPERATION.USER_INFO][OPERATION.LOGIN_MODEL][ACTION.RESET_PASSWORD] = ''
    info[OPERATION.USER_INFO][OPERATION.LOGIN_MODEL][ACTION.SMS_CODE] = ''

    info[OPERATION.USER_INFO][OPERATION.FIND_PASSWORD_MODEL][ACTION.MOBILE_NUMBER] = ''
    info[OPERATION.USER_INFO][OPERATION.FIND_PASSWORD_MODEL][ACTION.PICTURE_QRCODE] = ''
    info[OPERATION.USER_INFO][OPERATION.FIND_PASSWORD_MODEL][ACTION.SET_PASSWORD] = ''
    info[OPERATION.USER_INFO][OPERATION.FIND_PASSWORD_MODEL][ACTION.RESET_PASSWORD] = ''
    info[OPERATION.USER_INFO][OPERATION.FIND_PASSWORD_MODEL][ACTION.SMS_CODE] = ''

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