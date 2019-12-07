import React from "react";
import store from "../../../store";
import {addChooseMiner, closeOpenArea, delGroupMiner, getGroupCanDelMiner} from "../../common/model/PoolModel";
import {ACTION, OPERATION} from "../../common/Config";
import {Checkbox, Icon} from "antd";

export default class DeleteMiner extends React.Component {
    constructor(props){
        super(props);
        this.state = store.getState();
        getGroupCanDelMiner();
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
    selectMiner(hid,e){
        addChooseMiner(e.target.checked,hid,OPERATION.DELETE_MINER)
    }
    delGroupMiner(){
        delGroupMiner()
    }
    closeCreateArea(){
        closeOpenArea()
    }
    render() {
        const pool = this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]
        //当前的GROUP ID
        const gid = this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.POOL_INDEX][pool]
        //can add模块
        const canDel = this.state[OPERATION.POOL_INFO][OPERATION.DELETE_MINER][ACTION.GROUP_CAN_DELETE_MINER]

        const listItems =(
            Object.keys(canDel[gid]).map((key)=> {
                return(
                    <div key={key}  className={"miner-list"}>
                        <p className={"text1"}>{canDel[gid][key]['name']}</p>
                        <p className={"text2"}>{canDel[gid][key]['bind_time']}</p>
                        <p className={"text3"}>{canDel[gid][key]['address']}</p>
                        <Checkbox onChange={this.selectMiner.bind(this,canDel[gid][key]['hardware_id'])} style={{position:"absolute",top:"11px",left:"456px"}}></Checkbox>
                    </div>
                )
            })
        )
        return(
            <div>
                <div onClick={this.closeCreateArea.bind(this)} className={"add-delete-background"}></div>
                <div className={"add-delete-miner"}>
                    <h5>删除矿工</h5>
                    <Icon onClick={this.closeCreateArea.bind(this)} type="close" style={{position:"absolute",top:"18px",left:"521px",fontSize:"12px"}} />
                    <div className={"add-miner-top"}>
                        <p className={"tip1"}>矿机名</p>
                        <p className={"tip2"}>日期</p>
                        <p className={"tip3"}>所在地</p>
                    </div>
                    <div className={"list-area"}>
                        {listItems}
                    </div>
                    <input onClick={this.delGroupMiner.bind(this)} className={"confirm"} type={"button"} value={"确定"} />
                    <h6>已选择{this.state[OPERATION.POOL_INFO][OPERATION.DELETE_MINER][ACTION.CHOOSE_CAN_DEL].length}台</h6>
                </div>
            </div>
        )
    }

}