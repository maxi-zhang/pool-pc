import React from "react";
import TopBanner from "./TopBanner";
import MainMenu from "./MainMenu";
import SecondaryMenu from "./SecondaryMenu";
import store from "../../../store";
import {checkUserToken} from "../Common";
import {Icon, Alert, Input, Checkbox,Menu, Dropdown} from "antd";
import FileCoinIcon from "../../../img/ico_filecoin.png"

export default class app extends React.Component {
    constructor(props){
        super(props);
        this.state = store.getState();
        checkUserToken(this.state)
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
    }
    storeChange(){
        this.state = store.getState();
        this.setState(this.state)
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    render() {
        return (
            <div>
                <TopBanner />
                <MainMenu />
                <SecondaryMenu />
                {0?
                    <div>
                        <CreatePoolStepTwo />
                        <CreatePoolStepOne />
                    </div> :<div></div>
                }
            </div>
        );
    }
}

class CreatePoolStepOne extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    storeChange(){
        this.state = store.getState();
        this.setState(this.state)
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer">
                        1st menu item
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer">
                        2nd menu item
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer">
                        3rd menu item
                    </a>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className={"create-pool-one"}>
                <h5>创建矿场</h5>
                <Icon type="close" style={{position:"absolute",top:"18px",left:"521px",fontSize:"12px"}} />
                <div className={"error-area"}>
                    <Alert message="Error Text" type="error" closable />
                </div>
                <p className={"tip1"}>矿场类型:</p>
                <p className={"tip2"}>选择矿池:</p>
                <p className={"tip3"}><span>*</span>输入矿场名称:</p>
                <Input className={"input1"} placeholder="自建矿场" />
                <Dropdown overlay={menu}>
                    <div className={"menu"}>
                        <a className="ant-dropdown-link" href="#">
                            <Input className={"input2"} placeholder="测试矿池-（FIL）" />
                        </a>
                    </div>
                </Dropdown>
                <Input className={"input3"} placeholder="委内瑞拉矿场" />
                <Checkbox style={{position:"absolute",top:"220px",left:"215px"}}></Checkbox>
                <h6>是否选择默认挖矿目录</h6>
                <div className={"underline"}></div>
                <input className={"button"} type={"button"} value={"下一步"} />
            </div>
        );
    }
}

class CreatePoolStepTwo extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    storeChange(){
        this.state = store.getState();
        this.setState(this.state)
    }
    render() {
        return(
            <div className={"create-pool-two"}>
                <h5>创建矿场</h5>
                <Icon type="close" style={{position:"absolute",top:"18px",left:"521px",fontSize:"12px"}} />
                <div className={"coin-type"}>
                    <div className={"on"}>FIL</div>
                    <div className={"off"}>YTA</div>
                </div>
                <div className={"error-area"}>
                    <Alert message="Error Text" type="error" closable />
                </div>
                <div className={"create-main"}>
                    <div className={"coin-logo"}>
                        <img src={FileCoinIcon} />
                    </div>
                    <p className={"tip1"}><span>*</span>钱包地址：</p>
                    <Input className={"input1"} placeholder="请输入钱包地址" />
                    <p className={"tip2"}><span>*</span>最高手续费：</p>
                    <Input className={"input2"} placeholder="10.00起" />
                    <p className={"tip3"}><span>*</span>最低手续费：</p>
                    <Input className={"input3"} placeholder="10.00起" />
                    <p className={"tip4"}><span>*</span>报价：</p>
                    <Input className={"input4"} placeholder="请输入" />
                    <p className={"tip5"}><span>*</span>有效区块链：</p>
                    <Input className={"input5"} placeholder="请输入" />
                    <Icon style={{position:"absolute",left:"399px",top:"67px"}} type="lock" />
                    <Icon style={{position:"absolute",left:"399px",top:"130px"}} type="unlock" />
                </div>
                <div className={"underline"}></div>
                <input className={"button"} type={"button"} value={"确定"} />


            </div>
        )
    }
}