import React from 'react';
import Input from '../../common/view/Input';
import {ACTION, OPERATION, PATH} from '../../common/Config'
import store from  '../../../store/index'
import {SUBMIT_INPUT} from "../../../store/config";
import {clearReduxData} from "../../common/model/UserModel";


export default class app extends React.Component {
    constructor(props){
        super(props);
        this.state = store.getState();
        clearReduxData();
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
        if(this.state[OPERATION.PATH_INFO][ACTION.CURRENT_OPERATION] === OPERATION.SET_PASSWORD || this.state[OPERATION.PATH_INFO][ACTION.CURRENT_OPERATION] === OPERATION.SUCCESS_REGISTER){
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
    handleClick(){
        let info = {}
        info[OPERATION.PATH_INFO] = {}
        info[OPERATION.PATH_INFO][ACTION.CURRENT_PATH] = PATH.USER_LOGIN
        const action = {
            type:SUBMIT_INPUT,
            info:info
        }
        store.dispatch(action)
    }
    render() {
        let mention = ',即将跳转';
        if(this.state[OPERATION.PATH_INFO][ACTION.CURRENT_OPERATION] === OPERATION.SUCCESS_REGISTER && this.state[OPERATION.SYSTEM_INFO][ACTION.JUMP_COUNT] > 0 ){
            mention = "," +this.state[OPERATION.SYSTEM_INFO][ACTION.JUMP_COUNT] + "秒后跳转";
        }
        let margin = 180;
        if(this.state[OPERATION.PATH_INFO][ACTION.CURRENT_OPERATION] === OPERATION.CHECK_SMS_CODE){
            margin = 130;
        }
        return(
            <div id={"main"}>
                <div className="login-area">
                    <h5 style={{marginTop:margin +"px"}} className={"login-title"}>矿场管理系统注册</h5>
                    <div className={"input-outside"}>
                        <Input type={"password"} title={"设置密码"} name={ACTION.SET_PASSWORD} model={OPERATION.REGISTER_MODEL} />
                        <Input type={"password"} title={"确认密码"} name={ACTION.RESET_PASSWORD} model={OPERATION.REGISTER_MODEL} />
                        {this.state[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] > 0 ?
                            <p className={"error-tips"} >{this.state[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION]}</p>:
                            <p className={"error-tips"} style={{visibility: "hidden"}} >错误语提示位</p>
                        }
                        {this.state[OPERATION.PATH_INFO][ACTION.CURRENT_OPERATION] === OPERATION.SUCCESS_REGISTER?
                            <Input type={"button"} title={"注册成功"+mention} name={OPERATION.SUCCESS_REGISTER} model={OPERATION.REGISTER_MODEL} />:
                            <Input type={"button"} title={"注册"} name={OPERATION.REGISTER_NOW} model={OPERATION.REGISTER_MODEL} />
                        }

                    </div>
                    <p className={"go-login"} onClick={this.handleClick.bind(this)}>已有账号？去登录</p>
                </div>
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
    handleClick(){
        let info = []
        info[OPERATION.PATH_INFO] = {}
        info[OPERATION.PATH_INFO][ACTION.CURRENT_PATH] = PATH.USER_LOGIN
        const action = {
            type:SUBMIT_INPUT,
            info:info
        }
        store.dispatch(action)
    }
    render() {
        let margin = 180;
        if(this.state[OPERATION.PATH_INFO][ACTION.CURRENT_OPERATION] === OPERATION.CHECK_SMS_CODE){
            margin = 130;
        }
        return (
            <div id={"main"}>
                <div className="login-area">
                    <h5 style={{marginTop:margin +"px"}} className={"login-title"}>矿场管理系统注册</h5>
                    <div className={"input-outside"}>
                        <Input type={"text"} title={"手机号码"} name={ACTION.MOBILE_NUMBER} model={OPERATION.REGISTER_MODEL} />
                        <Input type={"qrcode"} title={"图像验证码"} name={ACTION.PICTURE_QRCODE} model={OPERATION.REGISTER_MODEL} />
                        {this.state[OPERATION.PATH_INFO][ACTION.CURRENT_OPERATION] === OPERATION.CHECK_SMS_CODE  ?
                            <Input type={"smscode"} title={"短信验证码"} name={ACTION.SMS_CODE} model={OPERATION.REGISTER_MODEL}  />:''
                        }
                        {this.state[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] > 0 ?
                            <p className={"error-tips"} >{this.state[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION]}</p>:
                            <p className={"error-tips"} style={{visibility: "hidden"}} >错误语提示位</p>
                        }
                        {this.state[OPERATION.PATH_INFO][ACTION.CURRENT_OPERATION] === OPERATION.CHECK_SMS_CODE ?
                            <Input type={"button"} title={"下一步"} name={OPERATION.CHECK_SMS_CODE} model={OPERATION.REGISTER_MODEL} />:
                            <Input type={"button"} title={"验证"} name={OPERATION.CHECK_QRCODE} model={OPERATION.REGISTER_MODEL} />
                        }
                    </div>
                    <p className={"go-login"} onClick={this.handleClick.bind(this)} >已有账号？去登录</p>
                </div>
            </div>
        );
    }
}

