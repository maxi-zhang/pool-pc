import React from "react";
import store from "../../../store";
import Axios from "axios";
import qs from "qs";
import {ACTION, OPERATION} from "../../common/Config";

export default class ApplyList extends  React.Component{
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
                <React.Fragment>
                    <div className={"virtual-node-list list"}>
                        <p className={"text1"}>{this.info.data[key]['name']}</p>
                        <p className={"text2"}>{this.info.data[key]['mining_type']}</p>
                        <p className={"text3"}>{this.info.data[key]['price']}CNY/个/月</p>
                        <p className={"text4"}>{this.info.data[key]['node_count']}个</p>
                        {this.info.data[key]['status'] == 1 ?
                            <React.Fragment>
                                <p style={{color:"#5786D2"}} className={"text5"}>申请租赁中（{this.info.data[key]['node_count']}）</p>
                            </React.Fragment>:
                            <React.Fragment></React.Fragment>
                        }
                        {this.info.data[key]['status'] == 3 ?
                            <React.Fragment>
                                <p style={{color:"#CC0000"}}  className={"text5"}>申请被拒绝（{this.info.data[key]['node_count']}）</p>
                            </React.Fragment>:
                            <React.Fragment></React.Fragment>
                        }
                        {this.info.data[key]['status'] == 5 ?
                            <React.Fragment>
                                <p style={{color:"#5786D2"}}  className={"text5"}>申请已通过（{this.info.data[key]['node_count']}）</p>
                            </React.Fragment>:
                            <React.Fragment></React.Fragment>
                        }
                    </div>
                </React.Fragment>
            )
        }):<React.Fragment></React.Fragment>
        return(
            <div className={"border"}>
                <div className={"virtual-node-title topic"}>
                    <p className={"tip1"}>矿场名</p>
                    <p className={"tip2"}>币种</p>
                    <p className={"tip3"}>价格</p>
                    <p className={"tip4"}>节点数</p>
                    <p className={"tip5"}>状态</p>
                </div>
                {listItems}
            </div>
        )
    }
}