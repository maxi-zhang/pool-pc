import React from "react";
import store from "../../../store";
import {
    changeIfDefaultRoot, changeRentPrice,
    changeRentStatus,
    checkCreatePoolOne, closeClearError, closeOpenArea,
    getPoolCoin, modifyPoolName,
    poolCoinChoose
} from "../../common/model/PoolModel";
import {ACTION, OPERATION} from "../../common/Config";
import {Alert, Checkbox, Dropdown, Icon, Input, Menu} from "antd";

export default class CreatePoolStepOne extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        getPoolCoin();
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
    createPoolStepTwo() {
        checkCreatePoolOne()
    }
    changePoolCoin(id,name,type){
        poolCoinChoose(id,name,type)
    }
    //修改是否默认目录状态
    modifyDefaultRoot(status){
        changeIfDefaultRoot(status)
    }
    // 修改是否是分租矿场
    modifyRentPool(status){
        changeRentStatus(status)
    }
    // 修改矿场节点租金
    modifyRentPrice(e){
        changeRentPrice(e.target.value)
    }
    //修改矿场名
    modifyPoolName(e){
        modifyPoolName(e.target.value)
    }

    closeError(){
        closeClearError()
    }
    closeCreateArea(){
        closeOpenArea(OPERATION.CREATE_POOL_ONE)
    }

    render() {
        let ifYTA = 0
        if(this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE] === 'YTA'){
            ifYTA = 1;
        }
        const listItems =(
            Object.keys(this.state[OPERATION.POOL_INFO][ACTION.POOL_COIN]).map((key)=> {
                return(
                    <Menu.Item key={this.state[OPERATION.POOL_INFO][ACTION.POOL_COIN][key]['id']} >
                        <a target="_blank" rel="noopener noreferrer" onClick={this.changePoolCoin.bind(this,this.state[OPERATION.POOL_INFO][ACTION.POOL_COIN][key]['id'],this.state[OPERATION.POOL_INFO][ACTION.POOL_COIN][key]['name'],this.state[OPERATION.POOL_INFO][ACTION.POOL_COIN][key]['type'])}>
                            {this.state[OPERATION.POOL_INFO][ACTION.POOL_COIN][key]['name']}({this.state[OPERATION.POOL_INFO][ACTION.POOL_COIN][key]['type']})
                        </a>
                    </Menu.Item>
                )
            })
        )
        const menu = (
            <Menu>
                {listItems}
            </Menu>
        )
        return (
            <React.Fragment>
                <div onClick={this.closeCreateArea.bind(this)} className={"add-delete-background"}></div>
                <div className={"create-pool-one"}>
                    <h5>创建矿场</h5>
                    <Icon onClick={this.closeCreateArea.bind(this)} type="close" style={{position:"absolute",top:"18px",left:"521px",fontSize:"12px"}} />
                    <div className={"error-area"}>
                        {this.state[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] > 0?
                            <Alert onClose={this.closeError.bind(this)} message={this.state[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION]} type="error" closable />:
                            <React.Fragment></React.Fragment>
                        }
                    </div>

                    <p className={"tip2"}>选择矿池:</p>
                    <Input className={"input1"} onChange={this.modifyPoolName.bind(this)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.POOL_NAME]} placeholder="请输入矿场名称"/>

                    <p className={"tip1"}><span>*</span>输入矿场名称:</p>
                    <Dropdown overlay={menu}>
                        <div className={"menu"}>
                            <a className="ant-dropdown-link" href="#">
                                {this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_ID] > 0 ?
                                    <Input readOnly={"readonly"} className={"input2"} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_NAME]} />:
                                    <Input readOnly={"readonly"} className={"input2"} placeholder="请选择矿池" />
                                }
                            </a>
                        </div>
                    </Dropdown>

                    {ifYTA && this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.IF_IS_RENT]?
                        <React.Fragment>
                            <p className={"tip3"}>节点租金:</p>
                            <Input className={"input3"} onChange={this.modifyRentPrice.bind(this)}
                                   value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.RENT_PRICE]}
                                   placeholder="每节点每月租金"/>
                        </React.Fragment> :
                        <React.Fragment></React.Fragment>
                    }

                    <p style={{display:"none"}} className={"tip3"}>矿场类型:</p>
                    <Input style={{display:"none"}} className={"input3"} placeholder="自建矿场" />

                    <h6>是否选择默认挖矿目录</h6>
                    {this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.IF_IS_DEFAULT] === 1?
                        <Checkbox onClick={this.modifyDefaultRoot.bind(this,0)} checked={true} style={{position:"absolute",top:"220px",left:"215px"}}></Checkbox>:
                        <Checkbox onClick={this.modifyDefaultRoot.bind(this,1)} checked={false} style={{position:"absolute",top:"220px",left:"215px"}}></Checkbox>
                    }
                    {ifYTA?
                        <React.Fragment>
                            <h6 className={"rent"}>分租矿场</h6>
                            {this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.IF_IS_RENT] === 1 ?
                                <Checkbox onClick={this.modifyRentPool.bind(this,0)} checked={true}
                                          style={{position: "absolute", top: "220px", left: "365px"}}></Checkbox> :
                                <Checkbox onClick={this.modifyRentPool.bind(this,1)} checked={false}
                                          style={{position: "absolute", top: "220px", left: "365px"}}></Checkbox>
                            }
                        </React.Fragment>:
                        <React.Fragment></React.Fragment>
                    }

                    <div className={"underline"}></div>
                    <input onClick={this.createPoolStepTwo.bind(this)} className={"button"} type={"button"} value={"下一步"} />
                </div>
            </React.Fragment>
        );
    }
}