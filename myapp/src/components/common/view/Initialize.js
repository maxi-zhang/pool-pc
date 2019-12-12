import React from 'react';
import store from "../../../store";
import {checkNetworkIp, checkUserToken} from "../Common";
import {ACTION, OPERATION} from "../Config";

export default class app extends React.Component {
    constructor(props){
        super(props);
        this.state = store.getState();
        checkNetworkIp()
        if(this.state[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN] && this.state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID]){
            checkUserToken(this.state);
        }
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
        return(
            <React.Fragment></React.Fragment>
        )
    }

}