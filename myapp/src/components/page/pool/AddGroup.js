import React from "react";
import store from "../../../store";
import {addPoolGroup, addPoolGroupData, closeClearError, closeOpenArea} from "../../common/model/PoolModel";
import {Alert, Icon, Input} from "antd";
import {ACTION, OPERATION} from "../../common/Config";

export default class AddGroup extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        addPoolGroupData('');
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
    closeCreateArea(){
        closeOpenArea()
    }
    poolGroupName(e){
        addPoolGroupData(e.target.value)
    }
    addPoolGroup(){
        addPoolGroup()
    }
    closeError(){
        closeClearError()
    }
    render() {
        return(
            <React.Fragment>
                <div onClick={this.closeCreateArea.bind(this)} className={"delete-group-background"}></div>
                <div className={"add-group"}>
                    <h5>添加组</h5>
                    <Icon onClick={this.closeCreateArea.bind(this)} type="close" style={{position:"absolute",top:"18px",left:"371px",fontSize:"12px"}} />
                    <div className={"error-area"}>
                        {this.state[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] > 0?
                            <Alert onClose={this.closeError.bind(this)} message={this.state[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION]} type="error" closable />:
                            <React.Fragment></React.Fragment>
                        }
                    </div>
                    <div className={"list-area"}>
                        <div className={"input-area"}>
                            <p><span>*</span>组名称：</p>
                            <Input onChange={this.poolGroupName.bind(this)} value={this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.ADD_GROUP][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]} placeholder="请输入组名称" />
                        </div>
                    </div>
                    <div className={"underline"}></div>
                    <input onClick={this.addPoolGroup.bind(this)} className={"button"} type={"button"} value={"下一步"} />
                </div>
            </React.Fragment>
        )
    }
}