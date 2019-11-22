import React from 'react';
import {Link} from "react-router-dom";
import {clearReduxData} from "../../common/Model";
import store from "../../../store";
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
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    render() {
        return (
            <div>
                <Link to = "/userPage/register">
                    <p className={"go-login"}>注册账户</p>
                </Link>
            </div>
        );
    }
}