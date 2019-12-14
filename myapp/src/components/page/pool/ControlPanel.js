import React from "react";
import store from "../../../store";
import {Dropdown, Icon, Menu, message} from "antd";
import {ACTION, OPERATION} from "../../common/Config";
import {statusScreenMiner, openRemoveDiagnosis, changeIndex} from "../../common/model/PoolModel";

export default class ControlPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        message.config({
            top: '50%'
        })
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
    restartMiner(){
        if(this.state[OPERATION.DEVICE_INFO][ACTION.DEVICE_SELECT].length === 0){
            message.info('没有选择操作矿机', 2);
            return;
        }
        let did = this.state[OPERATION.DEVICE_INFO][ACTION.DEVICE_SELECT].join("|")
        let msg = '{"from":"html","act":"set_system_status","act_code":"restart_'+did+'","hardware_id":"'+did+'","device_status":"restart"}';
        console.log(msg);
        window.ws.send(msg);
    }
    shutDownMiner(){
        if(this.state[OPERATION.DEVICE_INFO][ACTION.DEVICE_SELECT].length === 0){
            message.info('没有选择操作矿机', 2);
            return;
        }
        let did = this.state[OPERATION.DEVICE_INFO][ACTION.DEVICE_SELECT].join("|")
        let msg = '{"from":"html","act":"set_system_status","act_code":"shutdown_'+did+'","hardware_id":"'+did+'","device_status":"shutdown"}';
        console.log(msg);
        window.ws.send(msg);
    }
    removeDiagnosis(){
        openRemoveDiagnosis()
    }
    statusMiner(select){
        statusScreenMiner(select)
    }
    changeIndex(module){
        changeIndex(module)
    }

    render() {
        // 当前的矿场ID
        const pool = this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]
        // 当前的组ID
        const pid = this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.POOL_INDEX][pool]

        const group = this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.DEL_GROUP][pool]

        let name = '默认分组';
        if(!isNaN(pid)){
            for(let i in group){
                if(group[i]['group_id'] === pid){
                    name = group[i]['name']
                }
            }
        }
        const menu = (
            <Menu>
                <Menu.Item>
                    <a onClick={this.statusMiner.bind(this,OPERATION.ALL_DEVICE)} rel="noopener noreferrer" href="/#/">
                        全部
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={this.statusMiner.bind(this,OPERATION.ONLINE_DEVICE)} rel="noopener noreferrer" href="/#/" className={"on"}>
                        在线
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={this.statusMiner.bind(this,OPERATION.OFFLINE_DEVICE)} rel="noopener noreferrer" href="/#/" className={"off"}>
                        离线
                    </a>
                </Menu.Item>
            </Menu>
        );
        return(
            <React.Fragment>
                <div className={"pool-group-top banner"}>
                    <h5>{name}</h5>
                    <h3 onClick={this.changeIndex.bind(this,OPERATION.POOL_OPERATION)} className={"back"}></h3>
                </div>
                <div className={"control-panel"}>
                    <div className={"status"}>
                        <Dropdown placement={"bottomCenter"} overlayClassName={"machine-status"} overlay={menu} >
                            <a className="ant-dropdown-link" href="#">
                                <div>
                                    {this.state[OPERATION.DEVICE_INFO][ACTION.DEVICE_SCREEN] === OPERATION.ALL_DEVICE?
                                        <p>全部</p>:<React.Fragment></React.Fragment>
                                    }
                                    {this.state[OPERATION.DEVICE_INFO][ACTION.DEVICE_SCREEN] === OPERATION.ONLINE_DEVICE?
                                        <p>在线</p>:<React.Fragment></React.Fragment>
                                    }
                                    {this.state[OPERATION.DEVICE_INFO][ACTION.DEVICE_SCREEN] === OPERATION.OFFLINE_DEVICE?
                                        <p>离线</p>:<React.Fragment></React.Fragment>
                                    }
                                    <Icon type="caret-down" style={{position:"absolute",top:"50%",transform: "translate(0, -50%)",left:"72%",fontSize:"12px"}} />
                                </div>
                            </a>
                        </Dropdown>
                    </div>
                    <div onClick={this.restartMiner.bind(this)}>
                        <div className={"click icon1"}></div>
                        <p className={"tip1"}>重启</p>
                    </div>
                    <div onClick={this.shutDownMiner.bind(this)}>
                        <div className={"click icon2"}></div>
                        <p className={"tip2"}>关闭</p>
                    </div>
                    <div onClick={this.removeDiagnosis.bind(this)} >
                        <div className={"click icon3"}></div>
                        <p className={"tip3"}>远程诊断</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}