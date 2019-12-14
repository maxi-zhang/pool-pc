import React from "react";
import store from "../../../store";
import {backCommon} from "../../common/model/ServerModel";
import {ACTION, OPERATION} from "../../common/Config";
import Axios from "axios";
import qs from "qs";

export default class MyEntrustDevice extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        this.info = {};
        this.getMyEntrustDevice()
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
    backCommon(){
        backCommon(ACTION.MY_ENTRUST);
    }
    getMyEntrustDevice(){
        let _this = this
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/device/device/list', qs.stringify(
            {
                'user_id': this.state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'token': this.state[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
                'device_user_id':this.state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'trust_user_id':this.state[OPERATION.SERVER_INFO][ACTION.MY_ENTRUST],
                'group_id': -1,
                'is_trusteeship': (this.state[OPERATION.SERVER_INFO][ACTION.MY_ENTRUST])?1:5,
                'up_id': -1,
                'is_online': -1,
                'page': 1,
                'page_size': 10
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
                <div className={"my-entrust-device-list list"}>
                    {this.info['data'][key]['is_online'] === 0?
                        <div className={"off"}></div>:
                        <div className={"on"}></div>
                    }
                    <p className={"text1"}>{this.info['data'][key]['name']}</p>
                    {this.info['data'][key]['is_trusteeship'] === 1 || this.info['data'][key]['is_trusteeship'] === 5?
                        <p className={"text2"}>{this.info['data'][key]['trust_name']}</p>:
                        <p className={"text2"}>无</p>
                    }
                    <p className={"text3"}>{this.info['data'][key]['ip']}</p>
                    <p className={"text4"}>{this.info['data'][key]['bind_time'].substring(0,10)}</p>
                    <p className={"text5"}>{this.info['data'][key]['address']}</p>
                    {this.info['data'][key]['is_online'] === 0?
                        <p className={"text6"}>离线</p>:
                        <p className={"text6"}>在线</p>
                    }
                </div>
            )
        }):<React.Fragment></React.Fragment>

        return(
            <React.Fragment>
                <div className={"my-entrust-device-banner banner"}>
                    <h5>委托设备</h5>
                    <h3 onClick={this.backCommon.bind(this)} className={"back"}></h3>
                </div>
                <div className={"border"}>
                    <div className={"my-entrust-device-topic topic"}>
                        <p className={"tip1"}>设备名</p>
                        <p className={"tip2"}>委托</p>
                        <p className={"tip3"}>IP地址</p>
                        <p className={"tip4"}>绑定时间</p>
                        <p className={"tip5"}>所在地</p>
                        <p className={"tip6"}>状态</p>
                    </div>
                    {listItems}
                </div>
            </React.Fragment>
        )
    }
}