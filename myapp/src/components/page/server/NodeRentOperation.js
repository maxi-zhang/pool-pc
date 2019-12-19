import React from "react";
import store from "../../../store";
import {isEmpty} from "../../common/Common";
import Axios from "axios";
import qs from "qs";
import {ACTION, OPERATION} from "../../common/Config";
import {Icon, Input, message, Radio} from "antd";

export default class NodeRentOperation extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        this.info = {};
        this.period = 6;
        this.nodeNo = 0;
        this.total = 0;
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
    closeCreateArea(){
        this.props.close()
    }
    onChangeTime(e){
        this.period = e.target.value;
        this.setState(this.state)
    }
    changeBuyNo(e){
        if(!isNaN(e.target.value)){
            if(isEmpty(e.target.value)){
                this.nodeNo = 0;
            }
            if(!(this.info['node_all'] && e.target.value>this.info['node_all'])){
                this.nodeNo = e.target.value;
            }
            this.setState(this.state)
        }
    }
    getRentNode(){
        let _this = this
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/pool/pool/leaseInfo', qs.stringify(
            {
                'user_id': this.state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'token': this.state[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
                'up_id':this.props.pid
            })
        ).then(function(data){
            if(data.data.code === 0){
                _this.info = data.data.data;
                _this.setState(_this);
            }
        })
    }
    confirmRent(){
        if(isEmpty(this.nodeNo)){
            message.info("请输入要租赁的节点数")
            return
        }
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/pool/poolLease/add', qs.stringify(
            {
                'user_id': this.state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'token': this.state[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
                'up_id':this.props.pid,
                'node_count':this.nodeNo,
                'duration':this.period
            })
        ).then(function(data){
            if(data.data.code === 0){
                this.getRentNode()
            }else{
                message.info(data.data.description)
            }
        })
    }
    render() {
        let total = this.nodeNo*this.period*this.info['price']
        let count = this.nodeNo?this.nodeNo:0;
        return(
            <React.Fragment>
                <div onClick={this.closeCreateArea.bind(this)} className={"add-delete-background"}></div>
                <div className={"rent-append-block"} >
                    <h5>节点租赁</h5>
                    <Icon onClick={this.closeCreateArea.bind(this)} type="close" style={{position:"absolute",top:"18px",left:"521px",fontSize:"12px"}} />
                    <div className={"block"}>
                        <p className={"text1"}>节点名：&nbsp;&nbsp;{this.info['name']}</p>
                        <div className={"node"}>
                            <p className={"tip1"}>节点数：</p>
                            <p className={"text1"}>（总数）{this.info['node_all']}个</p>
                            <p className={"text2"}>（已租）{this.info['node_resource']}个</p>
                            <p className={"text3"}>（可租）{this.info['node_left']}个</p>
                        </div>
                        <p className={"text2"}>支持挖矿类型：YTA</p>
                        <div className={"time"}>
                            <p className={"tip1"}>购买期限：</p>
                            <p className={"tip2"}>6个月</p>
                            <p className={"tip3"}>一年</p>
                            <p className={"tip4"}>两年</p>
                            <p className={"tip5"}>三年</p>
                            <Radio.Group name="timeChoose" onChange={this.onChangeTime.bind(this)} value={this.period}>
                                <Radio style={{top:'-3px',left:"60px",position:"absolute"}} value={6}></Radio>
                                <Radio style={{top:'-3px',left:"123px",position:"absolute"}} value={12}></Radio>
                                <Radio style={{top:'-3px',left:"181px",position:"absolute"}} value={24}></Radio>
                                <Radio style={{top:'-3px',left:"237px",position:"absolute"}} value={36}></Radio>
                            </Radio.Group>
                        </div>
                        <p className={"text3"}>请输入购买节点数：</p>
                        <Input value={this.nodeNo} onChange={this.changeBuyNo.bind(this)} className={"buy-no"}/>
                        <p className={"text4"}>节点价格：每个每月{this.info['price']}CNY</p>
                    </div>
                    <h5 className={"tip1"}>总价：</h5>
                    <h5 className={"tip2"}>{count}*{this.period}*{this.info['price']}={total}CNY</h5>
                    <input onClick={this.confirmRent.bind(this)} type={"button"} className={"confirm-button"} value={"确认租赁"}/>
                </div>
            </React.Fragment>
        )
    }
}