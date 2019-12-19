import React from "react";
import store from "../../../store";
import Axios from "axios";
import qs from "qs";
import {ACTION, OPERATION} from "../../common/Config";
import {Alert, Dropdown, Icon, Input, message,Menu} from "antd";
import {checkPhoneNumber} from "../../common/Common";

export default class AddRole extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        this.account =''
        this.code = 0;
        this.description = '';
        this.info = {};
        this.rid = 0;
        this.name = '';

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
        this.props.close(3)
    }
    closeError(){
        this.code = 0;
        this.setState(this.state)
    }
    userAccount(e){
        this.account = e.target.value
        this.setState(this.state)
    }
    chooseRole(name,id){
        this.name = name;
        this.rid = id;
        this.setState(this.state)
    }
    addAdminSubmit(){
        this.code = 0;
        this.setState(this.state)

        if(this.rid === 0){
            this.code = 100000;
            this.description = '请选择一个角色';
        }
        if(!checkPhoneNumber(this.account)){
            this.code = 100000;
            this.description = "手机号格式检测错误";
        }
        if(this.code > 0){
            this.setState(this.state)
            return
        }
        let _this = this
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/tenant/tenantAdmin/add', qs.stringify(
            {
                'user_id': this.state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'token': this.state[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
                'role_id':this.rid,
                'account':this.account,
            })
        ).then(function(data){
            if(data.data.code === 0){
                _this.props.back()
                message.success("添加成功")
            }else{
                _this.code = data.data.code
                _this.description = data.data.description
                _this.setState(_this.state)
            }
        })
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
            if(data.data.code === 0){
                _this.info = data.data.data;
                _this.setState(_this.state);
            }
        })
    }

    render() {

        const listItems =(this.info)?(
            Object.keys(this.info).map((key)=> {
                return(
                    <Menu.Item key={key}>
                        <a target="_blank" rel="noopener noreferrer" onClick={this.chooseRole.bind(this,this.info[key]['name'],this.info[key]['role_id'])}>
                            {this.info[key]['name']}
                        </a>
                    </Menu.Item>
                )
            })
        ):<React.Fragment></React.Fragment>
        const menu = (
            <Menu>
                {listItems}
            </Menu>
        );
        return(
            <React.Fragment>
                <div style={{zIndex:11}} onClick={this.closeCreateArea.bind(this)} className={"add-delete-background"}></div>
                <div className={"add-admin-append"}>
                    <h5>添加角色</h5>
                    <Icon onClick={this.closeCreateArea.bind(this)} type="close" style={{position:"absolute",top:"18px",left:"371px",fontSize:"12px"}}/>
                    <div className={"error-area"}>
                        {this.code > 0?
                            <Alert onClose={this.closeError.bind(this)} message={this.description} type="error" closable />:
                            <React.Fragment></React.Fragment>
                        }
                    </div>
                    <p className={"tip1"}>手机号：</p>
                    <Input maxLength={11} value={this.account} onChange={this.userAccount.bind(this)} placeholder={"请输入"} className={"name"} />
                    <p className={"tip2"}>角色：</p>
                    <Dropdown overlay={menu}>
                        <div className={"role"} >
                            <a className="ant-dropdown-link" href="#">
                                <Input readOnly={"readonly"} value={this.name} placeholder={"请输入"} />
                            </a>
                        </div>
                    </Dropdown>
                    <input onClick={this.addAdminSubmit.bind(this)} type={"button"} className={"confirm-button"} value={"确定"} />
                </div>
            </React.Fragment>
        )
    }
}