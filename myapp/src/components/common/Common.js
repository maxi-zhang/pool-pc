import {ACTION, OPERATION} from "./Config";
import Axios from "axios";
import {changeCommonStatus} from "./model/UserModel";
import {PATH} from "./Config";
import qs from "qs";

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
let checkUserToken = (state) =>{
    if(state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID] && state[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN]){
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/user/user/get', qs.stringify(
            {
                user_id:state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                token:state[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
            })
        ).then(function(data){
            changeCommonStatus(data,OPERATION.UPDATE_TOKEN)
        });
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
    return state[OPERATION.SYSTEM_INFO][ACTION.CLIENT_IP]+state[OPERATION.USER_INFO][OPERATION.LOGIN_MODEL][ACTION.MOBILE_NUMBER];
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

// 检查特殊字符方法
let checkSpecialCharacter = (word) =>{
    let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
        regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

    if(regEn.test(word) || regCn.test(word)) {
        return true;
    }
}

// 判断字符串长度
let isStringLen = (str) =>{
    let len = 0;
    for (let i=0; i<str.length; i++) {
        let c = str.charCodeAt(i);
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
            len++;
        }
        else {
            len+=2;
        }
    }
    return len;
}


let isEmpty = (obj) => {
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
}

// 算力单位转换函数
let getDiskPower = (pow) =>{
    if(pow < 1024){
        return pow+'GB';
    }else if(pow < 1024*1024){
        return (pow/1024).toFixed(2)+'TB';
    }
}

// 字符串截取函数
let stringCut = (name,length) =>{
    if(name.length > length){
        return name.substring(0,length) + '...';
    }else{
        return name;
    }
}

// 返回今天的年月日格式
let todayFormat = (link = "-") =>{
    let date = new Date(new Date().getTime() - 24*60*60*1000);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if(month < 10){
        month = '0'+month;
    }
    let day = date.getDate();
    if(day < 10){
        day = '0'+day;
    }
    return year+link+month+link+day
}

// 返回今年3，去年4，上月2，本月1的时间起始时间

let getTimePeriod = (i) =>{
    let myDate = new Date();
    let c_year = myDate.getFullYear();
    let c_month = myDate.getMonth()+1;
    let c_day = myDate.getDate();
    let from;
    let to;
    if(i === 1){
        from = c_year+'-'+c_month+'-01'
        to = c_year+'-'+c_month+'-'+c_day
    }
    if(i === 2){
        if(c_month == 1){
            c_month = 12;
            c_year = c_year -1;
        }else{
            c_month = c_month -1;
        }
        let lastDay = new Date(c_year, c_month, 0)
        from = c_year+'-'+c_month+'-01';
        to = c_year+'-'+c_month+'-'+lastDay.getDate();
    }
    if(i === 3){
        from = c_year+'-01-01';
        to = c_year+'-12-31';
    }
    if(i === 4){
        from = (c_year-1)+'-01-01';
        to = (c_year-1)+'-12-31';
    }
    return [from,to]
}



export {getTimePeriod,todayFormat,stringCut,getDiskPower,checkPhoneNumber,checkQrcodeNumber,makeUuid,checkPassword,makeClientCode,checkNetworkIp,checkUserToken,checkSpecialCharacter,isStringLen,isEmpty};