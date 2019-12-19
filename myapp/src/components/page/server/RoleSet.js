import React from "react";
import store from "../../../store";
import Axios from "axios";
import qs from "qs";
import {ACTION, OPERATION} from "../../common/Config";
import {Icon, Modal} from "antd";

export default class RoleSet extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        this.info = {};
        this.getRoleList()
    }
    componentDidMount(){
        this.props.onRef(this)
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
                _this.setState(_this);
            }
        })
    }
    closeCreateArea(){
        this.props.close(1)
    }
    addRole(){
        this.props.add()
    }
    delRole(rid){
        const { confirm } = Modal;
        let _this = this
        confirm({
            title: '您确定要删除角色吗?',
            content: '',
            okText: '确定',
            cancelText:'取消',
            onOk() {
                Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                Axios.post('/tenant/tenantRole/delete', qs.stringify(
                    {
                        'user_id': _this.state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                        'token': _this.state[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
                        'role_id':rid
                    })
                ).then(function(data){
                    if(data.data.code === 0){
                        _this.getRoleList()
                    }
                })
            },
            onCancel() {

            },
        });
    }
    render() {
        const listItems =(this.info)? Object.keys(this.info).map((key)=> {
            return (<React.Fragment key={key}>
                <div className={"detail"}>
                    <p className={"text1"}>{this.info[key]['name']}</p>
                    <div className={"but1 but2"}></div>
                    <div onClick={this.delRole.bind(this,this.info[key]['role_id'])} className={"but1"}></div>
                </div>
            </React.Fragment>)
        }):<React.Fragment></React.Fragment>

        return(
            <React.Fragment>
                <div onClick={this.closeCreateArea.bind(this,1)} className={"add-delete-background"}></div>
                <div className={"role-set-append"}>
                    <h5>角色设置</h5>
                    <div className={"empty-button"} onClick={this.addRole.bind(this)}>
                        添加角色
                    </div>
                    <Icon onClick={this.closeCreateArea.bind(this,1)} type="close" style={{position:"absolute",top:"18px",left:"521px",fontSize:"12px"}}/>
                    <div className={"main"}>
                        {listItems}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}