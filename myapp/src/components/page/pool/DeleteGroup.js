import React from "react";
import store from "../../../store";
import {closeOpenArea, deleteGroup, delPoolGroupData, selectDeleteGroup} from "../../common/model/PoolModel";
import {ACTION, OPERATION} from "../../common/Config";
import {getDiskPower} from "../../common/Common";
import {Checkbox, Icon} from "antd";

export default class DeleteGroup extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        delPoolGroupData([])
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
    deleteGroup(){
        deleteGroup()
    }
    closeCreateArea(){
        closeOpenArea()
    }
    selectDeleteGroup(gid,e){
        selectDeleteGroup(gid,e.target.checked);
    }
    render() {
        const list = this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][OPERATION.DEL_GROUP][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]
        const count = this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.CHOOSE_DEL_GROUP].length
        const listItems =(
            Object.keys(list).map((key)=> {
                return(
                    <div key={key}  className={"miner-list"}>
                        <p className={"text1"}>{list[key]['name']}</p>
                        <p className={"text2"}>{list[key]['device_online']}/{list[key]['device_all']}</p>
                        <p className={"text3"}>{getDiskPower(list[key]['power'])}</p>
                        <Checkbox onChange={this.selectDeleteGroup.bind(this,list[key]['group_id'])} style={{position:"absolute",top:"11px",left:"456px"}}></Checkbox>
                    </div>
                )
            })
        )
        return(
            <div>
                <div onClick={this.closeCreateArea.bind(this)} className={"delete-group-background"}></div>
                <div className={"delete-group"}>
                    <h5>删除组</h5>
                    <Icon onClick={this.closeCreateArea.bind(this)} type="close" style={{position:"absolute",top:"18px",left:"521px",fontSize:"12px"}} />
                    <div className={"add-miner-top"}>
                        <p className={"tip1"}>组名</p>
                        <p className={"tip2"}>矿机数</p>
                        <p className={"tip3"}>算力大小</p>
                    </div>
                    <div className={"list-area"}>
                        {listItems}
                    </div>
                    <input onClick={this.deleteGroup.bind(this)} className={"confirm"} type={"button"} value={"确定"} />
                    <h6>已选择{count}台</h6>
                </div>
            </div>
        )
    }
}