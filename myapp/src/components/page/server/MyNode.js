import React from "react";
import store from "../../../store";
import Axios from "axios";
import qs from "qs";
import {ACTION, OPERATION} from "../../common/Config";

export default class MyNode extends  React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.info = {};
        let page = 1;
        let size = 100;
        this.getMyNode(page,size);
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
    getMyNode(page,size){
        let _this = this
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/pool/poolLease/List', qs.stringify(
            {
                'user_id': this.state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'token': this.state[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
                'show_user_id':this.state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'page':page,
                'page_size':size
            })
        ).then(function(data){
            console.log(data)
            if(data.data.code === 0){
                _this.info = data.data.data;
                _this.setState(_this);
            }
        })
    }
    render() {
        const listItems = (this.info.data)?Object.keys(this.info.data).map((key)=> {
            return(
                <React.Fragment key={key}>
                    {this.info.data[key]['status'] === 5?
                        <div className={"virtual-node-list list"}>
                            <p className={"text1"}>{this.info.data[key]['name']}</p>
                            <p className={"text2"}>{this.info.data[key]['mining_type']}</p>
                            <p className={"text3"}>{this.info.data[key]['income']}{this.info.data[key]['mining_type']}</p>
                            <p className={"text4"}>{this.info.data[key]['node_count']}个</p>
                            <p className={"text5"}>
                                {this.info.data[key]['remaining_date'] > 0?
                                    <React.Fragment>挖矿中，还剩{this.info.data[key]['remaining_date']}天</React.Fragment>:
                                    <React.Fragment>已到期</React.Fragment>
                                }
                            </p>
                        </div>:<React.Fragment></React.Fragment>
                    }
                </React.Fragment>
            )
        }):<React.Fragment></React.Fragment>

        return(
            <div className={"border"} >
                {this.page}
                <div className={"virtual-node-title topic"}>
                    <p className={"tip1"}>矿场名</p>
                    <p className={"tip2"}>币种</p>
                    <p className={"tip3"}>收益</p>
                    <p className={"tip4"}>节点数</p>
                    <p className={"tip5"}>状态</p>
                </div>
                {listItems}
            </div>
        )
    }
}