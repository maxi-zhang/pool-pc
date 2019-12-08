import React from "react";
import store from "../../../store";
import {changeKeywordInput, getPoolProfitInfo, openPopupBox} from "../../common/model/PoolModel";
import {ACTION, OPERATION} from "../../common/Config";
import {Icon, Input} from "antd";
import {isEmpty} from "../../common/Common";

export default class IncomeTotal extends React.Component{
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
    openPopupBox(){
        openPopupBox(OPERATION.ADVANCE_SEARCH_TWO)
    }
    searchProfit(){
        getPoolProfitInfo()
    }
    changeInput(e){
        changeKeywordInput(e.target.value);
    }
    render() {
        const pid = this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]
        const profit = this.state[OPERATION.PROFIT_INFO][ACTION.PROFIT_DATA][pid]
        const coin = this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.CURRENT_COIN][pid]
        return(
            <div className={"border"}>
                <div className={"income-search-area"}>
                    <div className={"search-area"}>
                        <Input value={this.state[OPERATION.PROFIT_INFO][ACTION.PROFIT_CONDITION][ACTION.PROFIT_KEYWORD][pid]} onChange={this.changeInput.bind(this)} placeholder={"请输入关键词"} />
                        <Icon type="search" style={{position:"absolute",right:'261px',fontSize:'16px',color:'#2155AA'}} />
                    </div>
                    <div onClick={this.openPopupBox.bind(this)} className={"screen-area ad"}>高级搜索</div>
                    <div onClick={this.searchProfit.bind(this)} className={"screen-area"}>筛选</div>
                </div>
                <div className={"total-income-area"}>
                    <div className={"area-center"}>
                        <div className={"tip-icon icon1"}></div>
                        {isEmpty(profit['data'])?
                            <p className={"tip1"}>0笔收益</p>:
                            <p className={"tip1"}>{profit['data'].length}笔收益</p>
                        }
                        {isEmpty(profit['income_sum']) ?
                            <p className={"tip2"}>收入0{coin}</p> :
                            <p className={"tip2"}>收入{profit['income_sum']}{coin}</p>
                        }
                    </div>
                </div>
            </div>
        )
    }
}