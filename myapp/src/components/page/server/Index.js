import React from 'react';
import store from "../../../store";
import {ACTION, COIN, OPERATION} from "../../common/Config";
import SelfIcon from "../../../img/self-icon.jpg"
import {Icon, Dropdown, Menu, Button, DatePicker, Input, Modal, message, Checkbox} from "antd";
import {getDiskPower, getTimePeriod, isEmpty, todayFormat} from "../../common/Common";
import moment from "moment";
import YTAIcon from "../../../img/ytacoin.png"
import BHDIcon from "../../../img/bhd_coin.png"
import FILIcon from "../../../img/ico_filecoin.png"
import {chooseUserEntrust,backCommon,virtualMenuTitle} from "../../common/model/ServerModel";

import TrustUserOperation from "./TrustUserOperation"
import MyDevice from "./MyDevice"
import MyEntrust from "./MyEntrust"
import EntrustToMe from "./EntrustToMe"
import MyEntrustDevice from "./MyEntrustDevice"
import EntrustToMeDevice from "./EntrustToMeDevice"
import Axios from "axios";
import qs from "qs";


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
        let menu = this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_2];
        let uid = this.state[OPERATION.SERVER_INFO][ACTION.MY_ENTRUST]
        let tid = this.state[OPERATION.SERVER_INFO][ACTION.ENTRUST_TO_ME]
        return (
            <div className={"server-common"}>
                {menu === OPERATION.SECOND_MENU_3?
                    <StaffManage/>
                    :<React.Fragment></React.Fragment>
                }
                {menu === OPERATION.SECOND_MENU_4?
                    <MyDevice/>
                    : <React.Fragment></React.Fragment>
                }
                {(menu === OPERATION.SECOND_MENU_5 && uid === '')?
                    <MyEntrust/>
                    :<React.Fragment>
                        {(menu === OPERATION.SECOND_MENU_5 && uid !== '')?
                            <MyEntrustDevice/>:<React.Fragment></React.Fragment>
                        }
                    </React.Fragment>
                }

                {(menu === OPERATION.SECOND_MENU_6 && tid === '')?
                    <EntrustToMe/>:
                    <React.Fragment>
                        {(menu === OPERATION.SECOND_MENU_6 && tid !== '')?
                            <EntrustToMeDevice/>:<React.Fragment></React.Fragment>
                        }
                    </React.Fragment>
                }

                {menu === OPERATION.SECOND_MENU_7?
                    <React.Fragment>
                        <VirtualNodeTop/>
                        {this.state[OPERATION.SERVER_INFO][ACTION.VIRTUAL_NODE][ACTION.CURRENT_OPEN] === OPERATION.MY_NODE?
                            <MyNode/>:<React.Fragment></React.Fragment>
                        }
                        {this.state[OPERATION.SERVER_INFO][ACTION.VIRTUAL_NODE][ACTION.CURRENT_OPEN] === OPERATION.APPLY_LIST?
                            <ApplyList/>:<React.Fragment></React.Fragment>
                        }
                        {this.state[OPERATION.SERVER_INFO][ACTION.VIRTUAL_NODE][ACTION.CURRENT_OPEN] === OPERATION.NODE_BUY?
                            <NodeRent/>:<React.Fragment></React.Fragment>
                        }
                    </React.Fragment>:<React.Fragment></React.Fragment>
                }
                {menu === OPERATION.SECOND_MENU_8?
                    <NodeProfit/>:<React.Fragment></React.Fragment>
                }
                {menu === OPERATION.SECOND_MENU_9?
                    <WarningReport/>:<React.Fragment></React.Fragment>
                }
                {menu === OPERATION.SECOND_MENU_10?
                    <WorkingBill/>:<React.Fragment></React.Fragment>
                }
                {menu === OPERATION.SECOND_MENU_12?
                    <VirtualHostUser/>:<React.Fragment></React.Fragment>
                }
                {menu === OPERATION.SECOND_MENU_13?
                    <MyUsers/>:<React.Fragment></React.Fragment>
                }
                {menu === OPERATION.SECOND_MENU_14?
                    <Commission/>:<React.Fragment></React.Fragment>
                }

                {this.state[OPERATION.SERVER_INFO][ACTION.DEVICE_SCREEN][ACTION.CURRENT_OPEN] === OPERATION.TRUST_ADD?
                    <TrustUserOperation/>:<React.Fragment></React.Fragment>
                }
            </div>
        );
    }
}

//员工管理
class StaffManage extends React.Component{
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
        return(
            <React.Fragment>
                <div className={"staff-manage-banner banner"}>
                    <h5>员工管理</h5>
                    <div className={"but1"}>
                        <p>角色设置</p>
                    </div>
                    <div className={"but2"}>
                        <p>添加管理员</p>
                    </div>
                </div>
                <div className={"border"} style={{marginTop:'12px'}}>
                    <div className={"staff-manage-list list"}>
                        <img src={SelfIcon} />
                        <p>刚则·克里斯</p>
                        <div className={"but1"}></div>
                        <div className={"but2"}></div>
                    </div>
                    <div className={"staff-manage-list list"}>
                        <img src={SelfIcon} />
                        <p>刚则·克里斯</p>
                        <div className={"but1"}></div>
                        <div className={"but2"}></div>
                    </div>
                    <div className={"staff-manage-list list"}>
                        <img src={SelfIcon} />
                        <p>刚则·克里斯</p>
                        <div className={"but1"}></div>
                        <div className={"but2"}></div>
                    </div>
                    <div className={"staff-manage-list list"}>
                        <img src={SelfIcon} />
                        <p>刚则·克里斯</p>
                        <div className={"but1"}></div>
                        <div className={"but2"}></div>
                    </div>
                    <div className={"staff-manage-list list"}>
                        <img src={SelfIcon} />
                        <p>刚则·克里斯</p>
                        <div className={"but1"}></div>
                        <div className={"but2"}></div>
                    </div>
                    <div className={"staff-manage-list list"}>
                        <img src={SelfIcon} />
                        <p>刚则·克里斯</p>
                        <div className={"but1"}></div>
                        <div className={"but2"}></div>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}

//虚拟节点公共头
class VirtualNodeTop extends React.Component{
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

//我的节点
class MyNode extends  React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.info = {};
        let page = 1;
        let size = 100;
        this.getMyNode(page,size);
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
    getMyNode(page,size){
        let _this = this
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/pool/poolLease/List', qs.stringify(
            {
                'user_id': this.state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'token': this.state[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
                'show_user_id':this.state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'page':page,
                'page_size':size
            })
        ).then(function(data){
            console.log(data)
            if(data.data.code === 0){
                _this.info = data.data.data;
                _this.setState(_this);
            }
        })
    }
    render() {
        const listItems = (this.info.data)?Object.keys(this.info.data).map((key)=> {
            return(
                <React.Fragment>
                    {this.info.data[key]['status'] === 5?
                        <div className={"virtual-node-list list"}>
                            <p className={"text1"}>{this.info.data[key]['name']}</p>
                            <p className={"text2"}>{this.info.data[key]['mining_type']}</p>
                            <p className={"text3"}>{this.info.data[key]['income']}{this.info.data[key]['mining_type']}</p>
                            <p className={"text4"}>{this.info.data[key]['node_count']}个</p>
                            <p className={"text5"}>
                                {this.info.data[key]['remaining_date'] > 0?
                                    <React.Fragment>挖矿中，还剩{this.info.data[key]['remaining_date']}天</React.Fragment>:
                                    <React.Fragment>已到期</React.Fragment>
                                }
                            </p>
                        </div>:<React.Fragment></React.Fragment>
                    }
                </React.Fragment>
            )
        }):<React.Fragment></React.Fragment>

        return(
            <div className={"border"} >
                {this.page}
                <div className={"virtual-node-title topic"}>
                    <p className={"tip1"}>矿场名</p>
                    <p className={"tip2"}>币种</p>
                    <p className={"tip3"}>收益</p>
                    <p className={"tip4"}>节点数</p>
                    <p className={"tip5"}>状态</p>
                </div>
                {listItems}
            </div>
        )
    }
}

//申请列表
class ApplyList extends  React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.info = {};
        let page = 1;
        let size = 100;
        this.getMyNode(page,size);
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
    getMyNode(page,size){
        let _this = this
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/pool/poolLease/List', qs.stringify(
            {
                'user_id': this.state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'token': this.state[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
                'show_user_id':this.state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'page':page,
                'page_size':size
            })
        ).then(function(data){
            console.log(data)
            if(data.data.code === 0){
                _this.info = data.data.data;
                _this.setState(_this);
            }
        })
    }
    render() {
        const listItems = (this.info.data)?Object.keys(this.info.data).map((key)=> {
            return(
                <React.Fragment>
                    <div className={"virtual-node-list list"}>
                        <p className={"text1"}>{this.info.data[key]['name']}</p>
                        <p className={"text2"}>{this.info.data[key]['mining_type']}</p>
                        <p className={"text3"}>{this.info.data[key]['price']}CNY/个/月</p>
                        <p className={"text4"}>{this.info.data[key]['node_count']}个</p>
                        {this.info.data[key]['status'] == 1 ?
                            <React.Fragment>
                                <p style={{color:"#5786D2"}} className={"text5"}>申请租赁中（{this.info.data[key]['node_count']}）</p>
                            </React.Fragment>:
                            <React.Fragment></React.Fragment>
                        }
                        {this.info.data[key]['status'] == 3 ?
                            <React.Fragment>
                                <p style={{color:"#CC0000"}}  className={"text5"}>申请被拒绝（{this.info.data[key]['node_count']}）</p>
                            </React.Fragment>:
                            <React.Fragment></React.Fragment>
                        }
                        {this.info.data[key]['status'] == 5 ?
                            <React.Fragment>
                                <p style={{color:"#5786D2"}}  className={"text5"}>申请已通过（{this.info.data[key]['node_count']}）</p>
                            </React.Fragment>:
                            <React.Fragment></React.Fragment>
                        }
                    </div>
                </React.Fragment>
            )
        }):<React.Fragment></React.Fragment>
        return(
            <div className={"border"}>
                <div className={"virtual-node-title topic"}>
                    <p className={"tip1"}>矿场名</p>
                    <p className={"tip2"}>币种</p>
                    <p className={"tip3"}>价格</p>
                    <p className={"tip4"}>节点数</p>
                    <p className={"tip5"}>状态</p>
                </div>
                {listItems}
            </div>
        )
    }
}

//节点租赁
class NodeRent extends  React.Component{
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
            console.log(data)
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
    closeCreateArea(){

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
                    <React.Fragment>
                        <div className={"rent-append-block"} >
                            <h5>节点租赁</h5>
                            <Icon onClick={this.closeCreateArea.bind(this)} type="close" style={{position:"absolute",top:"18px",left:"521px",fontSize:"12px"}} />
                            <div className={"block"}>

                            </div>
                            <h5 className={"tip1"}>总价：</h5>
                            <h5 className={"tip2"}>100*6*10=600CNY</h5>
                            <input type={"button"} className={"confirm-button"} value={"确认租赁"}/>
                        </div>
                    </React.Fragment>:
                    <React.Fragment></React.Fragment>
                }
            </React.Fragment>
        )
    }
}

//节点收益
class NodeProfit extends React.Component{
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
        const dateFormat = 'YYYY-MM-DD';
        return(
            <React.Fragment>
                <div className={"node-income-banner banner"}>
                    <h5>节点收益</h5>
                </div>
                <div className={"border"}>
                    <div className={"node-income-total"}>
                        <div className={"icon1"}></div>
                        <p className={"tip1"}>总收益：1000 YTA</p>
                        <div className={"icon2"}></div>
                        <p className={"tip2"}>选择某天的收益</p>
                        <div className={"date"}>
                            <DatePicker defaultValue={moment(todayFormat(),dateFormat)} placeholder="请选择日期"  />
                            <p className={"date-show"}>2018-12-12</p>
                        </div>
                        <button><Icon type="search" />&nbsp;&nbsp;查收益</button>
                    </div>
                    <div className={"node-income-list-title topic"}>
                        <p className={"tip1"}>收入</p>
                        <p className={"tip2"}>地址</p>
                        <p className={"tip3"}>时间</p>
                        <p className={"tip4"}>收益</p>
                    </div>
                    <div className={"node-income-list-detail list"}>
                        <p className={"text1"}>1312312</p>
                        <p className={"text2"}>北京</p>
                        <p className={"text3"}>2019-10-12</p>
                        <p className={"text4"}>1.0000</p>
                    </div>
                    <div className={"node-income-list-detail list"}>
                        <p className={"text1"}>1312312</p>
                        <p className={"text2"}>北京</p>
                        <p className={"text3"}>2019-10-12</p>
                        <p className={"text4"}>1.0000</p>
                    </div>
                    <div className={"node-income-list-detail list"}>
                        <p className={"text1"}>1312312</p>
                        <p className={"text2"}>北京</p>
                        <p className={"text3"}>2019-10-12</p>
                        <p className={"text4"}>1.0000</p>
                    </div>
                    <div className={"node-income-list-detail list"}>
                        <p className={"text1"}>1312312</p>
                        <p className={"text2"}>北京</p>
                        <p className={"text3"}>2019-10-12</p>
                        <p className={"text4"}>1.0000</p>
                    </div>

                </div>
            </React.Fragment>
        )
    }

}

//监控报警
class WarningReport extends React.Component{
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
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer">
                        全部
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer">
                        掉线
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer">
                        坏道
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer">
                        磁盘空间
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a  target="_blank" rel="noopener noreferrer">
                        CPU温度过高
                    </a>
                </Menu.Item>
            </Menu>
        );
        return(
            <React.Fragment>
                <div className={"warning-banner banner"}>
                    <h5>监控报警</h5>
                    <div className={"icon"}></div>
                    <p className={"tip1"}>108条</p>
                    <Dropdown overlay={menu}>
                        <div className={"but3"}>
                            <a className="ant-dropdown-link" href="#">
                                <p>节点租赁</p><Icon style={{position:"absolute",top:"7px",left:"72px",color:"#5786D2"}} type="caret-down" />
                            </a>
                        </div>
                    </Dropdown>
                </div>
                <div className={"border"} style={{marginTop:"10px"}}>
                    <div className={"warning-list list"}>
                        <p>[able1]  2018-09-27 17:21出现分掉线</p>
                    </div>
                    <div className={"warning-list list"}>
                        <p>[able1]  2018-09-27 17:21出现分掉线</p>
                    </div>
                    <div className={"warning-list list"}>
                        <p>[able1]  2018-09-27 17:21出现分掉线</p>
                    </div>
                    <div className={"warning-list list"}>
                        <p>[able1]  2018-09-27 17:21出现分掉线</p>
                    </div>
                    <div className={"warning-list list"}>
                        <p>[able1]  2018-09-27 17:21出现分掉线</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

//工单模块
class WorkingBill extends React.Component{
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
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer">
                        全部工单
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer">
                        诊断工单
                    </a>
                </Menu.Item>
            </Menu>
        );
        return(
            <React.Fragment>
                <div className={"working-bill-banner banner"}>
                    <h5>我的工单</h5>
                    <div className={"icon"}></div>
                    <p className={"tip1"}>108条</p>
                    <Dropdown overlay={menu}>
                        <div className={"but3"}>
                            <a className="ant-dropdown-link" href="#">
                                <p style={{left:'50%',transform:'translate(-70%,0)'}}>全部</p><Icon style={{position:"absolute",top:"7px",left:"72px",color:"#5786D2"}} type="caret-down" />
                            </a>
                        </div>
                    </Dropdown>
                    <div className={"but2"}>
                        <Icon style={{position:'absolute',color:'#5786D2',left:'10px',top:'7px'}} type="plus" />
                        <p style={{left:'50%',transform:'translate(-30%,0)'}}>新建工单</p>
                    </div>
                </div>
                <div className={"border"} style={{marginTop:'10px'}}>
                    <div className={"working-bill-list list"}>
                        <p>（诊断工单）旷工旷工啦</p>
                        <div className={"but2"}></div>
                    </div>
                    <div className={"working-bill-list list"}>
                        <p>（诊断工单）旷工旷工啦</p>
                        <div className={"but2"}></div>
                    </div>
                    <div className={"working-bill-list list"}>
                        <p style={{color:'#9B9B9B'}}>（诊断工单）旷工旷工啦</p>
                        <div className={"but2"}></div>
                    </div>
                    <div className={"working-bill-list list"}>
                        <p style={{color:'#9B9B9B'}}>（诊断工单）旷工旷工啦</p>
                        <div className={"but2"}></div>
                    </div>
                    <div className={"working-bill-list list"}>
                        <p>（诊断工单）旷工旷工啦</p>
                        <div className={"but2"}></div>
                    </div>
                    <div className={"working-bill-list list"}>
                        <p style={{color:'#9B9B9B'}}>（诊断工单）旷工旷工啦</p>
                        <div className={"but2"}></div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

//虚拟主机用户
class VirtualHostUser extends React.Component{
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
        return(
            <React.Fragment>
                <div className={"virtual-host-user-banner banner"}>
                    <h5>虚拟主机用户</h5>
                    <div className={"but2"}>
                        <p>添加虚拟主机用户</p>
                    </div>
                    <Input placeholder={"搜索"} />
                </div>
                <div className={"border"} style={{marginTop:"10px"}}>
                    <div className={"virtual-host-user-list list"}>
                        <img src={SelfIcon} />
                        <p className={"text1"}>用户W742368111</p>
                    </div>
                    <div className={"virtual-host-user-list list"}>
                        <img src={SelfIcon} />
                        <p className={"text1"}>用户W742368111</p>
                    </div>
                    <div className={"virtual-host-user-list list"}>
                        <img src={SelfIcon} />
                        <p className={"text1"}>用户W742368111</p>
                    </div>
                    <div className={"virtual-host-user-list list"}>
                        <img src={SelfIcon} />
                        <p className={"text1"}>用户W742368111</p>
                    </div>
                    <div className={"virtual-host-user-list list"}>
                        <img src={SelfIcon} />
                        <p className={"text1"}>用户W742368111</p>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

//我的用户
class MyUsers extends React.Component{
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
        return(
            <React.Fragment>
                <div className={"my-user-banner banner"}>
                    <h5>我的用户</h5>
                    <Input placeholder={"搜索"} />
                    <div className={"icon1 icon"}></div>
                    <p className={"tip1"}>总共：62台服务器</p>
                    <div className={"icon2 icon"}></div>
                    <p className={"tip2"}>剩余：19台服务器</p>
                </div>
                <div className={"border"} style={{marginTop:"10px"}}>
                    <div className={"my-user-list list"}>
                        <img src={SelfIcon} />
                        <p className={"text1"}>用户W742368111</p>
                        <div>6台</div>
                    </div>
                    <div className={"my-user-list list"}>
                        <img src={SelfIcon} />
                        <p className={"text1"}>用户W742368111</p>
                        <div>6台</div>
                    </div>
                    <div className={"my-user-list list"}>
                        <img src={SelfIcon} />
                        <p className={"text1"}>用户W742368111</p>
                        <div>6台</div>
                    </div>
                    <div className={"my-user-list list"}>
                        <img src={SelfIcon} />
                        <p className={"text1"}>用户W742368111</p>
                        <div>6台</div>
                    </div>
                    <div className={"my-user-list list"}>
                        <img src={SelfIcon} />
                        <p className={"text1"}>用户W742368111</p>
                        <div>6台</div>
                    </div>
                    <div className={"my-user-list list"}>
                        <img src={SelfIcon} />
                        <p className={"text1"}>用户W742368111</p>
                        <div>6台</div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

//抽成设置
class Commission extends React.Component{
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
        return(
            <React.Fragment>
                <div className={"commission-banner banner"}>
                    <h5>抽成设置</h5>
                </div>
                <div className={"border"} style={{marginTop:"10px"}}>
                    <div className={"commission-list list"}>
                        <img src={FILIcon} />
                        <p className={"text1"}>FIL</p>
                        <div>设置</div>
                    </div>
                    <div className={"commission-list list"}>
                        <img src={YTAIcon} />
                        <p className={"text1"}>YTA</p>
                        <div>设置</div>
                    </div>
                    <div className={"commission-list list"}>
                        <img src={BHDIcon} />
                        <p className={"text1"}>BHD</p>
                        <div>设置</div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
