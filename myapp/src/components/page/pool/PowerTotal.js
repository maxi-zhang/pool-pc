import React from "react";
import store from "../../../store";
import {ACTION, OPERATION} from "../../common/Config";
import {getDiskPower} from "../../common/Common";

export default class PowerTotal extends React.Component{
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
        const pid = this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]
        const coin = this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.CURRENT_COIN][pid];
        const pool = this.state[OPERATION.POOL_INFO][pid]
        let key;

        for(let i in pool['mining_info']){
            if(pool['mining_info'][i]['mining_type'] === coin){
                key = i
            }
        }

        return (
            <div className={"border"}>
                <div className={"pool-power-total"}>
                    <div className={"tip-icon icon1"}></div>
                    <p className={"tip1"}>当前算力（点击查看曲线图）</p>
                    <p className={"text1"}>{getDiskPower(pool['mining_info'][key]['power'])}</p>
                    <div className={"tip-icon icon2"}></div>
                    <p className={"tip2"}>24小时离线率</p>
                    <p className={"text2"}>{pool['offline_scale']}%</p>
                </div>
            </div>
        );
    }
}