import React from 'react';
import Input from '../../common/Input';
import Tips from '../../common/Tips';
import {Link} from "react-router-dom";
import {ACTION,OPERATION} from '../../common/Config'
import store from  '../../../store/index'
import {clearReduxData} from "../../common/Model";
import {checkUserToken} from "../../common/Common";


export default class app extends React.Component {
    constructor(props){
        super(props);
        clearReduxData(props.location.pathname)
        this.state = store.getState();
        checkUserToken(this.state);
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
    }
    storeChange(){
        this.state = store.getState();
        this.setState(this.state)
    }
    componentWillUnmount(){
        this.setState = (state, callback) => {
            return;
        }
    }
    render() {
        if(this.state[ACTION.CURRENT_OPERATION] === OPERATION.SET_PASSWORD || this.state[ACTION.CURRENT_OPERATION] === OPERATION.SUCCESS_REGISTER){
            return (
                <Password />
            );
        }else{
            return (
                <Qrcode />
            );
        }
    }
}

// 用户重复输入密码确定
class Password extends React.Component {
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
    }
    storeChange(){
        this.state = store.getState();
        this.setState(this.state)
    }
    componentWillUnmount(){
        this.setState = (state, callback) => {
            return;
        }
    }
    render() {
        let mention = ',即将跳转';
        if(this.state[ACTION.CURRENT_OPERATION] === OPERATION.SUCCESS_REGISTER && this.state[ACTION.JUMP_COUNT] > 0 ){
            mention = "," +this.state[ACTION.JUMP_COUNT] + "秒后跳转";
        }
        return(
            <div className="login-area">
                <Tips title="矿场管理系统登录" />
                <div className={"input-outside"}>
                    <Input type={"password"} title={"设置密码"} name={ACTION.SET_PASSWORD} model={OPERATION.REGISTER_MODEL} />
                    <Input type={"password"} title={"确认密码"} name={ACTION.RESET_PASSWORD} model={OPERATION.REGISTER_MODEL} />
                    {this.state[ACTION.ERROR_CODE] > 0 ?
                        <p className={"error-tips"} >{this.state[ACTION.ERROR_DESCRIPTION]}</p>:
                        <p className={"error-tips"} style={{visibility: "hidden"}} >错误语提示位</p>
                    }
                    {this.state[ACTION.CURRENT_OPERATION] === OPERATION.SUCCESS_REGISTER?
                        <Input type={"button"} title={"注册成功"+mention} name={OPERATION.SUCCESS_REGISTER} model={OPERATION.REGISTER_MODEL} />:
                        <Input type={"button"} title={"注册"} name={OPERATION.REGISTER_NOW} model={OPERATION.REGISTER_MODEL} />
                    }

                </div>
                <Link to = "/userPage/login">
                    <p className={"go-login"}>已有账号？去登录</p>
                </Link>
            </div>
        );
    }
}

// 图片及手机验证码
class Qrcode extends React.Component {
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    storeChange(){
        this.state = store.getState();
        this.setState(this.state)
    }
    render() {
        return (
            <div className="login-area">
                <Tips title="矿场管理系统注册" />
                <div className={"input-outside"}>
                    <Input type={"text"} title={"手机号码"} name={ACTION.MOBILE_NUMBER} model={OPERATION.REGISTER_MODEL} />
                    <Input type={"qrcode"} title={"图像验证码"} name={ACTION.PICTURE_QRCODE} model={OPERATION.REGISTER_MODEL} />
                    {this.state[ACTION.CURRENT_OPERATION] === OPERATION.CHECK_SMS_CODE  ?
                        <Input type={"smscode"} title={"短信验证码"} name={ACTION.SMS_CODE} model={OPERATION.REGISTER_MODEL}  />:''
                    }
                    {this.state[ACTION.ERROR_CODE] > 0 ?
                        <p className={"error-tips"} >{this.state[ACTION.ERROR_DESCRIPTION]}</p>:
                        <p className={"error-tips"} style={{visibility: "hidden"}} >错误语提示位</p>
                    }
                    {this.state[ACTION.CURRENT_OPERATION] === OPERATION.CHECK_SMS_CODE ?
                        <Input type={"button"} title={"下一步"} name={OPERATION.CHECK_SMS_CODE} model={OPERATION.REGISTER_MODEL} />:
                        <Input type={"button"} title={"验证"} name={OPERATION.CHECK_QRCODE} model={OPERATION.REGISTER_MODEL} />
                    }
                </div>
                <Link to = "/userPage/login">
                    <p className={"go-login"}>已有账号？去登录</p>
                </Link>
            </div>
        );
    }
}

