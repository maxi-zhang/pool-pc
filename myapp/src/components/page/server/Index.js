import React from 'react';
import store from "../../../store";
import {ACTION, COIN, OPERATION} from "../../common/Config";
import SelfIcon from "../../../img/self-icon.jpg"
import {Icon, Dropdown, Menu, Button, DatePicker, Input, Radio, message, Modal} from "antd";
import {getDiskPower} from "../../common/Common";
import moment from "moment";
import YTAIcon from "../../../img/ytacoin.png"
import BHDIcon from "../../../img/bhd_coin.png"
import FILIcon from "../../../img/ico_filecoin.png"
import {
    chooseUserEntrust,
} from "../../common/model/ServerModel";

import TrustUserOperation from "./TrustUserOperation"
import MyDevice from "./MyDevice"
import MyEntrust from "./MyEntrust"
import EntrustToMe from "./EntrustToMe"
import MyEntrustDevice from "./MyEntrustDevice"
import EntrustToMeDevice from "./EntrustToMeDevice"
import NodeRent from "./NodeRent"
import VirtualNodeTop from "./VirtualNodeTop"
import MyNode from "./MyNode"
import ApplyList from "./ApplyList"
import NodeProfit from "./NodeProfit"
import StaffManage from "./StaffManage"
import DistributeRole from "./DistributeRole"

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
