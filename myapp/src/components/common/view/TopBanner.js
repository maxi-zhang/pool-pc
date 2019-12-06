import React from 'react';
import store from "../../../store";
import UserIconImg from '../../../img/self-icon.jpg'
import { Menu, Dropdown, Icon } from 'antd';
import 'antd/dist/antd.css';
import '../../../css/modifyAntd.less';
import {ACTION, OPERATION} from "../Config";
import {changeAdminStatus} from "../model/UserModel";

export default class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
    }
    storeChange(){
        this.state = store.getState();
        this.setState(this.state)
    }
    componentWillUnmount(){
        this.setState = (state, callback) => {
            return;
        }
    }
    changeUserModel(model){
        changeAdminStatus(model)
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a onClick={this.changeUserModel.bind(this,1)} rel="noopener noreferrer" href="/#/">
                        用户模式
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={this.changeUserModel.bind(this,5)} rel="noopener noreferrer" href="/#/">
                        管理员模式
                    </a>
                </Menu.Item>
            </Menu>
        );
        let icon = this.state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ICON]?this.state[OPERATION.USER_INFO][ACTION.ADMIN_USER_ICON]:UserIconImg;
        return (
            <div id={"top-banner"}>
                <div className={"common-oper"}></div>
                <div className={"user-info"}>
                    <img src={icon} />
                    <h5>{this.state[OPERATION.USER_INFO][ACTION.ADMIN_USER_NAME]}</h5>
                    <h6>
                        {this.state[OPERATION.USER_INFO][ACTION.CAN_CHANGE_TYPE] === 1?
                            <Dropdown overlayClassName={"top-banner"}  overlay={menu} overlayStyle={{color:'red'}}  >
                                <a className="ant-dropdown-link" href="#">
                                    {this.state[OPERATION.USER_INFO][ACTION.ADMIN_TYPE] === 5?
                                        <React.Fragment>管理员模式 <Icon type="caret-down" /></React.Fragment>:
                                        <React.Fragment>用户模式 <Icon type="caret-down" /></React.Fragment>
                                    }
                                </a>
                            </Dropdown>:
                            <React.Fragment></React.Fragment>
                        }
                    </h6>
                    <h4>先河矿池</h4>
                </div>
            </div>
        )
    }
}