import React from 'react';
import store from "../../../store";
import {Dropdown, Icon, Menu,Checkbox,DatePicker,Input,Switch} from "antd";
import moment from 'moment';
import FileIcon from '../../../img/filecoin.png'
import YtaIcon from '../../../img/ytacoin.png'
import LambIcon from '../../../img/lambicon.png'

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

        return (
            <div className={"inner-common"}>
                {0?
                    <div>
                        <PoolInsideTop />
                        <RentTotal />
                        <PowerTotal />
                        <GroupList />
                        <IncomeTotal />
                        <IncomeDetail />
                        <ControlPanel />
                        <MinerListDetail />
                        <AddDeleteMiner />
                        <DeleteGroup />
                        <PoolSet />
                    </div>:<div></div>
                }



                {0?
                    <div>
                        <PoolInsideTop />
                        <ProfitPanel />
                        <IncomeDetail />
                        <AdvanceSearch />
                    </div> :
                    <div></div>
                }
                {0?
                    <div>
                        <PoolInsideTop />
                        <RentTotal />
                        <RentDetail />
                        <ApplyOrderList />
                    </div> :
                    <div></div>
                }
                {0?
                    <AddDeleteMiner/> :
                    <div></div>
                }
                <br/><br/><br/><br/><br/>
            </div>
        );
    }
}


class DropdownList extends React.Component {
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
        if(this.props.type === 'coin'){
            const menu = (
                <Menu>
                    <Menu.Item>
                        <a rel="noopener noreferrer" href="/#/">
                            YTA
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a rel="noopener noreferrer" href="/#/">
                            FIL
                        </a>
                    </Menu.Item>
                </Menu>
            );
            return (
                <Dropdown placement={"bottomCenter"} overlayClassName={"more-operation"} overlay={menu} >
                    <div className={"coin-select"}>
                        <a className="ant-dropdown-link" href="#">
                            <button className={"coin"}>YTA <Icon type="caret-down" /></button>
                        </a>
                    </div>
                </Dropdown>
            )
        }else if(this.props.type === 'operation'){
            const menu = (
                <Menu>
                    <Menu.Item>
                        <a rel="noopener noreferrer" href="/#/">
                            设置
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a rel="noopener noreferrer" href="/#/">
                            添加矿工
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a rel="noopener noreferrer" href="/#/">
                            移除矿工
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a rel="noopener noreferrer" href="/#/">
                            excel导入矿机
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a rel="noopener noreferrer" href="/#/">
                            导出excel模板
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a rel="noopener noreferrer" href="/#/">
                            订单管理
                        </a>
                    </Menu.Item>
                </Menu>
            );
            return (
                <Dropdown placement={"bottomRight"} overlayClassName={"more-operation"} overlay={menu} >
                    <div className={"operation-block"}>
                        <a className="ant-dropdown-link" href="#">
                            <div className={"more-operation"}>
                                <Icon type="ellipsis" />
                            </div>
                        </a>
                    </div>
                </Dropdown>
            );
        }else if(this.props.type === 'status'){
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
            return (
                <Dropdown placement={"bottomCenter"} overlayClassName={"machine-status"} overlay={menu} >
                    <a className="ant-dropdown-link" href="#">
                        <div>
                            <p>全部</p>
                            <Icon type="caret-down" style={{position:"absolute",top:"50%",transform: "translate(0, -50%)",left:"72%",fontSize:"12px"}} />
                        </div>
                    </a>
                </Dropdown>
            );
        }
    }
}

class PoolInsideTop extends React.Component{
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
            <div className={"pool-top-common"}>
                <h5>委内瑞拉矿场</h5>
                <h6 className={"tip1"}>总磁盘：32.5TB</h6>
                <h6 className={"tip2"}>YTA/BHD</h6>
                <DropdownList type={"coin"} />
                <button className={"rent on"} type={"button"} >租赁</button>
                <button className={"manage"} type={"button"} >运维</button>
                <button className={"income"} type={"button"} >收益</button>
                <DropdownList type={"operation"} />
            </div>
        )
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
            <div className={"total-account"}>
                <div className={"tip-icon icon1"}></div>
                <p className={"tip1"}>总节点：10</p>
                <div className={"tip-icon icon2"}></div>
                <p className={"tip2"}>剩余节点：1</p>
            </div>
        );
    }
}

class PowerTotal extends React.Component{
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
            <div className={"pool-power-total"}>
                <div className={"tip-icon icon1"}></div>
                <p className={"tip1"}>当前算力（点击查看曲线图）</p>
                <p className={"text1"}>10000GB</p>
                <div className={"tip-icon icon2"}></div>
                <p className={"tip2"}>24小时离线率</p>
                <p className={"text2"}>53%</p>
            </div>
        );
    }
}

class GroupList extends React.Component{
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
            <div>
                <div className={"total-machine"}>
                    <h5>矿机数：12/20</h5>
                    <Icon style={{color:"#7C8B96",fontSize:"20px",position:"absolute",left:"602px"}} type="plus-circle" />
                    <Icon style={{color:"#7C8B96",fontSize:"20px",position:"absolute",left:"633px"}} type="minus-circle" />
                </div>
                <div className={"pool-list-topic"}>
                    <p className={"tip1"}>组名</p>
                    <p className={"tip2"}>矿机数</p>
                    <p className={"tip3"}>算力大小</p>
                </div>

                <div className={"group-list-single"}>
                    <p className={"text1"}>这里是组名</p>
                    <p className={"text2"}>3/4</p>
                    <p className={"text3"}>8GB</p>
                </div>
                <div className={"group-list-single"}>
                    <p className={"text1"}>这里是组名</p>
                    <p className={"text2"}>23/43</p>
                    <p className={"text3"}>82GB</p>
                </div>
            </div>
        );
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
            <div>
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
            <div>
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
        return(
            <div className={"control-panel"}>
                <div className={"status"}>
                    <DropdownList type={"status"} />
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

class MinerListDetail extends React.Component{
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
            <div>
                <div className={"machine-list-title"}>
                    <p className={"tip1"}>矿机名</p>
                    <p className={"tip2"}>开关</p>
                    <p className={"tip3"}>磁盘</p>
                    <p className={"tip4"}>加入时间</p>
                    <p className={"tip5"}>带宽</p>
                    <p className={"tip6"}>所在地</p>
                    <p className={"tip7"}>状态</p>
                </div>

                <div className={"mining-list-detail"}>
                    <p className={"text1"}>TradeCode1</p>
                    <p className={"text2"}>在线</p>
                    <p className={"text3"}>24盘-10TB/110TB</p>
                    <p className={"text4"}>2019-10-12</p>
                    <p className={"text5"}>100M</p>
                    <p className={"text6"}>北京</p>
                    <p className={"text7"}>出矿中</p>
                    <Checkbox style={{position:"absolute",top:"22px",left:"644px"}}></Checkbox>
                </div>

                <div className={"mining-list-detail"}>
                    <p className={"text1"}>TradeCode1</p>
                    <p className={"text2"}>在线</p>
                    <p className={"text3"}>24盘-10TB/110TB</p>
                    <p className={"text4"}>2019-10-12</p>
                    <p className={"text5"}>100M</p>
                    <p className={"text6"}>北京</p>
                    <p className={"text7"}>出矿中</p>
                    <Checkbox style={{position:"absolute",top:"22px",left:"644px"}}></Checkbox>
                </div>

                <div className={"mining-list-detail"}>
                    <p className={"text1"}>TradeCode1</p>
                    <p className={"text2"}>在线</p>
                    <p className={"text3"}>24盘-10TB/110TB</p>
                    <p className={"text4"}>2019-10-12</p>
                    <p className={"text5"}>100M</p>
                    <p className={"text6"}>北京</p>
                    <p className={"text7"}>出矿中</p>
                    <Checkbox style={{position:"absolute",top:"22px",left:"644px"}}></Checkbox>
                </div>

                <div className={"mining-list-detail"}>
                    <p className={"text1"}>TradeCode1</p>
                    <p className={"text2"}>在线</p>
                    <p className={"text3"}>24盘-10TB/110TB</p>
                    <p className={"text4"}>2019-10-12</p>
                    <p className={"text5"}>100M</p>
                    <p className={"text6"}>北京</p>
                    <p className={"text7"}>出矿中</p>
                    <Checkbox style={{position:"absolute",top:"22px",left:"644px"}}></Checkbox>
                </div>
            </div>
        )
    }
}

class AddDeleteMiner extends React.Component {
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
            <div>
                <div className={"add-delete-background"}></div>
                <div className={"add-delete-miner"}>
                    <h5>添加/删除矿工</h5>
                    <Icon type="close" style={{position:"absolute",top:"18px",left:"521px",fontSize:"12px"}} />
                    <div className={"add-miner-top"}>
                        <p className={"tip1"}>矿机名</p>
                        <p className={"tip2"}>日期</p>
                        <p className={"tip3"}>所在地</p>
                    </div>
                    <div className={"list-area"}>
                        <div className={"miner-list"}>
                            <p className={"text1"}>TradeCode</p>
                            <p className={"text2"}>2010-10-12</p>
                            <p className={"text3"}>北京</p>
                            <Checkbox style={{position:"absolute",top:"11px",left:"456px"}}></Checkbox>
                        </div>
                        <div className={"miner-list"}>
                            <p className={"text1"}>TradeCode</p>
                            <p className={"text2"}>2010-10-12</p>
                            <p className={"text3"}>北京</p>
                            <Checkbox style={{position:"absolute",top:"11px",left:"456px"}}></Checkbox>
                        </div>
                        <div className={"miner-list"}>
                            <p className={"text1"}>TradeCode</p>
                            <p className={"text2"}>2010-10-12</p>
                            <p className={"text3"}>北京</p>
                            <Checkbox style={{position:"absolute",top:"11px",left:"456px"}}></Checkbox>
                        </div>
                        <div className={"miner-list"}>
                            <p className={"text1"}>TradeCode</p>
                            <p className={"text2"}>2010-10-12</p>
                            <p className={"text3"}>北京</p>
                            <Checkbox style={{position:"absolute",top:"11px",left:"456px"}}></Checkbox>
                        </div>
                        <div className={"miner-list"}>
                            <p className={"text1"}>TradeCode</p>
                            <p className={"text2"}>2010-10-12</p>
                            <p className={"text3"}>北京</p>
                            <Checkbox style={{position:"absolute",top:"11px",left:"456px"}}></Checkbox>
                        </div>
                        <div className={"miner-list"}>
                            <p className={"text1"}>TradeCode</p>
                            <p className={"text2"}>2010-10-12</p>
                            <p className={"text3"}>北京</p>
                            <Checkbox style={{position:"absolute",top:"11px",left:"456px"}}></Checkbox>
                        </div>
                        <div className={"miner-list"}>
                            <p className={"text1"}>TradeCode</p>
                            <p className={"text2"}>2010-10-12</p>
                            <p className={"text3"}>北京</p>
                            <Checkbox style={{position:"absolute",top:"11px",left:"456px"}}></Checkbox>
                        </div>
                    </div>
                    <input className={"confirm"} type={"button"} value={"确定"} />
                    <h6>已选择1台</h6>
                </div>
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
            <div>
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

class DeleteGroup extends React.Component{
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
            <div>
                <div className={"delete-group-background"}></div>
                <div className={"delete-group"}>
                    <h5>删除组</h5>
                    <Icon type="close" style={{position:"absolute",top:"18px",left:"521px",fontSize:"12px"}} />
                    <div className={"add-miner-top"}>
                        <p className={"tip1"}>组名</p>
                        <p className={"tip2"}>矿机数</p>
                        <p className={"tip3"}>算力大小</p>
                    </div>
                    <div className={"list-area"}>
                        <div className={"miner-list"}>
                            <p className={"text1"}>TradeCode</p>
                            <p className={"text2"}>2010-10-12</p>
                            <p className={"text3"}>20000GB</p>
                            <Checkbox style={{position:"absolute",top:"11px",left:"456px"}}></Checkbox>
                        </div>
                        <div className={"miner-list"}>
                            <p className={"text1"}>TradeCode</p>
                            <p className={"text2"}>2010-10-12</p>
                            <p className={"text3"}>100GB</p>
                            <Checkbox style={{position:"absolute",top:"11px",left:"456px"}}></Checkbox>
                        </div>
                        <div className={"miner-list"}>
                            <p className={"text1"}>TradeCode</p>
                            <p className={"text2"}>2010-10-12</p>
                            <p className={"text3"}>20000GB</p>
                            <Checkbox style={{position:"absolute",top:"11px",left:"456px"}}></Checkbox>
                        </div>
                        <div className={"miner-list"}>
                            <p className={"text1"}>TradeCode</p>
                            <p className={"text2"}>2010-10-12</p>
                            <p className={"text3"}>20000GB</p>
                            <Checkbox style={{position:"absolute",top:"11px",left:"456px"}}></Checkbox>
                        </div>
                        <div className={"miner-list"}>
                            <p className={"text1"}>TradeCode</p>
                            <p className={"text2"}>2010-10-12</p>
                            <p className={"text3"}>20000GB</p>
                            <Checkbox style={{position:"absolute",top:"11px",left:"456px"}}></Checkbox>
                        </div>
                        <div className={"miner-list"}>
                            <p className={"text1"}>TradeCode</p>
                            <p className={"text2"}>2010-10-12</p>
                            <p className={"text3"}>20000GB</p>
                            <Checkbox style={{position:"absolute",top:"11px",left:"456px"}}></Checkbox>
                        </div>
                        <div className={"miner-list"}>
                            <p className={"text1"}>TradeCode</p>
                            <p className={"text2"}>2010-10-12</p>
                            <p className={"text3"}>20000GB</p>
                            <Checkbox style={{position:"absolute",top:"11px",left:"456px"}}></Checkbox>
                        </div>
                    </div>
                    <input className={"confirm"} type={"button"} value={"确定"} />
                    <h6>已选择1台</h6>
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

class PoolSet extends React.Component{
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
        const { TextArea } = Input;
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" >
                        一小时
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer">
                        一天
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer">
                        一星期
                    </a>
                </Menu.Item>
            </Menu>
        );
        return(
            <div>
                <div className={"delete-group-background"}></div>
                <div className={"pool-set-center"}>
                    <h5>矿场设置</h5>
                    <Icon type="close" style={{position:"absolute",top:"18px",left:"521px",fontSize:"12px"}} />
                    <div className={"list-area"}>
                        <h6 className={"title1"}>矿场名称:</h6>
                        <Input className={"input"} placeholder="请输入矿场名称" />
                        <h6 className={"title2"}>矿场公告:</h6>
                        <TextArea className={"text-area"} placeholder="请输入矿场公告" rows={4} />
                        <h6 className={"title3"}>链设置:</h6>
                        <div className={"coin1 coin-start"}>
                            <img src={FileIcon} />
                            <p className={"name"}>YTA</p>
                            <p className={"status"}>已停止</p>
                            <p className={"address"}>钱包地址</p>
                            <input type={"button"} value={"挖矿"} />
                        </div>
                        <div className={"coin2 coin-start"}>
                            <img src={LambIcon} />
                            <p className={"name"}>YTA</p>
                            <p className={"status"}>已停止</p>
                            <p className={"address"}>钱包地址</p>
                            <input type={"button"} value={"挖矿"} />
                        </div>
                        <h6 className={"title4"}>报警设置:</h6>
                        <div className={"warn warn1"}>
                            <p>坏道</p>
                            <Switch style={{position:"absolute",top:"0",left:'104px'}} size="small" defaultChecked />
                        </div>
                        <div className={"warn warn2"}>
                            <p>磁盘空间小于10G</p>
                            <Switch style={{position:"absolute",top:"0",left:'104px'}} size="small" defaultChecked />
                        </div>
                        <div className={"warn warn3"}>
                            <p>CPU温度过高</p>
                            <Switch style={{position:"absolute",top:"0",left:'104px'}} size="small" defaultChecked />
                        </div>
                        <div className={"warn warn4"}>
                            <p>硬盘温度过高</p>
                            <Switch style={{position:"absolute",top:"0",left:'104px'}} size="small" defaultChecked />
                        </div>
                        <div className={"warn warn5"}>
                            <p>频率设置</p>
                            <Dropdown overlayClassName={"warning-rate"} overlay={menu} >
                                <div>
                                    <a className="ant-dropdown-link" href="#">
                                        <button>一小时&nbsp;&nbsp;<Icon type="caret-down" /></button>
                                    </a>
                                </div>
                            </Dropdown>
                        </div>
                        <h6 className={"title5"}>解散矿场:</h6>
                        <input type={"button"} className={"dismiss"} value={"解散矿场"} />
                    </div>
                    <input className={"confirm"} type={"button"} value={"确定"} />
                </div>
            </div>
        )
    }
}