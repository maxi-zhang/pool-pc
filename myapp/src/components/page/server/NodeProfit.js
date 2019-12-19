import React from "react";
import store from "../../../store";
import Axios from "axios";
import qs from "qs";
import {ACTION, OPERATION} from "../../common/Config";
import {getTimePeriod, todayFormat} from "../../common/Common";
import {DatePicker, Icon} from "antd";
import moment from "moment";
import IncomeSearch from "./IncomeSearch";

export default class NodeProfit extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        this.info = {};
        this.advance = false;
        this.screen ={
            'from_date':'',
            'to_date':'',
            'keyword':'',
            'page':1,
            'page_size':100
        }
        this.on =0;
        this.getBalanceList();
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
    getBalanceList(){
        let _this = this
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/pool/pool/balanceList', qs.stringify(
            {
                'user_id': this.state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'token': this.state[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
                'to_user_id':this.state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'lease_id':'-1',//虚拟主机类为-1
                'mining_type':'YTA',
                'from_date':this.screen['from_date']?this.screen['from_date']:todayFormat(),
                'to_date':this.screen['to_date']?this.screen['to_date']:todayFormat(),
                'keyword':this.screen['keyword'],
                'page':this.screen['page'],
                'page_size':this.screen['page_size'],
            })
        ).then(function(data){
            if(data.data.code === 0){
                _this.info = data.data.data;
                _this.setState(_this);
            }
        })
    }
    changeTimePeriod(id,e,f){
        if(id === 1){
            this.screen['from_date'] = f;
            this.screen['to_date'] = f;
            this.on = 0;
            this.getBalanceList()
            return
        }
        if(id === 2){
            this.screen['from_date'] = getTimePeriod(f)[0];
            this.screen['to_date'] = getTimePeriod(f)[1];
            this.on = f;
        }
        if(id === 3){
            this.screen['keyword'] = f;
        }
        if(id === 4){
            this.screen['from_date'] = f;
        }
        if(id === 5){
            this.screen['to_date'] = f;
        }
        this.setState(this.state)
    }

    openAdvanceSearch(){
        this.advance = true;
        this.setState(this.state)
    }
    closeAdvanceSearch(){
        this.advance = false;
        this.screen['keyword'] = '';
        this.setState(this.state)
    }
    render() {
        const dateFormat = 'YYYY-MM-DD';
        const listItems = (this.info['data'])?(
            Object.keys(this.info['data']).map((key)=> {
                return(
                    <div key={key} className={"node-income-list-detail list"}>
                        <p className={"text1"}>{this.info['data'][key]['name']}</p>
                        <p className={"text2"}>{this.info['data'][key]['address']}</p>
                        <p className={"text3"}>{this.info['data'][key]['add_date']}</p>
                        <p className={"text4"}>{this.info['data'][key]['income']}</p>
                    </div>
                )
            })
        ):<React.Fragment></React.Fragment>
        return(
            <React.Fragment>
                <div className={"node-income-banner banner"}>
                    <h5>节点收益</h5>
                </div>
                <div className={"border"}>
                    <div className={"node-income-total"}>
                        <div className={"icon1"}></div>
                        <p className={"tip1"}>总收益：{this.info['income_sum']} YTA</p>
                        <div className={"icon2"}></div>
                        <p className={"tip2"}>选择某天的收益</p>
                        <div className={"date"}>
                            {this.screen['from_date']?
                                <DatePicker onChange={this.changeTimePeriod.bind(this,1)} defaultValue={moment(this.screen['from_date'],dateFormat)} placeholder="请选择日期"  />:
                                <DatePicker onChange={this.changeTimePeriod.bind(this,1)} defaultValue={moment(todayFormat(),dateFormat)} placeholder="请选择日期"  />
                            }
                            {this.screen['from_date'] === this.screen['to_date']?
                                <p className={"date-show"}>{this.screen['from_date']?this.screen['from_date']:todayFormat()}</p>:
                                <p className={"date-show"}>请选择日期</p>
                            }
                        </div>
                        <button onClick={this.openAdvanceSearch.bind(this)}><Icon type="search" />&nbsp;高级搜索</button>
                    </div>
                    <div className={"node-income-list-title topic"}>
                        <p className={"tip1"}>收入</p>
                        <p className={"tip2"}>地址</p>
                        <p className={"tip3"}>时间</p>
                        <p className={"tip4"}>收益</p>
                    </div>
                    {listItems}
                </div>
                {this.advance?
                    <IncomeSearch on={this.on} get={this.getBalanceList.bind(this)} keyword={this.screen['keyword']} time={this.changeTimePeriod.bind(this)} close={this.closeAdvanceSearch.bind(this)} />:<React.Fragment></React.Fragment>
                }
            </React.Fragment>
        )
    }
}