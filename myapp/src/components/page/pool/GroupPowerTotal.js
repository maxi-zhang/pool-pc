import React from "react";
import store from "../../../store";
import {ACTION, OPERATION} from "../../common/Config";
import {getDiskPower} from "../../common/Common";

export default class GroupPowerTotal extends  React.Component{
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
        // 当前的矿场ID
        const pool = this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]
        // 当前的组ID
        const pid = this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.POOL_INDEX][pool]

        let info;
        if(pid === "default"){
            info = this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.UNGROUP_INFO][pool]
        }else if(!isNaN(pid)){
            info = this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.GROUP_INFO][pid]
        }
        return (
            <React.Fragment>
                {info?
                    <div className={"group-power-total"}>
                        <div className={"tip-icon icon1"}></div>
                        <p className={"tip1"}>当前算力：{getDiskPower(info['power'])}</p>
                        <div className={"tip-icon icon2"}></div>
                        <p className={"tip2"}>24小时离线率：{info['offline_scale']}%</p>
                    </div>:<React.Fragment></React.Fragment>
                }
            </React.Fragment>
        )
    }

}