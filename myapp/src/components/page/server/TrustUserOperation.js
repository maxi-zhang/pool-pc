import React from "react";
import store from "../../../store";
import {closeClearError} from "../../common/model/PoolModel";
import {closeOpenArea,addEnTrust} from "../../common/model/ServerModel"
import {ACTION, OPERATION} from "../../common/Config";
import {Alert, Dropdown, Icon, Input, Menu} from "antd";

export default class CreatePoolStepOne extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        this.select = 0;
        this.value = '';
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


    closeError(){
        closeClearError()
    }
    closeCreateArea(){
        closeOpenArea(OPERATION.CREATE_POOL_ONE)
    }
    changeSelect(value){
        this.select = value;
        this.setState(this.state);
    }
    changeValue(e){
        this.value = e.target.value;
        this.setState(this.state);
    }
    addEnTrust(){
        addEnTrust(this.select,this.value)
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={this.changeSelect.bind(this,1)}>
                        商家
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={this.changeSelect.bind(this,2)}>
                        用户
                    </a>
                </Menu.Item>
            </Menu>
        );
        return (
            <React.Fragment>
                <div onClick={this.closeCreateArea.bind(this)} className={"add-delete-background"}></div>
                <div className={"trust-user-area"}>
                    <h5>委托管理</h5>
                    <Icon onClick={this.closeCreateArea.bind(this)} type="close" style={{position:"absolute",top:"18px",left:"521px",fontSize:"12px"}} />
                    <div className={"error-area"}>
                        {this.state[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] > 0?
                            <Alert onClose={this.closeError.bind(this)} message={this.state[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION]} type="error" closable />:
                            <React.Fragment></React.Fragment>
                        }
                    </div>

                    <p className={"tip1"}><span>*</span>委托对象:</p>
                    <Dropdown overlay={menu}>
                        <div className={"menu"}>
                            <a className="ant-dropdown-link" href="#">
                                {this.select === 0?
                                    <Input readOnly={"readonly"} className={"input2"} placeholder="请选择委托对象" />:
                                    <React.Fragment></React.Fragment>
                                }
                                {this.select === 1?
                                    <Input readOnly={"readonly"} className={"input2"} value={"商家"} placeholder="请选择委托对象" />:
                                    <React.Fragment></React.Fragment>
                                }
                                {this.select === 2?
                                    <Input readOnly={"readonly"} className={"input2"} value={"用户"} placeholder="请选择委托对象" />:
                                    <React.Fragment></React.Fragment>
                                }
                            </a>
                        </div>
                    </Dropdown>

                    {this.select === 2?
                        <React.Fragment>
                            <p className={"tip2"}>用户账号:</p>
                            <Input onChange={this.changeValue.bind(this)} value={this.value} maxLength={11} className={"input1"} placeholder="请输入用户账号"/>
                        </React.Fragment>:<React.Fragment></React.Fragment>
                    }

                    <p style={{display:"none"}} className={"tip3"}>矿场类型:</p>
                    <Input style={{display:"none"}} className={"input3"} placeholder="自建矿场" />

                    <div className={"underline"}></div>
                    <input onClick={this.addEnTrust.bind(this)} className={"button"} type={"button"} value={"委托"} />
                </div>
            </React.Fragment>
        );
    }
}