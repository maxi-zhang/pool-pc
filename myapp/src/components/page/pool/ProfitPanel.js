import React from "react";
import store from "../../../store";
import {changePickTime, getPoolProfitInfo, openPopupBox} from "../../common/model/PoolModel";
import {ACTION, OPERATION} from "../../common/Config";
import {isEmpty, todayFormat} from "../../common/Common";
import {DatePicker, Icon} from "antd";
import moment from "moment";

export default class ProfitPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        getPoolProfitInfo()
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
    changePickTime(date, dateString){
        changePickTime('all',true,dateString)
    }
    openPopupBox(){
        openPopupBox(OPERATION.ADVANCE_SEARCH_ONE)
    }
    render() {
        const pid = this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]
        const coin = this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.CURRENT_COIN][pid]
        const profit = this.state[OPERATION.PROFIT_INFO][ACTION.PROFIT_DATA][pid]
        const dateFormat = 'YYYY-MM-DD';
        return(
            <div className={"border"}>
                <div className={"profit-screen-panel"}>
                    <div className={"icon1"}></div>
                    <p className={"tip1"}>总收益：{profit['income_sum']?profit['income_sum']:0} {coin}</p>
                    <div className={"icon2"}></div>
                    <p className={"tip2"}>选择某天的收益</p>
                    <div className={"date"}>
                        {isEmpty(this.state[OPERATION.PROFIT_INFO][ACTION.PROFIT_CONDITION][ACTION.PROFIT_FROM_DATA][pid])?
                            <DatePicker onChange={this.changePickTime.bind(this)} defaultValue={moment(todayFormat(),dateFormat)} placeholder="请选择日期"  />:
                            <DatePicker onChange={this.changePickTime.bind(this)} defaultValue={moment(this.state[OPERATION.PROFIT_INFO][ACTION.PROFIT_CONDITION][ACTION.PROFIT_FROM_DATA][pid],dateFormat)} placeholder="请选择日期"  />
                        }
                        {isEmpty(this.state[OPERATION.PROFIT_INFO][ACTION.PROFIT_CONDITION][ACTION.PROFIT_FROM_DATA][pid]) ?
                            <p className={"date-show"}>{todayFormat()}</p> :
                            <p className={"date-show"}>{this.state[OPERATION.PROFIT_INFO][ACTION.PROFIT_CONDITION][ACTION.PROFIT_FROM_DATA][pid]}</p>
                        }
                    </div>
                    <button onClick={this.openPopupBox.bind(this)}><Icon type="search" />&nbsp;&nbsp;查收益</button>
                </div>
            </div>
        )
    }
}