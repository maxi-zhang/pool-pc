import React from 'react';
import Tips from "../../common/Tips";
import Input from "../../common/Input";
import {ACTION, OPERATION} from "../../common/Config";
import {Link} from "react-router-dom";
import store from "../../../store";
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
        this.setState(this.state);
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    render() {
        let showPicCode = 0;
        let showSmsCode = 0;
        if(this.state[ACTION.LOGIN_STATUS] === 3){
            showPicCode = 1;
            showSmsCode = 1;
        }else if(this.state[ACTION.LOGIN_STATUS] === 5){
            showPicCode = 1;
        }
        return (
            <div className="login-area">
                <Tips title="矿场管理系统登录" />
                <div className={"input-outside"}>
                    <Input type={"text"} title={"手机号码"} name={ACTION.MOBILE_NUMBER} model={OPERATION.LOGIN_MODEL} />
                    <Input type={"password"} title={"密码"} name={ACTION.SET_PASSWORD} model={OPERATION.LOGIN_MODEL} />

                    { showPicCode === 1?
                        <Input type={"qrcode"} title={"图像验证码"} name={ACTION.PICTURE_QRCODE} model={OPERATION.LOGIN_MODEL} />:
                        <div></div>
                    }
                    { showSmsCode === 1?
                        <Input type={"smscode"} title={"短信验证码"} name={ACTION.SMS_CODE} model={OPERATION.LOGIN_MODEL} />:
                        <div></div>
                    }
                    {this.state[ACTION.ERROR_CODE] > 0 ?
                        <p className={"error-tips"} >{this.state[ACTION.ERROR_DESCRIPTION]}</p>:
                        <p className={"error-tips"} style={{visibility: "hidden"}} >错误语提示位</p>
                    }
                    <Input type={"button"} title={"登录"} name={OPERATION.LOGIN_OPERATION} model={OPERATION.LOGIN_MODEL} />

                </div>
                <Link to = "/userPage/register">
                    <p className={"go-login"}>注册账户</p>
                </Link>
            </div>
        );
    }
}