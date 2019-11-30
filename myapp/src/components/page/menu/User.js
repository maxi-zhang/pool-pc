import React from 'react';
import store from "../../../store";
import {ACTION, OPERATION} from "../../common/Config";

export default class app extends React.Component {
    constructor(props){
        super(props);
        this.state = store.getState();
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
        if(this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_4] === OPERATION.SECOND_MENU_1){
            return (<div>钱包设置</div>);
        }else if(this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_4] === OPERATION.SECOND_MENU_2){
            return (<div>关于我们</div>);
        }else{
            return (<div>钱包设置</div>);
        }
    }
}