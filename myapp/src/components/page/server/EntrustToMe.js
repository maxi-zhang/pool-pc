import React from "react";
import store from "../../../store";
import Axios from "axios";
import qs from "qs";
import {ACTION, OPERATION} from "../../common/Config";
import {chooseUserEntrust} from "../../common/model/ServerModel";
import {isEmpty} from "../../common/Common";
import SelfIcon from "../../../img/self-icon.jpg";

export default class EntrustToMe extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        this.info = {};
        this.getEntrustToMe();
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
    getEntrustToMe(){
        let _this = this
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/user/deviceUser/myTrustList', qs.stringify(
            {
                'user_id': this.state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'token': this.state[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
            })
        ).then(function(data){
            console.log(data)
            if(data.data.code === 0){
                _this.info = data.data.data;
                _this.setState(_this);
            }
        })
    }
    chooseUserEntrust(uid){
        chooseUserEntrust(uid,2);
    }
    render() {
        const listItems =(
            Object.keys(this.info).map((key)=> {
                return(
                    <div key={key} className={"my-entrust-list list"} onClick={this.chooseUserEntrust.bind(this,this.info[key]['user_id'])}>
                        {isEmpty(this.info[key]['icon'])?
                            <img src={SelfIcon} />:
                            <img src={this.info[key]['icon']} />
                        }
                        <p className={"text1"}>{this.info[key]['name']}</p>
                        <p className={"text2"}>{this.info[key]['nums_online']}/{this.info[key]['nums_all']}</p>
                    </div>
                )
            })
        )
        return(
            <React.Fragment>
                <div className={"entrust-me-banner banner"}>
                    <h5>委托给我</h5>
                </div>
                <div className={"border"}>
                    <div className={"entrust-me-title title topic"}>
                        <p className={"tip1"}>头像</p>
                        <p className={"tip2"}>用户名</p>
                        <p className={"tip3"}>设备数</p>
                    </div>
                    {listItems}
                </div>
            </React.Fragment>
        )
    }
}