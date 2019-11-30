import React from 'react';
import store from "../store";

import {ACTION, OPERATION, PATH} from "./common/Config";
import FrameCommon from './common/view/FrameCommon'
import InsideCommon from './common/view/InsideCommon'
import {checkUserToken} from "./common/Common";

import Login from "./page/user/Login";
import Register from "./page/user/Register";

export default class app extends React.Component {
    constructor(props){
        super(props);
        this.state = store.getState();
        checkUserToken(this.state)
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
        if(this.state[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN] && this.state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID]){
            return (
                <div id={"menu-common"}>
                    <FrameCommon />
                    <InsideCommon />
                </div>
            );
        }else{
            if(this.state[OPERATION.PATH_INFO][ACTION.CURRENT_PATH] === PATH.USER_REGISTER){
                return (
                    <Register />
                )
            }else{
                return (
                    <Login />
                )
            }
        }

    }
}