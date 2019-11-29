import React from 'react';
import store from "../../../store";
import UserIconImg from '../../../img/self-icon.jpg'
import { Menu, Dropdown, Icon } from 'antd';
import 'antd/dist/antd.css';
import '../../../css/modifyAntd.less';

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
    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a rel="noopener noreferrer" href="/#/">
                        用户模式
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a rel="noopener noreferrer" href="/#/">
                        管理员模式
                    </a>
                </Menu.Item>
            </Menu>
        );
        return (
            <div id={"top-banner"}>
                <div className={"common-oper"}></div>
                <div className={"user-info"}>
                    <img src={UserIconImg} />
                    <h5>George</h5>
                    <h6>
                        <Dropdown overlayClassName={"top-banner"}  overlay={menu} overlayStyle={{color:'red'}}  >
                            <a className="ant-dropdown-link" href="#">
                                用户模式 <Icon type="caret-down" />
                            </a>
                        </Dropdown>
                    </h6>
                    <h4>先河矿池</h4>
                </div>
            </div>
        )
    }
}