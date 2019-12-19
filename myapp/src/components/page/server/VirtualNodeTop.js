import React from "react";
import store from "../../../store";
import {virtualMenuTitle} from "../../common/model/ServerModel";
import {ACTION, OPERATION} from "../../common/Config";

export default class VirtualNodeTop extends React.Component{
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
    changeMenu(title){
        virtualMenuTitle(title)
    }
    render() {
        const open = this.state[OPERATION.SERVER_INFO][ACTION.VIRTUAL_NODE][ACTION.CURRENT_OPEN];
        return(
            <div className={"virtual-node-banner banner"}>
                <h5>虚拟节点</h5>
                {open === OPERATION.MY_NODE?
                    <div className={"but1 on"} onClick={this.changeMenu.bind(this,OPERATION.MY_NODE)}>
                        <p>我的节点</p>
                    </div>:<div className={"but1"} onClick={this.changeMenu.bind(this,OPERATION.MY_NODE)}>
                        <p>我的节点</p>
                    </div>
                }
                {open === OPERATION.APPLY_LIST?
                    <div className={"but2 on"} onClick={this.changeMenu.bind(this,OPERATION.APPLY_LIST)}>
                        <p>申请列表</p>
                    </div>: <div className={"but2"} onClick={this.changeMenu.bind(this,OPERATION.APPLY_LIST)}>
                        <p>申请列表</p>
                    </div>
                }
                {open === OPERATION.NODE_BUY?
                    <div className={"but3 on"} onClick={this.changeMenu.bind(this,OPERATION.NODE_BUY)}>
                        <p>节点租赁</p>
                    </div>: <div className={"but3"} onClick={this.changeMenu.bind(this,OPERATION.NODE_BUY)}>
                        <p>节点租赁</p>
                    </div>
                }
            </div>
        )
    }
}