// import {host} from "./Config";
import Axios from 'axios';

// 检查注册信息函数
let checkRegisterInfo = function(store){
    let info = [];
    if(!checkPhone(store['mobile-number'])){
        info['error_code'] = 100000;
        info['error_description'] = '手机号格式错误';
        return info;
    }
    if(!checkPicQrcode(store['picture-qrcode'])){
        info['error_code'] = 100000;
        info['error_description'] = '图片验证码错误';
        return info;
    }
}

let makeUuid = function(){
    return new Date().getTime() + Math.random().toString(36).substr(3,36);
}

// 手机号检测函数
function checkPhone(phone){
    return /^1[3456789]\d{9}$/.test(phone);
}

// 图片验证码验证
function checkPicQrcode(qrcode){
    if(qrcode.length !== 4){
        return false;
    }else{
        Axios({
            method:"post",
            url:"/user/login",
            data:{
                account:"18823161828",
                password:"admin123"
            }
        }).then()
    }
}

export {checkRegisterInfo,makeUuid};