import React from "react";
import store from "../../../store";
import Axios from "axios";
import qs from "qs";
import {ACTION, OPERATION} from "../../common/Config";
import {message, Modal} from "antd";
import SelfIcon from "../../../img/self-icon.jpg";
import DistributeRole from "./DistributeRole";
import AddRole from "./AddRole"
import RoleSet from "./RoleSet"
import AddAdmin from "./AddAdmin"

export default class StaffManage extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        this.info = {};
        this.current = 0;
        this.role = 0;
        this.set = 0;
        this.add = 0;
        this.screen = {
            'page':1,
            'page_size':100,
        }
        this.getStaffList();
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
    getStaffList(){
        let _this = this
        Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        Axios.post('/tenant/tenantAdmin/list', qs.stringify(
            {
                'user_id': this.state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                'token': this.state[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
                'page':this.screen['page'],
                'page_size':this.screen['page_size'],
            })
        ).then(function(data){
            console.log(data)
            if(data.data.code === 0){
                _this.info = data.data.data;
                _this.setState(_this);
            }
        })
    }
    distribution(uid,role){
        this.current = uid;
        this.role = role;
        this.setState(this.state)
    }
    deleteAdmin(uid){
        let _this = this
        const { confirm } = Modal;
        confirm({
            title: '您确定要删除员工吗?',
            content: '',
            okText: '确定',
            cancelText:'取消',
            onOk() {
                Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                Axios.post('/tenant/tenantAdmin/delete', qs.stringify(
                    {
                        'user_id': _this.state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID],
                        'token': _this.state[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN],
                        'tenant_user_id':uid
                    })
                ).then(function(data){
                    if(data.data.code === 0){
                        _this.getStaffList()
                    }else{
                        message.info(data.data.description)
                    }
                })
            },
            onCancel() {

            },
        });
    }
    closeCreateArea(i){
        if(i === 1){
            this.set = 0;
            this.setState(this.state)
            return
        }
        if(i === 2){
            this.set = 1;
            this.setState(this.state)
            return
        }
        if(i === 3){
            this.add = 0;
            this.setState(this.state)
            return
        }
        //关闭设置员工角色
        this.current = 0;
        this.setState(this.state)
    }
    roleSet(){
        this.set = 1;
        this.setState(this.state)
    }
    addRole(){
        this.set = 2;
        this.setState(this.state)
    }
    addAdmin(){
        this.add = 1;
        this.setState(this.state)
    }
    onRef = (ref) =>{
        this.child = ref
    }
    getNewRoleList(){
        this.child.getRoleList()
    }
    render() {
        const listItems =(this.info && this.info.data)? Object.keys(this.info.data).map((key)=> {
            return (<React.Fragment key={key}>
                <div className={"staff-manage-list list"}>
                    {this.info.data[key]['icon']?
                        <img src={this.info.data[key]['icon']} />:
                        <img src={SelfIcon} />
                    }
                    <p>{this.info.data[key]['name']}</p>
                    <p className={"text2"}>{this.info.data[key]['role_name']}</p>
                    <div onClick={this.distribution.bind(this,this.info.data[key]['user_id'],this.info.data[key]['role_id'])} className={"but1"}></div>
                    <div onClick={this.deleteAdmin.bind(this,this.info.data[key]['user_id'])} className={"but2"}></div>
                </div>

            </React.Fragment>)
        }):<React.Fragment></React.Fragment>

        return(
            <React.Fragment>
                <div className={"staff-manage-banner banner"}>
                    <h5>员工管理</h5>
                    <div onClick={this.roleSet.bind(this)} className={"but1"}>
                        <p>角色设置</p>
                    </div>
                    <div onClick={this.addAdmin.bind(this)} className={"but2"}>
                        <p>添加管理员</p>
                    </div>
                </div>
                <div className={"border"} style={{marginTop:'12px'}}>
                    {listItems}
                </div>

                {this.current >0?
                    <DistributeRole back={this.getStaffList.bind(this)} role={this.role} uid={this.current} close={this.closeCreateArea.bind(this)} />:
                    <React.Fragment></React.Fragment>
                }
                {this.set >0?
                    <RoleSet onRef={this.onRef} add={this.addRole.bind(this)} close={this.closeCreateArea.bind(this)} />:<React.Fragment></React.Fragment>
                }
                {this.set >1?
                    <AddRole success={this.getNewRoleList.bind(this)} close={this.closeCreateArea.bind(this)} />:
                    <React.Fragment></React.Fragment>
                }
                {this.add >0?
                    <AddAdmin back={this.getStaffList.bind(this)} close={this.closeCreateArea.bind(this)}/>:<React.Fragment></React.Fragment>
                }
            </React.Fragment>
        )
    }
}