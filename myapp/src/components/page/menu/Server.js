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
        if(this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_2] === OPERATION.SECOND_MENU_3){
            return (<div>员工管理</div>);
        }else if(this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_2] === OPERATION.SECOND_MENU_4){
            return (<div>我的设备</div>);
        }else if(this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_2] === OPERATION.SECOND_MENU_5){
            return (<div>我的委托</div>);
        }else if(this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_2] === OPERATION.SECOND_MENU_6){
            return (<div>委托给我</div>);
        }else if(this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_2] === OPERATION.SECOND_MENU_7){
            return (<div>虚拟节点</div>);
        }else if(this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_2] === OPERATION.SECOND_MENU_8){
            return (<div>节点收益</div>);
        }else if(this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_2] === OPERATION.SECOND_MENU_9){
            return (<div>监控报警</div>);
        }else if(this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_2] === OPERATION.SECOND_MENU_10){
            return (<div>工单</div>);
        }else{
            return (<div>员工管理</div>);
        }
    }
}