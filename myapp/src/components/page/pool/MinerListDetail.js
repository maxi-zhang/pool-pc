import React from "react";
import store from "../../../store";
import {ACTION, COIN, OPERATION} from "../../common/Config";
import {getDiskPower} from "../../common/Common";
import {Checkbox,message} from "antd";
import {selectOperationMiner} from "../../common/model/PoolModel";
import {CHANGE_STORE} from "../../../store/config";

export default class MinerListDetail extends React.Component{
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
    operationMiner(did,e){
        selectOperationMiner(did,e.target.checked)
    }
    openMinerIndex(hid,status){
        if(status === 0){
            message.info("离线矿机无法打开矿机面板")
            return;
        }

        this.state[OPERATION.PATH_INFO][ACTION.CURRENT_DEVICE] = hid;
        this.state[OPERATION.PATH_INFO][ACTION.CURRENT_OPEN] = OPERATION.DEVICE_INDEX;

        const action = {
            type:CHANGE_STORE,
            info:this.state
        }
        store.dispatch(action)
    }
    render() {
        // 当前选中的pool id
        let pid = this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3];
        // 当前选中的组ID
        let gid = this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.POOL_INDEX][pid];
        // 当前选中的币种
        let coin = this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.CURRENT_COIN][pid];
        let info;
        // 当前组所有的机器状态
        if(gid === 'default'){
            info = this.state[OPERATION.DEVICE_INFO][ACTION.UNGROUP_DEVICE][pid]
        }else{
            info = this.state[OPERATION.DEVICE_INFO][gid]
        }
        const listItems =(info && info.data)? Object.keys(info.data).map((key)=> {
            return(
                <React.Fragment key={key}>
                    {this.state[OPERATION.DEVICE_INFO][ACTION.DEVICE_SCREEN] === OPERATION.ALL_DEVICE?
                        <div key={key}  className={"mining-list-detail"} >
                            <div style={{width:"100%",height:"100%"}} onClick={this.openMinerIndex.bind(this,info.data[key]['hardware_id'],info.data[key]['is_online'])}>
                                {info['data'][key]['is_online'] === 0?
                                    <div className={"off"}></div>:
                                    <div className={"on"}></div>
                                }
                                <p className={"text1"}>{info.data[key]['name']}</p>
                                <p className={"text2"}>{info.data[key]['is_online']?<React.Fragment>在线</React.Fragment>:<React.Fragment>离线</React.Fragment>}</p>
                                <p className={"text3"}>{info.data[key]['disk_num']}盘-{getDiskPower(info.data[key]['disk_space_used'])}/{getDiskPower(info.data[key]['disk_space_used'])}</p>
                                <p className={"text4"}>{info.data[key]['bind_time'].substring(0,10)}</p>
                                <p className={"text5"}>{info.data[key]['network_speed']}M</p>
                                <p className={"text6"}>{info.data[key]['address']}</p>
                                <p className={"text7"}>
                                    {coin === COIN.FIL?
                                        <React.Fragment>
                                            {info.data[key]['fil_mining_status'] === 1?
                                                <React.Fragment>同步区块中</React.Fragment>:<React.Fragment></React.Fragment>
                                            }
                                            {info.data[key]['fil_mining_status'] === 3?
                                                <React.Fragment>同步完成</React.Fragment>:<React.Fragment></React.Fragment>
                                            }
                                            {info.data[key]['fil_mining_status'] === 5?
                                                <React.Fragment>挖矿中</React.Fragment>:<React.Fragment></React.Fragment>
                                            }
                                            {info.data[key]['fil_mining_status'] === 6?
                                                <React.Fragment>停止中</React.Fragment>:<React.Fragment></React.Fragment>
                                            }
                                            {info.data[key]['fil_mining_status'] === 0?
                                                <React.Fragment>待指定目录</React.Fragment>:<React.Fragment></React.Fragment>
                                            }
                                        </React.Fragment>:<React.Fragment></React.Fragment>
                                    }
                                    {coin === COIN.YTA?
                                        <React.Fragment>
                                            {info.data[key]['yta_mining_status'] === ""?
                                                <React.Fragment>无状态</React.Fragment>:<React.Fragment>{info.data[key]['yta_mining_status']}</React.Fragment>
                                            }
                                        </React.Fragment>:<React.Fragment></React.Fragment>
                                    }
                                </p>
                            </div>
                            {this.state[OPERATION.DEVICE_INFO][ACTION.DEVICE_SELECT].indexOf(info.data[key]['hardware_id']) === -1?
                                <Checkbox onChange ={this.operationMiner.bind(this,info.data[key]['hardware_id'])}  style={{position:"absolute",top:"22px",left:"644px"}}></Checkbox>:
                                <Checkbox defaultChecked onChange ={this.operationMiner.bind(this,info.data[key]['hardware_id'])}  style={{position:"absolute",top:"22px",left:"644px"}}></Checkbox>
                            }
                        </div>:<React.Fragment>
                            {(this.state[OPERATION.DEVICE_INFO][ACTION.DEVICE_SCREEN] === OPERATION.OFFLINE_DEVICE && info.data[key]['is_online'] === 0)||(this.state[OPERATION.DEVICE_INFO][ACTION.DEVICE_SCREEN] === OPERATION.ONLINE_DEVICE && info.data[key]['is_online'] === 1) ?
                                <div key={key}  className={"mining-list-detail"} >
                                    <div style={{width:"100%",height:"100%"}} onClick={this.openMinerIndex.bind(this,info.data[key]['hardware_id'],info.data[key]['is_online'])}>
                                        {info['data'][key]['is_online'] === 0?
                                            <div className={"off"}></div>:
                                            <div className={"on"}></div>
                                        }
                                        <p className={"text1"}>{info.data[key]['name']}</p>
                                        <p className={"text2"}>{info.data[key]['is_online']?<React.Fragment>在线</React.Fragment>:<React.Fragment>离线</React.Fragment>}</p>
                                        <p className={"text3"}>{info.data[key]['disk_num']}盘-{getDiskPower(info.data[key]['disk_space_used'])}/{getDiskPower(info.data[key]['disk_space_used'])}</p>
                                        <p className={"text4"}>{info.data[key]['bind_time'].substring(0,10)}</p>
                                        <p className={"text5"}>{info.data[key]['network_speed']}M</p>
                                        <p className={"text6"}>{info.data[key]['address']}</p>
                                        <p className={"text7"}>
                                            {coin === COIN.FIL?
                                                <React.Fragment>
                                                    {info.data[key]['fil_mining_status'] === 1?
                                                        <React.Fragment>同步区块中</React.Fragment>:<React.Fragment></React.Fragment>
                                                    }
                                                    {info.data[key]['fil_mining_status'] === 3?
                                                        <React.Fragment>同步完成</React.Fragment>:<React.Fragment></React.Fragment>
                                                    }
                                                    {info.data[key]['fil_mining_status'] === 5?
                                                        <React.Fragment>挖矿中</React.Fragment>:<React.Fragment></React.Fragment>
                                                    }
                                                    {info.data[key]['fil_mining_status'] === 6?
                                                        <React.Fragment>停止中</React.Fragment>:<React.Fragment></React.Fragment>
                                                    }
                                                    {info.data[key]['fil_mining_status'] === 0?
                                                        <React.Fragment>待指定目录</React.Fragment>:<React.Fragment></React.Fragment>
                                                    }
                                                </React.Fragment>:<React.Fragment></React.Fragment>
                                            }
                                            {coin === COIN.YTA?
                                                <React.Fragment>
                                                    {info.data[key]['yta_mining_status'] === ""?
                                                        <React.Fragment>无状态</React.Fragment>:<React.Fragment>{info.data[key]['yta_mining_status']}</React.Fragment>
                                                    }
                                                </React.Fragment>:<React.Fragment></React.Fragment>
                                            }
                                        </p>
                                    </div>
                                    {this.state[OPERATION.DEVICE_INFO][ACTION.DEVICE_SELECT].indexOf(info.data[key]['hardware_id']) === -1?
                                        <Checkbox onChange ={this.operationMiner.bind(this,info.data[key]['hardware_id'])}  style={{position:"absolute",top:"22px",left:"644px"}}></Checkbox>:
                                        <Checkbox defaultChecked onChange ={this.operationMiner.bind(this,info.data[key]['hardware_id'])}  style={{position:"absolute",top:"22px",left:"644px"}}></Checkbox>
                                    }
                                </div>:<React.Fragment></React.Fragment>
                            }
                        </React.Fragment>
                    }
                </React.Fragment>
            )
        }):<React.Fragment></React.Fragment>

        return(
            <div className={"border"}>
                <div className={"machine-list-title"}>
                    <p className={"tip1"}>矿机名</p>
                    <p className={"tip2"}>开关</p>
                    <p className={"tip3"}>磁盘</p>
                    <p className={"tip4"}>加入时间</p>
                    <p className={"tip5"}>带宽</p>
                    <p className={"tip6"}>所在地</p>
                    <p className={"tip7"}>状态</p>
                </div>
                {listItems}
            </div>
        )
    }
}