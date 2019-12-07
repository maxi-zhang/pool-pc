import React from 'react';
import store from "../../../store";
import {Icon, DatePicker, Input, Menu, Dropdown} from "antd";
import moment from 'moment';
import {ACTION, OPERATION} from "../../common/Config";
import {getDiskPower, isEmpty} from "../../common/Common";
import {getUserPool} from "../../common/model/PoolModel";
import PoolInsideTop from "./PoolInsideTop";
import PoolSet from "./PoolSet"
import AddMiner from "./AddMiner"
import DeleteMiner from "./DeleteMiner"
import AddGroup from  "./AddGroup"
import DeleteGroup from  "./DeleteGroup"
import PowerTotal from  "./PowerTotal"
import GroupList from  "./GroupList"
import MinerListDetail from "./MinerListDetail"
import GroupPowerTotal from  "./GroupPowerTotal"
import AddGroupMiner from "./AddGroupMiner"
import DeleteGroupMiner from "./DeleteGroupMiner"


export default class app extends React.Component {
    constructor(props){
        super(props);
        this.state = store.getState();
        getUserPool();
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
        const exist = this.state[OPERATION.POOL_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]
        return (
            <div className={"inner-common"}>
                {exist?
                    <React.Fragment>
                        <PoolInsideTop/>
                        {/* 租赁模块的页面  */}
                        {this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.POOL_INDEX][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]] === OPERATION.POOL_RENT?
                            <React.Fragment>
                                <RentTotal />
                                <RentDetail />
                            </React.Fragment> :<React.Fragment></React.Fragment>
                        }
                        {/* 收益模块的页面  */}
                        {this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.POOL_INDEX][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]] === OPERATION.POOL_PROFIT?
                            <React.Fragment>
                                <ProfitPanel />
                                <IncomeTotal />
                                <IncomeDetail />
                            </React.Fragment> :<React.Fragment></React.Fragment>
                        }
                        {/* 运维模块的页面  */}
                        {(this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.POOL_INDEX][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]] === OPERATION.POOL_OPERATION || isEmpty(this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.POOL_INDEX][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]))?
                            <React.Fragment>
                                <PowerTotal />
                                <GroupList />
                            </React.Fragment> :<React.Fragment></React.Fragment>
                        }
                        {/* 矿机模块的页面  */}
                        {(this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.POOL_INDEX][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]] === "default" || !isNaN(this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.POOL_INDEX][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]))?
                            <React.Fragment>
                                <ControlPanel />
                                <GroupPowerTotal/>
                                <MinerListDetail />
                            </React.Fragment> :<React.Fragment></React.Fragment>
                        }

                        {this.state[OPERATION.PATH_INFO][ACTION.CURRENT_OPEN] === OPERATION.POOL_SET?
                            <PoolSet />:<React.Fragment></React.Fragment>
                        }
                        {this.state[OPERATION.PATH_INFO][ACTION.CURRENT_OPEN] === OPERATION.ADD_MINER?
                            <AddMiner />:<React.Fragment></React.Fragment>
                        }
                        {this.state[OPERATION.PATH_INFO][ACTION.CURRENT_OPEN] === OPERATION.DELETE_MINER?
                            <DeleteMiner />:<React.Fragment></React.Fragment>
                        }
                        {this.state[OPERATION.PATH_INFO][ACTION.CURRENT_OPEN] === OPERATION.ADVANCE_SEARCH_TWO?
                            <AdvanceSearch />:<React.Fragment></React.Fragment>
                        }
                        {this.state[OPERATION.PATH_INFO][ACTION.CURRENT_OPEN] === OPERATION.BILL_APPLY?
                            <ApplyOrderList />:<React.Fragment></React.Fragment>
                        }
                        {this.state[OPERATION.PATH_INFO][ACTION.CURRENT_OPEN] === OPERATION.ADD_GROUP?
                            <AddGroup />:<React.Fragment></React.Fragment>
                        }
                        {this.state[OPERATION.PATH_INFO][ACTION.CURRENT_OPEN] === OPERATION.DEL_GROUP?
                            <DeleteGroup />:<React.Fragment></React.Fragment>
                        }
                        {this.state[OPERATION.PATH_INFO][ACTION.CURRENT_OPEN] === OPERATION.ADD_GROUP_MINER?
                            <AddGroupMiner/>:<React.Fragment></React.Fragment>
                        }
                        {this.state[OPERATION.PATH_INFO][ACTION.CURRENT_OPEN] === OPERATION.DELETE_GROUP_MINER?
                            <DeleteGroupMiner/>:<React.Fragment></React.Fragment>
                        }
                    </React.Fragment>:<React.Fragment></React.Fragment>
                }
                <br/><br/><br/><br/><br/>
            </div>
        );
    }
}

class RentTotal extends React.Component {
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    storeChange(){
        this.state = store.getState();
        this.setState(this.state)
    }
    render() {
        return (
            <div className={"border"}>
                <div className={"total-account"}>
                    <div className={"tip-icon icon1"}></div>
                    <p className={"tip1"}>总节点：10</p>
                    <div className={"tip-icon icon2"}></div>
                    <p className={"tip2"}>剩余节点：1</p>
                </div>
            </div>
        );
    }
}

class IncomeDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    storeChange(){
        this.state = store.getState();
        this.setState(this.state)
    }
    render() {
        return(
            <div className={"border"}>
                <div className={"income-detail-title"}>
                    <p className={"tip1"}>矿工名</p>
                    <p className={"tip2"}>地址</p>
                    <p className={"tip3"}>时间</p>
                    <p className={"tip4"}>收益</p>
                </div>
                <div className={"income-detail-list"}>
                    <p className={"text1"}>hh1.maxi</p>
                    <p className={"text2"}>北京</p>
                    <p className={"text3"}>2019.10.12</p>
                    <p className={"text4"}>132.1231231</p>
                </div>
                <div className={"income-detail-list"}>
                    <p className={"text1"}>hh1.maxi</p>
                    <p className={"text2"}>北京</p>
                    <p className={"text3"}>2019.10.12</p>
                    <p className={"text4"}>132.1231231</p>
                </div>
                <div className={"income-detail-list"}>
                    <p className={"text1"}>hh1.maxi</p>
                    <p className={"text2"}>北京</p>
                    <p className={"text3"}>2019.10.12</p>
                    <p className={"text4"}>132.1231231</p>
                </div>
                <div className={"income-detail-list"}>
                    <p className={"text1"}>hh1.maxi</p>
                    <p className={"text2"}>北京</p>
                    <p className={"text3"}>2019.10.12</p>
                    <p className={"text4"}>132.1231231</p>
                </div>
                <div className={"income-detail-list"}>
                    <p className={"text1"}>hh1.maxi</p>
                    <p className={"text2"}>北京</p>
                    <p className={"text3"}>2019.10.12</p>
                    <p className={"text4"}>132.1231231</p>
                </div>
                <div className={"income-detail-list"}>
                    <p className={"text1"}>hh1.maxi</p>
                    <p className={"text2"}>北京</p>
                    <p className={"text3"}>2019.10.12</p>
                    <p className={"text4"}>132.1231231</p>
                </div>
            </div>
        )
    }
}

class ControlPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    storeChange(){
        this.state = store.getState();
        this.setState(this.state)
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a rel="noopener noreferrer" href="/#/">
                        全部
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a rel="noopener noreferrer" href="/#/" className={"on"}>
                        在线
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a rel="noopener noreferrer" href="/#/" className={"off"}>
                        离线
                    </a>
                </Menu.Item>
            </Menu>
        );
        return(
            <div className={"control-panel"}>
                <div className={"status"}>
                    <Dropdown placement={"bottomCenter"} overlayClassName={"machine-status"} overlay={menu} >
                        <a className="ant-dropdown-link" href="#">
                            <div>
                                <p>全部</p>
                                <Icon type="caret-down" style={{position:"absolute",top:"50%",transform: "translate(0, -50%)",left:"72%",fontSize:"12px"}} />
                            </div>
                        </a>
                    </Dropdown>
                </div>
                <div className={"click icon1"}></div>
                <div className={"click icon2"}></div>
                <div className={"click icon3"}></div>
                <p className={"tip1"}>重启</p>
                <p className={"tip2"}>关闭</p>
                <p className={"tip3"}>远程诊断</p>
            </div>
        )
    }
}

class RentDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    storeChange(){
        this.state = store.getState();
        this.setState(this.state)
    }
    render() {
        return(
            <div className={"border"}>
                <div className={"rent-list-title"}>
                    <p className={"tip1"}>ID</p>
                    <p className={"tip2"}>用户名</p>
                    <p className={"tip3"}>节点数</p>
                    <p className={"tip4"}>出售时间</p>
                    <p className={"tip5"}>到期时间</p>
                    <p className={"tip6"}>申请状态</p>
                </div>
                <div className={"rent-list-detail"}>
                    <p className={"text1"}>201911</p>
                    <p className={"text2"}>用户名有限公司</p>
                    <p className={"text3"}>1个</p>
                    <p className={"text4"}>2019-02-12</p>
                    <p className={"text5"}>114天</p>
                    <p className={"text6"}>已忽略</p>
                </div>
                <div className={"rent-list-detail"}>
                    <p className={"text1"}>201911</p>
                    <p className={"text2"}>用户名有限公司</p>
                    <p className={"text3"}>1个</p>
                    <p className={"text4"}>2019-02-12</p>
                    <p className={"text5"}>114天</p>
                    <p className={"text6"}>已忽略</p>
                </div>
                <div className={"rent-list-detail"}>
                    <p className={"text1"}>201911</p>
                    <p className={"text2"}>用户名有限公司</p>
                    <p className={"text3"}>1个</p>
                    <p className={"text4"}>2019-02-12</p>
                    <p className={"text5"}>114天</p>
                    <p className={"text6"}>已忽略</p>
                </div>
            </div>
        );
    }
}

class ApplyOrderList extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    storeChange(){
        this.state = store.getState();
        this.setState(this.state)
    }
    render() {
        return(
            <div className={"apply-book-list"}>
                <h5>订单管理</h5>
                <Icon type="close" style={{position:"absolute",top:"18px",left:"521px",fontSize:"12px"}} />
                <div className={"info-area"}>
                    <div className={"info"}>
                        <h5>申请用户</h5>
                        <p className={"text1"}>节点数：100个</p>
                        <p className={"text2"}>价格：1个10CNY</p>
                        <p className={"text3"}>有效期：6个月</p>
                        <p className={"text4"}>总价格600CNY</p>
                        <input type={"button"} className={"agree"} value={"同意"} />
                        <input type={"button"} className={"cancel"} value={"忽略"} />
                    </div>
                    <div className={"info"}>
                        <h5>申请用户</h5>
                        <p className={"text1"}>节点数：100个</p>
                        <p className={"text2"}>价格：1个10CNY</p>
                        <p className={"text3"}>有效期：6个月</p>
                        <p className={"text4"}>总价格600CNY</p>
                        <input type={"button"} className={"agree"} value={"同意"} />
                        <input type={"button"} className={"cancel"} value={"忽略"} />
                    </div>
                    <div className={"info"}>
                        <h5>申请用户</h5>
                        <p className={"text1"}>节点数：100个</p>
                        <p className={"text2"}>价格：1个10CNY</p>
                        <p className={"text3"}>有效期：6个月</p>
                        <p className={"text4"}>总价格600CNY</p>
                        <input type={"button"} className={"agree"} value={"同意"} />
                        <input type={"button"} className={"cancel"} value={"忽略"} />
                    </div>
                    <div className={"info"}>
                        <h5>申请用户</h5>
                        <p className={"text1"}>节点数：100个</p>
                        <p className={"text2"}>价格：1个10CNY</p>
                        <p className={"text3"}>有效期：6个月</p>
                        <p className={"text4"}>总价格600CNY</p>
                        <input type={"button"} className={"agree"} value={"同意"} />
                        <input type={"button"} className={"cancel"} value={"忽略"} />
                    </div>
                </div>
            </div>
        )
    }
}

class IncomeTotal extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    storeChange(){
        this.state = store.getState();
        this.setState(this.state)
    }
    render() {
        return(
            <div className={"border"}>
                <div className={"income-search-area"}>
                    <div className={"search-area"}><Icon type="search" style={{position:"absolute",left:'531px',fontSize:'16px',color:'#2155AA'}} /></div>
                    <div className={"screen-area"}>筛选</div>
                </div>
                <div className={"total-income-area"}>
                    <div className={"tip-icon icon1"}></div>
                    <p className={"tip1"}>12笔收益</p>
                    <p className={"tip2"}>收入12.200FIL</p>
                </div>
            </div>
        )
    }
}

class ProfitPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    storeChange(){
        this.state = store.getState();
        this.setState(this.state)
    }
    render() {
        return(
            <div className={"border"}>
                <div className={"profit-screen-panel"}>
                    <div className={"icon1"}></div>
                    <p className={"tip1"}>总收益：12.200FIL</p>
                    <div className={"icon2"}></div>
                    <p className={"tip2"}>选择某天的收益</p>
                    <div className={"date"}>
                        {/*<p>2019-10-12</p>*/}
                        <DatePicker />
                        {/*<Icon style={{position:"absolute",left:"70px",top:'1px',color:"rgba(87,134,210,1)"}} type="caret-down" />*/}
                    </div>
                    <button><Icon type="search" />&nbsp;&nbsp;查收益</button>
                </div>
            </div>
        )
    }
}

class AdvanceSearch extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    storeChange(){
        this.state = store.getState();
        this.setState(this.state)
    }
    render() {
        const dateFormat = 'YYYY/MM/DD';
        return(
            <div className={"advance-search"}>
                <h5>高级搜索</h5>
                <Icon type="close" style={{position:"absolute",top:"18px",left:"386px",fontSize:"12px"}} />
                <Input className={"search"} placeholder="请输入名称/地址等关键字" />
                <button className={"but1 on"}>本月</button>
                <button className={"but2"}>上月</button>
                <button className={"but3"}>今年</button>
                <button className={"but4"}>前年</button>
                <button className={"but5 on"}>委托</button>
                <button className={"but6"}>未委托</button>
                <DatePicker placeholder="开始日期" defaultValue={moment('2015/01/01', dateFormat)} className={"date date1"} />
                <div className={"hr"}></div>
                <DatePicker placeholder="结束日期" defaultValue={moment('2015/01/01', dateFormat)} className={"date date2"} />
                <input className={"submit"} type={"button"} value={"确定并开始搜索"} />
            </div>
        )
    }
}


