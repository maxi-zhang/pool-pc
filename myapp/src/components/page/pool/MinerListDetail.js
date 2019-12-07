import React from "react";
import store from "../../../store";
import {ACTION, COIN, OPERATION} from "../../common/Config";
import {getDiskPower} from "../../common/Common";
import {Checkbox} from "antd";

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
        console.log(did)
        console.log(e.target.checked)
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
                <div key={key}  className={"mining-list-detail"}>
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
                    <Checkbox onChange ={this.operationMiner.bind(this,info.data[key]['hardware_id'])}  style={{position:"absolute",top:"22px",left:"644px"}}></Checkbox>
                </div>
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