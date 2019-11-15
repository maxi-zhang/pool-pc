import React from 'react';
import Input from '../../common/Input';
import Tips from '../../common/Tips';
import {Link} from "react-router-dom";
import store from  '../../../store/index'
// import Axios from 'axios';

export default class app extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.state.status = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
    }
    componentDidMount() {
        // Axios({
        //     method:"post",
        //     url:"/user/login",
        //     data:{
        //         account:"18823161828",
        //         password:"admin123"
        //     }
        // }).then()
    }
    storeChange(){
        this.state = store.getState();
        this.setState(this.state)

    }
    render() {
        return (
            <div className="login-area">
                <Tips title="矿场管理系统登录" />
                <div className={"input-outside"}>
                    <Input type={"text"} title={"手机号"} name={"mobile-number"} />
                    <Input type={"qrcode"} title={"图像验证码"} name={"picture-qrcode"} />
                    <p className={"error-tips"} >错误语提示位</p>
                    {2 > 1?
                        <Input type={"button"} title={"提交"} event={"register"} name={"check-pic-qrcode"} />:
                        <Input type={"button"} title={"放弃"} event={"register"} />
                    }
                </div>
                <Link to = "/userPage/login">
                    <p className={"go-login"}>已有账号？去登录</p>
                </Link>
            </div>
        );
    }
}