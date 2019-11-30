import React from "react";
import store from "../../../store";
import UserIndex from "../../page/user/Index"
import ServerMenu from "../../page/menu/Server"
import PoolMenu from "../../page/menu/Pool"
import UserMenu from "../../page/menu/User"
import {OPERATION,ACTION} from "../Config";

export default class app extends React.Component {
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
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    render() {
        if(this.state[OPERATION.MENU_INFO][ACTION.INDEX_MENU] === OPERATION.INDEX_MENU_1){
            return (
                <UserIndex />
            );
        }else if(this.state[OPERATION.MENU_INFO][ACTION.INDEX_MENU] === OPERATION.INDEX_MENU_2){
            return (
                <ServerMenu />
            );
        }else if(this.state[OPERATION.MENU_INFO][ACTION.INDEX_MENU] === OPERATION.INDEX_MENU_3){
            return (
                <PoolMenu />
            );
        }else if(this.state[OPERATION.MENU_INFO][ACTION.INDEX_MENU] === OPERATION.INDEX_MENU_4){
            return (
                <UserMenu />
            );
        }


    }
}