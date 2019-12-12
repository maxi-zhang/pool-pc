import React from "react";
import store from "../../../store";
import {Dropdown, Icon, Menu, message} from "antd";
import {ACTION, OPERATION} from "../../common/Config";
import {statusScreenMiner,openRemoveDiagnosis} from "../../common/model/PoolModel";

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

    render() {
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
        )
    }
}