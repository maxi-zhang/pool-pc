import React from 'react';
import {host} from './Config'
import store from '../../store'

export default class InputText extends  React.Component{
    constructor(props){
        super(props)
        this.state = store.getState();
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.storeChange = this.storeChange.bind(this);
        this.changePicQrcode = this.changePicQrcode.bind(this);
        store.subscribe(this.storeChange);
    }
    storeChange(){
        this.setState(store.getState())
    }
    handleChange(e){
        this.setState({value:e.target.value})
        const action = {
            type:'changeInput',
            key:e.target.name,
            value:e.target.value
        }
        store.dispatch(action)
    }
    handleClick(e){
        const action = {
            type:'submitInput',
            action:e.target.name,
        }
        store.dispatch(action)
    }
    changePicQrcode(){
        const action = {
            type:'changeUuid'
        }
        store.dispatch(action)
    }
    render() {
        if(this.props.type === 'text'){
            return(
                <div className={"input-side"}>
                    <p>{this.props.title}</p>
                    {this.props.name === 'mobile-number'?
                        // 如果为手机号则限制为11位
                        < input maxLength="11" className={"text-common"} name={this.props.name} type={this.state.type} value={this.state[this.props.name]} onChange={this.handleChange} />:
                        < input className={"text-common"} name={this.props.name} type={this.state.type} value={this.state[this.props.name]} onChange={this.handleChange} />
                    }
                    {/*<p>{this.state.abc.inputValue}</p>*/}
                </div>
            );
        }else if(this.props.type === 'qrcode'){
            return(
                <div className={"input-side"}>
                    <p>{this.props.title}</p>
                    <div className={"qrcode-area"}>
                        <div>
                            <input maxLength="4" name={this.props.name} type={"text"} value={this.state[this.props.name]} onChange={this.handleChange} />
                        </div>
                        <img src={host.user_host+"/basic/captcha?uuid="+ this.state.uuid} onClick={this.changePicQrcode} />
                    </div>
                </div>
            );
        }else if(this.props.type === 'button'){
            return(
                <div className={"input-side"}>
                    <input className={"button-common"} name={this.props.name} type={this.props.type} value={this.props.title} onClick={this.handleClick} />
                </div>
            );
        }

    }
}
