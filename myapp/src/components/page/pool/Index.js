import React from 'react';
import store from "../../../store";
import {Checkbox, Icon} from "antd";
import {ACTION, OPERATION} from "../../common/Config";
import { isEmpty} from "../../common/Common";
import {
    getUserPool,
} from "../../common/model/PoolModel";
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
import ControlPanel from  "./ControlPanel"
import IncomeTotal from  "./IncomeTotal"
import AdvanceSearch from  "./AdvanceSearch"
import ProfitPanel from "./ProfitPanel"
import IncomeDetail from "./IncomeDetail"

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
                                {(this.state[OPERATION.PATH_INFO][ACTION.CURRENT_OPEN] === OPERATION.ADVANCE_SEARCH_ONE||this.state[OPERATION.PATH_INFO][ACTION.CURRENT_OPEN] === OPERATION.ADVANCE_SEARCH_TWO ) ?
                                    <IncomeTotal />:<React.Fragment></React.Fragment>
                                }
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










