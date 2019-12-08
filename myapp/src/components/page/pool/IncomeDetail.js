import React from "react";
import store from "../../../store";
import {ACTION, OPERATION} from "../../common/Config";

export default class IncomeDetail extends React.Component{
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
        const profit = this.state[OPERATION.PROFIT_INFO][ACTION.PROFIT_DATA][pid]

        const listItems = (profit['data'])?(
            Object.keys(profit['data']).map((key)=> {
                return(
                    <div key={key} className={"income-detail-list"}>
                        <p className={"text1"}>{profit['data'][key]['name']}</p>
                        <p className={"text2"}>{profit['data'][key]['address']}</p>
                        <p className={"text3"}>{profit['data'][key]['add_date']}</p>
                        <p className={"text4"}>{profit['data'][key]['income']}</p>
                    </div>
                )
            })
        ):<React.Fragment></React.Fragment>
        return(
            <div className={"border"}>
                <div className={"income-detail-title"}>
                    <p className={"tip1"}>矿工名</p>
                    <p className={"tip2"}>地址</p>
                    <p className={"tip3"}>时间</p>
                    <p className={"tip4"}>收益</p>
                </div>
                {listItems}
            </div>
        )
    }
}