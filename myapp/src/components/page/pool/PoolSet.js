import React from "react";
import store from "../../../store";
import {
    changeMiningStatus,
    changePoolInfo,
    closeOpenArea,
    getWarningInfo,
    openPopupBox, submitPoolSetModify
} from "../../common/model/PoolModel";
import {ACTION, OPERATION} from "../../common/Config";
import {Dropdown, Icon, Input, Menu, message, Switch} from "antd";
import FileIcon from "../../../img/filecoin.png";
import LambIcon from "../../../img/lambicon.png";
import {isEmpty} from "../../common/Common";

export default class PoolSet extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        getWarningInfo();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    openPopupBox(){
        openPopupBox(OPERATION.CREATE_POOL_TWO)
    }
    storeChange(){
        this.state = store.getState();
        this.setState(this.state)
    }
    closeAreaSet(){
        closeOpenArea(OPERATION.CREATE_POOL_TWO)
    }
    modifyPoolName(e){
        changePoolInfo(ACTION.POOL_NAME,e.target.value);
    }
    modifyPoolNotice(e){
        changePoolInfo(ACTION.POOL_NOTICE,e.target.value);
    }
    warningSet(value,key){
        changePoolInfo(value,key);
    }
    changeWarningRate(key,value){
        changePoolInfo(key,value);
    }
    changeMiningStatus(type,status){
        changeMiningStatus(type,status)
    }
    errorTip(error){
        message.config({
            top: '50%'
        })
        message.info(error, 2);
    }
    submitModify(){
        submitPoolSetModify()
    }
    render() {
        const { TextArea } = Input;
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={this.changeWarningRate.bind(this,ACTION.WARNING_RATE,600)}>
                        十分钟
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer"onClick={this.changeWarningRate.bind(this,ACTION.WARNING_RATE,3600)}>
                        一小时
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer"onClick={this.changeWarningRate.bind(this,ACTION.WARNING_RATE,86400)}>
                        一天
                    </a>
                </Menu.Item>
            </Menu>
        );

        return(
            <div>
                <div onClick={this.closeAreaSet.bind(this)} className={"delete-group-background"}></div>
                <div className={"pool-set-center"}>
                    <h5>矿场设置</h5>
                    <Icon onClick={this.closeAreaSet.bind(this)} type="close" style={{position:"absolute",top:"18px",left:"521px",fontSize:"12px"}} />
                    <div className={"list-area"}>
                        <h6 className={"title1"}>矿场名称:</h6>
                        <Input onChange={this.modifyPoolName.bind(this)} value={this.state[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.POOL_NAME]} className={"input"} placeholder="请输入矿场名称" />
                        <h6 className={"title2"}>矿场公告:</h6>
                        <TextArea onChange={this.modifyPoolNotice.bind(this)} value={this.state[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.POOL_NOTICE]} className={"text-area"} placeholder="请输入矿场公告" rows={4} />
                        <h6 className={"title3"}>链设置:</h6>

                        <div className={"coin1 coin-start"}>
                            <img src={FileIcon} />
                            <p className={"name"}>{this.state[OPERATION.POOL_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info'][0]['mining_type']}</p>
                            {this.state[OPERATION.POOL_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info'][0]['status'] !== 5 ?
                                <p className={"status"}>已停止</p> : <p className={"status"}>出矿中</p>
                            }
                            <p onClick={this.openPopupBox.bind(this)} className={"address"}>钱包地址</p>
                            {this.state[OPERATION.POOL_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info'][0]['is_init'] === 0 ?
                                <input onClick={this.errorTip.bind(this,"请先设置钱包地址")} style={{backgroundColor:"#CC0000"}} type={"button"} value={"挖矿"} />:
                                <React.Fragment>
                                    {this.state[OPERATION.POOL_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info'][0]['status'] !== 5 ?
                                        <input onClick={this.changeMiningStatus.bind(this,this.state[OPERATION.POOL_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info'][0]['mining_type'],5)} type={"button"} value={"挖矿"}/> :
                                        <input onClick={this.changeMiningStatus.bind(this,this.state[OPERATION.POOL_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info'][0]['mining_type'],1)} type={"button"} value={"停止"}/>
                                    }
                                </React.Fragment>
                            }
                        </div>

                        {this.state[OPERATION.POOL_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info'].length > 1?
                            <div className={"coin2 coin-start"}>
                                <img src={LambIcon} />
                                <p className={"name"}>{this.state[OPERATION.POOL_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info'][1]['mining_type']}</p>
                                {this.state[OPERATION.POOL_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info'][1]['status'] !== 5?
                                    <p className={"status"}>已停止</p>:<p className={"status"}>出矿中</p>
                                }
                                <p onClick={this.openPopupBox.bind(this)} className={"address"}>钱包地址</p>
                                {this.state[OPERATION.POOL_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info'][1]['is_init'] === 0 ?
                                    <input onClick={this.errorTip.bind(this,"请先设置钱包地址")} style={{backgroundColor:"#CC0000"}} type={"button"} value={"挖矿"} />:
                                    <React.Fragment>
                                        {this.state[OPERATION.POOL_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info'][1]['status'] !== 5 ?
                                            <input onClick={this.changeMiningStatus.bind(this,this.state[OPERATION.POOL_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info'][1]['mining_type'],5)} type={"button"} value={"挖矿"}/> :
                                            <input onClick={this.changeMiningStatus.bind(this,this.state[OPERATION.POOL_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info'][1]['mining_type'],1)} type={"button"} value={"停止"}/>
                                        }
                                    </React.Fragment>
                                }
                            </div>:
                            <React.Fragment></React.Fragment>
                        }

                        <h6 className={"title4"}>报警设置:</h6>
                        <div className={"warn warn1"}>
                            <p>坏道</p>
                            {this.state[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.WARNING_BAD_LINE]?
                                <Switch style={{position:"absolute",top:"0",left:'104px'}} size="small" defaultChecked onChange={this.warningSet.bind(this,ACTION.WARNING_BAD_LINE)}  />:
                                <Switch style={{position:"absolute",top:"0",left:'104px'}} size="small" onChange={this.warningSet.bind(this,ACTION.WARNING_BAD_LINE)}  />
                            }
                        </div>
                        <div className={"warn warn2"}>
                            <p>磁盘空间小于10G</p>
                            {this.state[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.WARNING_NO_ROOM]?
                                <Switch style={{position:"absolute",top:"0",left:'104px'}} size="small" defaultChecked onChange={this.warningSet.bind(this,ACTION.WARNING_NO_ROOM)}  />:
                                <Switch style={{position:"absolute",top:"0",left:'104px'}} size="small" onChange={this.warningSet.bind(this,ACTION.WARNING_NO_ROOM)}  />
                            }
                        </div>
                        <div className={"warn warn3"}>
                            <p>CPU温度过高</p>
                            {this.state[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.WARNING_TEMP_CPU]?
                                <Switch style={{position:"absolute",top:"0",left:'104px'}} size="small" defaultChecked onChange={this.warningSet.bind(this,ACTION.WARNING_TEMP_CPU)}  />:
                                <Switch style={{position:"absolute",top:"0",left:'104px'}} size="small" onChange={this.warningSet.bind(this,ACTION.WARNING_TEMP_CPU)}  />
                            }
                        </div>
                        <div className={"warn warn4"}>
                            <p>硬盘温度过高</p>
                            {this.state[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.WARNING_TEMP_DISK]?
                                <Switch style={{position:"absolute",top:"0",left:'104px'}} size="small" defaultChecked onChange={this.warningSet.bind(this,ACTION.WARNING_TEMP_DISK)}  />:
                                <Switch style={{position:"absolute",top:"0",left:'104px'}} size="small" onChange={this.warningSet.bind(this,ACTION.WARNING_TEMP_DISK)}  />
                            }
                        </div>
                        <div className={"warn warn5"}>
                            <p>频率设置</p>
                            <Dropdown overlayClassName={"warning-rate"} overlay={menu} >
                                <div>
                                    <a className="ant-dropdown-link" href="#">
                                        {isEmpty(this.state[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.WARNING_RATE])?
                                            <button>未设置&nbsp;&nbsp;<Icon type="caret-down" /></button>:<React.Fragment></React.Fragment>
                                        }
                                        {this.state[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.WARNING_RATE] === 600?
                                            <button>十分钟&nbsp;&nbsp;<Icon type="caret-down" /></button>:<React.Fragment></React.Fragment>
                                        }
                                        {this.state[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.WARNING_RATE] === 3600?
                                            <button>一小时&nbsp;&nbsp;<Icon type="caret-down" /></button>:<React.Fragment></React.Fragment>
                                        }
                                        {this.state[OPERATION.POOL_INFO][OPERATION.POOL_SET][ACTION.WARNING_RATE] === 86400?
                                            <button>一天&nbsp;&nbsp;<Icon type="caret-down" /></button>:<React.Fragment></React.Fragment>
                                        }
                                    </a>
                                </div>
                            </Dropdown>
                        </div>
                        <h6 className={"title5"}>解散矿场:</h6>
                        <input type={"button"} className={"dismiss"} value={"解散矿场"} />
                    </div>
                    <input onClick={this.submitModify.bind(this)} className={"confirm"} type={"button"} value={"确定"} />
                </div>
            </div>
        )
    }
}