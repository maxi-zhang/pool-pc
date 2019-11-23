import {ACTION, OPERATION} from "./Config";
import Axios from "axios";
import {changeCommonStatus} from "./model/UserModel";
import {PATH} from "./Config";

// 检测是否联网以及获取ip方法
let checkNetworkIp = () =>{
    Axios({
        method:"post",
        url:"/user/getIp",
        data:{}
    }).then(function(data){
        changeCommonStatus(data,OPERATION.NETWORK_CHECK)
    })
}

// 检测用户token是否合法方法
let checkUserToken = (state,location='/#/') =>{
    if(state[ACTION.ADMIN_USER_ID] && state[ACTION.ADMIN_TOKEN]){
        Axios({
            method:"post",
            url:"/user/checkToken",
            data:{
                user_id:state[ACTION.ADMIN_USER_ID],
                token:state[ACTION.ADMIN_TOKEN],
            }
        }).then(function(data){
            data.data.location = location
            changeCommonStatus(data,OPERATION.UPDATE_TOKEN)
        })
    }else{
        if(state[ACTION.CURRENT_PATH] !== '/userPage/register'){
            window.location.href = '/#'+PATH.USER_LOGIN;
        }
    }
}

// 产生随机UUID方法
let makeUuid = () =>{
    return new Date().getTime() + Math.random().toString(36).substr(3,36);
}

// 验证手机号格式方法
let checkPhoneNumber = (phone) => {
    return /^1[3456789]\d{9}$/.test(phone);
}

//检测验证码方法
let checkQrcodeNumber = (number) =>{
    return number.length !== 4;
}

//生成client_code的方法
let makeClientCode = (state) =>{
    return state[ACTION.CLIENT_IP]+state[OPERATION.LOGIN_MODEL][ACTION.MOBILE_NUMBER];
}

// 检测密码方法
let checkPassword = (password,newpassword) => {
    let info = [];
    info[ACTION.ERROR_CODE] = 0;
    info[ACTION.ERROR_DESCRIPTION] = '操作成功';
    if(password === ''){
        info[ACTION.ERROR_CODE] = 100000;
        info[ACTION.ERROR_DESCRIPTION] = "设置密码项不能为空";
        return info
    }
    if(newpassword === ''){
        info[ACTION.ERROR_CODE] = 100000;
        info[ACTION.ERROR_DESCRIPTION] = "确认密码项不能为空";
        return info
    }
    if(password !== newpassword){
        info[ACTION.ERROR_CODE] = 100000;
        info[ACTION.ERROR_DESCRIPTION] = "两次输入的密码不一致";
        return info
    }
    if(password.length < 8 || password.length > 16){
        info[ACTION.ERROR_CODE] = 100000;
        info[ACTION.ERROR_DESCRIPTION] = "密码长度需要在8-16位";
        return info
    }
    let reg = new RegExp('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,30}');
    if(!reg.test(password)){
        info[ACTION.ERROR_CODE] = 100000;
        info[ACTION.ERROR_DESCRIPTION] = "密码需含大小写字母及数字";
        return info;
    }
    return info;
}


export {checkPhoneNumber,checkQrcodeNumber,makeUuid,checkPassword,makeClientCode,checkNetworkIp,checkUserToken};