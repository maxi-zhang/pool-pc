import React from "react";
import store from "../../../store";
import Axios from "axios";
import qs from "qs";
import {ACTION, OPERATION} from "../../common/Config";
import {Icon, Input, message} from "antd";

export default class AddRole extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        this.name =''
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
    closeCreateArea(){
        this.props.close(2)
    }
    roleName(e){
        this.name = e.target.value
        this.setState(this.state)
    }
    addNewRole(){
        let _this = this
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/tenant/tenantRole/add', qs.stringify(
            {
                'user_id': this.state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'token': this.state[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
                'name':this.name
            })
        ).then(function(data){
            if(data.data.code === 0){
                message.success("添加成功")
                _this.props.success()
            }
        })
    }
    render() {
        return(
            <React.Fragment>
                <div style={{zIndex:11}} onClick={this.closeCreateArea.bind(this)} className={"add-delete-background"}></div>
                <div className={"add-role-append"}>
                    <h5>添加角色</h5>
                    <Icon onClick={this.closeCreateArea.bind(this)} type="close" style={{position:"absolute",top:"18px",left:"371px",fontSize:"12px"}}/>
                    <Input value={this.name} onChange={this.roleName.bind(this)} placeholder={"请输入"} className={"name"} />
                    <p className={"tip1"}>角色名称：</p>
                    <input onClick={this.addNewRole.bind(this)} type={"button"} className={"confirm-button"} value={"确定"} />
                </div>
            </React.Fragment>
        )
    }
}