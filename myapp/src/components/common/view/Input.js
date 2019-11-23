import React from 'react';
import {HOST, ACTION, OPERATION} from '../Config'
import store from '../../../store'
import {checkRegisterInfo,changeInputValue,changeUuid,checkSmsCode,timeCountDown,registerAccount,locationToLogin,loginAccount} from '../model/UserModel'

export default class InputText extends  React.Component{
    constructor(props){
        super(props)
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
    }

    componentDidMount() {
        // 短信验证码倒计时
        if(this.props.name == ACTION.SMS_CODE){
            timeCountDown(this.state);
        }
    }
    componentWillUnmount(){
        this.setState = () => {
            return;
        }
    }
    storeChange(){
        timeCountDown(store.getState());
        locationToLogin(store.getState());
        this.setState(store.getState())
    }
    handleChange(e){
        changeInputValue(e.target.name,e.target.value,this.props['model'])
    }
    sendSmsCode(){
        // 检查注册信息即为发送验证码
        checkRegisterInfo(this.state, OPERATION.CHECK_QRCODE,this.props['model'])
    }
    handleClick(e) {
        if (e.target.name === OPERATION.CHECK_QRCODE){
            checkRegisterInfo(this.state, e.target.name,this.props['model'])
        }else if(e.target.name === OPERATION.CHECK_SMS_CODE){
            checkSmsCode(this.state, e.target.name)
        }else if(e.target.name === OPERATION.REGISTER_NOW){
            registerAccount(this.state,e.target.name);
        }else if(e.target.name === OPERATION.SUCCESS_REGISTER ){
            locationToLogin(this.state,1);
        }else if(e.target.name === OPERATION.LOGIN_OPERATION){
            loginAccount(this.state,e.target.name);
        }
    }
    changePicQrcode(){
        changeUuid();
    }
    render() {
        if(this.props.type === 'text'){
            return(
                <div className={"input-side"}>
                    <p>{this.props.title}</p>
                    {this.props.name === ACTION.MOBILE_NUMBER?
                        // 如果为手机号则限制为11位
                        <input maxLength="11" className={"text-common"} name={this.props.name} type={"text"} value={this.state[this.props.name]} onChange={this.handleChange.bind(this)} />:
                        <input className={"text-common"} name={this.props.name} type={"text"} value={this.state[this.props.name]} onChange={this.handleChange.bind(this)} />
                    }
                </div>
            );
        }else if(this.props.type === 'password'){
            return(
                <div className={"input-side"}>
                    <p>{this.props.title}</p>
                    <input maxLength={"16"} className={"text-common"} name={this.props.name} type={"password"} value={this.state[this.props.name]} onChange={this.handleChange.bind(this)} />
                </div>
            )
        }else if(this.props.type === 'qrcode'){
            return(
                <div className={"input-side"}>
                    <p>{this.props.title}</p>
                    <div className={"qrcode-area"}>
                        <div>
                            <input maxLength="4" name={this.props.name} type={"text"} value={this.state[this.props.name]} onChange={this.handleChange.bind(this)} />
                        </div>
                        <img src={HOST.USER_HOST+"/basic/captcha?uuid="+ this.state.uuid} onClick={this.changePicQrcode.bind(this)} />
                    </div>
                </div>
            );
        }else if(this.props.type === 'smscode'){
            return(
                <div className={"input-side"}>
                    <p>{this.props.title}</p>
                    <div className={"qrcode-area"}>
                        <div>
                            <input style={{width:"160px"}} maxLength="6" name={this.props.name} type={"text"} value={this.state[this.props.name]} onChange={this.handleChange.bind(this)} />
                        </div>
                        {this.state[ACTION.SMS_LEFT_TIME] === 0 ?
                            <input value={'发送验证码'} className={"getSms"} type={"button"} onClick={this.sendSmsCode.bind(this)} />:
                            <input value={this.state[ACTION.SMS_LEFT_TIME] + "秒重发"} className={"getSms"} type={"button"} />
                        }
                    </div>
                </div>
            );
        }else if(this.props.type === 'button'){
            return(
                <div className={"input-side"}>
                    <input className={"button-common"} name={this.props.name} type={this.props.type} value={this.props.title}  onClick={this.handleClick.bind(this)} />
                </div>
            );
        }

    }
}
