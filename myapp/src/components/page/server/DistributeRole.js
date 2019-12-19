import React from "react";
import store from "../../../store";
import Axios from "axios";
import qs from "qs";
import {ACTION, OPERATION} from "../../common/Config";
import {Icon, Radio,message} from "antd";

export default class DistributeRole extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        this.info = {};
        this.rid = 0
        this.getRoleList()
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
        this.props.close()
    }
    getRoleList(){
        let _this = this
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/tenant/tenantRole/list', qs.stringify(
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
    onChangeRole(e){
        this.rid = e.target.value;
        this.setState(this.state)
    }
    updateStaffRole(){
        let _this = this
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/tenant/tenantAdmin/update', qs.stringify(
            {
                'user_id': this.state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'token': this.state[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
                'tenant_user_id':this.props.uid,
                'role_id':this.rid?this.rid:this.props.role
            })
        ).then(function(data){
            if(data.data.code === 0){
                _this.props.back()
                _this.getRoleList()
                message.success("操作成功")
            }
        })
    }
    render() {
        const listItems =(this.info)? Object.keys(this.info).map((key)=> {
            return (<React.Fragment key={key}>
                <div className={"detail"}>
                    <Radio style={{top:'10px'}} value={this.info[key]['role_id']}>{this.info[key]['name']}</Radio>
                </div>
            </React.Fragment>)
        }):<React.Fragment></React.Fragment>

        return(
            <React.Fragment>
                <div onClick={this.closeCreateArea.bind(this)} className={"add-delete-background"}></div>
                <div className={"select-staff-role"}>
                    <h5>分配角色</h5>
                    <Icon onClick={this.closeCreateArea.bind(this)} type="close" style={{position:"absolute",top:"18px",left:"371px",fontSize:"12px"}} />
                    <div className={"list-area"}>
                        <Radio.Group value={this.rid?this.rid:this.props.role} onChange={this.onChangeRole.bind(this)}>
                            {listItems}
                        </Radio.Group>
                    </div>
                    <input onClick={this.updateStaffRole.bind(this)} className={"confirm-button"} value={"确定"} type={"button"}/>
                </div>
            </React.Fragment>
        )
    }
}