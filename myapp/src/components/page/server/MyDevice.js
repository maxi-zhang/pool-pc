import React from "react";
import store from "../../../store";
import {
    cancelTrusteeship,
    getMyDevice,
    minerScreen,
    operOpenArea,
    unbindHardware
} from "../../common/model/ServerModel";
import {ACTION, OPERATION} from "../../common/Config";
import {Dropdown, Icon, Menu, Modal} from "antd";
import {CHANGE_STORE} from "../../../store/config";
import AdvanceSearch from "./AdvanceSearch";

export default class MyDevice extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        getMyDevice()
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
    minerOnlineScreen(status){
        minerScreen(status,[ACTION.IS_ONLINE]);
    }
    minerOrder(status){
        minerScreen(status,[ACTION.ORDER_CHOOSE]);
    }
    operOpenArea(){
        operOpenArea(OPERATION.ADVANCE_SEARCH_TWO)
    }
    cancelTrusteeship(hid){
        const { confirm } = Modal;
        confirm({
            title: '您确定要取消委托吗?',
            content: '',
            okText: '确定',
            cancelText:'取消',
            onOk() {
                cancelTrusteeship(hid)
            },
            onCancel() {

            },
        });
    }
    unbindHardware(hid){
        const { confirm } = Modal;
        confirm({
            title: '您确定要取消绑定吗?',
            content: '',
            okText: '确定',
            cancelText:'取消',
            onOk() {
                unbindHardware(hid)
            },
            onCancel() {

            },
        });
    }
    addTrust(hid){
        this.state[OPERATION.SERVER_INFO][ACTION.CURRENT_DEVICE] = hid;
        const action = {
            type:CHANGE_STORE,
            info:this.state,
        }
        store.dispatch(action)

        operOpenArea(OPERATION.TRUST_ADD)
    }
    render() {
        const screen = this.state[OPERATION.SERVER_INFO][ACTION.DEVICE_SCREEN];
        const info = this.state[OPERATION.SERVER_INFO][ACTION.MY_DEVICE];

        const listItems =(info && info.data)? Object.keys(info.data).map((key)=> {
            return (<React.Fragment key={key}>
                {screen['is_online'] === "all"?
                    <div className={"my-device-list-detail"}>
                        {info['data'][key]['is_online'] === 0?
                            <div className={"off"}></div>:
                            <div className={"on"}></div>
                        }
                        <p className={"text1"}>{info['data'][key]['name']}</p>
                        {info['data'][key]['is_trusteeship'] === 1 || info['data'][key]['is_trusteeship'] === 5?
                            <p className={"text2"}>{info['data'][key]['trust_name']}</p>:
                            <p className={"text2"}>无</p>
                        }
                        <p className={"text3"}>{info['data'][key]['ip']}</p>
                        <p className={"text4"}>{info['data'][key]['bind_time'].substring(0,10)}</p>
                        <p className={"text5"}>{info['data'][key]['address']}</p>
                        {info['data'][key]['is_online'] === 0?
                            <p className={"text6"}>离线</p>:
                            <p className={"text6"}>在线</p>
                        }
                        <Dropdown overlay={
                            <Menu>
                                <Menu.Item>
                                    {info['data'][key]['is_trusteeship'] === 1 || info['data'][key]['is_trusteeship'] === 5?
                                        <a onClick={this.cancelTrusteeship.bind(this,info['data'][key]['hardware_id'])} target="_blank" rel="noopener noreferrer" >
                                            取消委托
                                        </a>:
                                        <a target="_blank" rel="noopener noreferrer" onClick={this.addTrust.bind(this,info['data'][key]['hardware_id'])} >
                                            委托管理
                                        </a>
                                    }
                                </Menu.Item>
                                <Menu.Item>
                                    <a onClick={this.unbindHardware.bind(this,info['data'][key]['hardware_id'])} target="_blank" rel="noopener noreferrer" >
                                        解绑设备
                                    </a>
                                </Menu.Item>
                            </Menu>
                        } placement={"bottomRight"}>
                            <div className={"area"}>
                                <a className="ant-dropdown-link" href="#" >
                                    <input value={"操作"} type={"button"}/>
                                </a>
                            </div>
                        </Dropdown>
                    </div>:<React.Fragment>
                        {(screen['is_online'] === "on" && info.data[key]['is_online'] === 1)||(screen['is_online'] === "off" && info.data[key]['is_online'] === 0)?
                            <div className={"my-device-list-detail"}>
                                {info['data'][key]['is_online'] === 0?
                                    <div className={"off"}></div>:
                                    <div className={"on"}></div>
                                }
                                <p className={"text1"}>{info['data'][key]['name']}</p>
                                {info['data'][key]['is_trusteeship'] === 1 || info['data'][key]['is_trusteeship'] === 5?
                                    <p className={"text2"}>{info['data'][key]['trust_name']}</p>:
                                    <p className={"text2"}>无</p>
                                }
                                <p className={"text3"}>{info['data'][key]['ip']}</p>
                                <p className={"text4"}>{info['data'][key]['bind_time'].substring(0,10)}</p>
                                <p className={"text5"}>{info['data'][key]['address']}</p>
                                {info['data'][key]['is_online'] === 0?
                                    <p className={"text6"}>离线</p>:
                                    <p className={"text6"}>在线</p>
                                }
                                <Dropdown overlay={
                                    <Menu>
                                        <Menu.Item>
                                            {info['data'][key]['is_trusteeship'] === 1 || info['data'][key]['is_trusteeship'] === 5?
                                                <a onClick={this.cancelTrusteeship.bind(this,info['data'][key]['hardware_id'])} target="_blank" rel="noopener noreferrer" >
                                                    取消委托
                                                </a>:
                                                <a target="_blank" rel="noopener noreferrer" onClick={this.addTrust.bind(this,info['data'][key]['hardware_id'])}>
                                                    委托管理
                                                </a>
                                            }
                                        </Menu.Item>
                                        <Menu.Item>
                                            <a onClick={this.unbindHardware.bind(this,info['data'][key]['hardware_id'])} target="_blank" rel="noopener noreferrer" >
                                                解绑设备
                                            </a>
                                        </Menu.Item>
                                    </Menu>
                                } placement={"bottomRight"}>
                                    <div className={"area"}>
                                        <a className="ant-dropdown-link" href="#" >
                                            <input value={"操作"} type={"button"}/>
                                        </a>
                                    </div>
                                </Dropdown>
                            </div>:<React.Fragment></React.Fragment>
                        }
                    </React.Fragment>
                }
            </React.Fragment>)
        }):<React.Fragment></React.Fragment>;

        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={this.minerOnlineScreen.bind(this,'all')}>
                        全部（{info['total']}）
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a style={{color:"#00B362"}} target="_blank" rel="noopener noreferrer" onClick={this.minerOnlineScreen.bind(this,'on')}>
                        在线（{info['online_num']}）
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a style={{color:"#CC0000"}}  target="_blank" rel="noopener noreferrer" onClick={this.minerOnlineScreen.bind(this,'off')}>
                        离线（{info['offline_num']}）
                    </a>
                </Menu.Item>
            </Menu>
        );
        const menu1 = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={this.minerOrder.bind(this,'default')}>
                        默认
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={this.minerOrder.bind(this,'name')}>
                        矿机名
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={this.minerOrder.bind(this,'status')}>
                        挖矿状态
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={this.minerOrder.bind(this,'address')}>
                        所在地
                    </a>
                </Menu.Item>
            </Menu>
        )
        return(
            <React.Fragment>
                <div className={"my-device-banner banner"}>
                    <h5>我的设备</h5>
                    <Dropdown overlay={menu}>
                        <div className={"but1"}>
                            <a className="ant-dropdown-link" href="#">
                                {screen[ACTION.IS_ONLINE] === 'all' ?
                                    <p>全部</p>:<React.Fragment></React.Fragment>
                                }
                                {screen[ACTION.IS_ONLINE] === 'on' ?
                                    <p>在线</p>:<React.Fragment></React.Fragment>
                                }
                                {screen[ACTION.IS_ONLINE] === 'off' ?
                                    <p>离线</p>:<React.Fragment></React.Fragment>
                                }
                                <Icon style={{position:"absolute",top:"7px",left:"65px",color:"#5786D2"}} type="caret-down" />
                            </a>
                        </div>
                    </Dropdown>
                    <Dropdown overlay={menu1}>
                        <div className={"but2"}>
                            <a className="ant-dropdown-link" href="#">
                                {screen[ACTION.ORDER_CHOOSE] === 'default' || screen[ACTION.ORDER_CHOOSE] === '' ?
                                    <React.Fragment>
                                        <p>默认</p>
                                        <Icon style={{position:"absolute",top:"7px",left:"65px",color:"#5786D2"}} type="caret-down" />
                                    </React.Fragment>:<React.Fragment></React.Fragment>
                                }
                                {screen[ACTION.ORDER_CHOOSE] === 'name' ?
                                    <React.Fragment>
                                        <p style={{left:"25px"}}>矿机名</p>
                                        <Icon style={{position:"absolute",top:"7px",left:"65px",color:"#5786D2"}} type="caret-down" />
                                    </React.Fragment> :<React.Fragment></React.Fragment>
                                }
                                {screen[ACTION.ORDER_CHOOSE] === 'status' ?
                                    <React.Fragment>
                                        <p style={{left:"20px"}}>挖矿状态</p>
                                        <Icon style={{position:"absolute",top:"7px",left:"70px",color:"#5786D2"}} type="caret-down" />
                                    </React.Fragment> :<React.Fragment></React.Fragment>
                                }
                                {screen[ACTION.ORDER_CHOOSE] === 'address' ?
                                    <React.Fragment>
                                        <p style={{left:"25px"}}>所在地</p>
                                        <Icon style={{position:"absolute",top:"7px",left:"65px",color:"#5786D2"}} type="caret-down" />
                                    </React.Fragment>:<React.Fragment></React.Fragment>
                                }
                            </a>
                        </div>
                    </Dropdown>
                    <div className={"but3"} onClick={this.operOpenArea.bind(this)}>
                        <p>高级搜索</p>
                    </div>
                </div>
                <div className={"border"}>
                    <div className={"my-device-list-topic topic"}>
                        <p className={"tip1"}>设备名</p>
                        <p className={"tip2"}>委托</p>
                        <p className={"tip3"}>IP地址</p>
                        <p className={"tip4"}>绑定时间</p>
                        <p className={"tip5"}>所在地</p>
                        <p className={"tip6"}>状态</p>
                    </div>
                    {listItems}
                </div>
                {screen[ACTION.CURRENT_OPEN] === OPERATION.ADVANCE_SEARCH_TWO?
                    <AdvanceSearch/>:<React.Fragment></React.Fragment>
                }
            </React.Fragment>
        )
    }
}