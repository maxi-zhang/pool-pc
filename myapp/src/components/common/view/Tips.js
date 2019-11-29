import React from 'react';
import store from "../../../store";
import {ACTION, OPERATION} from '../Config'

export default class Index extends React.Component {
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
        let margin = 180;
        if(this.state[ACTION.CURRENT_OPERATION] === OPERATION.CHECK_SMS_CODE){
            margin = 130;
        }
        if(this.state[ACTION.CURRENT_PATH] === '/userPage/login'){
            if(this.state[ACTION.LOGIN_STATUS] === 1){
                margin = 180;
            }else if(this.state[ACTION.LOGIN_STATUS] === 3){
                margin = 80;
            }else if(this.state[ACTION.LOGIN_STATUS] === 5){
                margin = 155;
            }else{
                margin = 180;
            }
        }
        return <h5 style={{marginTop:margin +"px"}} className={"login-title"}>{this.props.title}</h5>

    }
}