import React from "react";
import store from "../../../store";
import Axios from "axios";
import qs from "qs";
import {ACTION, COIN, OPERATION} from "../../common/Config";
import NodeRentOperation from "./NodeRentOperation";

export default class NodeRent extends  React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        this.info = {};
        this.pid = 0;
        this.left = 0;
        this.getRentNode();
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
    getRentNode(){
        let _this = this
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/pool/pool/leaseList', qs.stringify(
            {
                'user_id': this.state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'token': this.state[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
            })
        ).then(function(data){
            if(data.data.code === 0){
                _this.info = data.data.data;
                _this.setState(_this);
            }
        })
    }
    openRentDetail(pid,left){
        this.pid = pid;
        this.left = left;
        this.setState(this.state)
    }
    closeRent(){
        this.pid = 0;
        this.left = 0;
        this.setState(this.state)
    }
    render() {
        const listItems = (this.info)?Object.keys(this.info).map((key)=> {
            return(
                <React.Fragment key={key}>
                    <div className={"virtual-node-list list"}>
                        <p className={"text1"}>{this.info[key]['name']}</p>
                        <p className={"text2"}>{COIN.YTA}</p>
                        <p className={"text3"}>{this.info[key]['price']}CNY/个/月</p>
                        <p className={"text4"}>{this.info[key]['node_all']}个</p>
                        {this.info[key]['node_left']>0?
                            <p style={{color:"#5786D2"}} className={"text5"}>{this.info[key]['node_left']}个</p>:
                            <p style={{color:"#CC0000"}} className={"text5"}>0个</p>
                        }
                        {this.info[key]['node_left']>0?
                            <input type={"button"} value={"租"} onClick={this.openRentDetail.bind(this,this.info[key]['up_id'],this.info[key]['node_left'])} />:<React.Fragment></React.Fragment>
                        }
                    </div>
                </React.Fragment>
            )
        }):<React.Fragment></React.Fragment>
        return(
            <React.Fragment>
                <div className={"border"}>
                    <div className={"virtual-node-title topic"}>
                        <p className={"tip1"}>矿场名</p>
                        <p className={"tip2"}>币种</p>
                        <p className={"tip3"}>价格</p>
                        <p className={"tip4"}>节点数</p>
                        <p className={"tip5"}>可租节点</p>
                    </div>
                    {listItems}
                </div>
                {this.pid > 0?
                    <NodeRentOperation pid={this.pid} close={this.closeRent.bind(this)} />:
                    <React.Fragment></React.Fragment>
                }
            </React.Fragment>
        )
    }
}