import React from "react";
import store from "../../../store";
import {addChooseMiner, addGroupPoolMiner, closeOpenArea, getGroupCanAddMiner} from "../../common/model/PoolModel";
import {ACTION, OPERATION} from "../../common/Config";
import {Checkbox, Icon} from "antd";

export default class AddMiner extends React.Component {
    constructor(props){
        super(props);
        this.state = store.getState();
        getGroupCanAddMiner();
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
    selectMiner(hid,e){
        addChooseMiner(e.target.checked,hid,OPERATION.ADD_MINER)
    }
    addGroupPoolMiner(){
        addGroupPoolMiner()
    }
    render() {
        //当前的矿场ID
        const pool = this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]
        //当前的GROUP ID
        const gid = this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.POOL_INDEX][pool]
        //can add模块
        const canAdd = this.state[OPERATION.POOL_INFO][OPERATION.ADD_MINER][ACTION.GROUP_CAN_ADD_MINER]
        const listItems =(
            Object.keys(canAdd[gid]).map((key)=> {
                return(
                    <div key={key}  className={"miner-list"}>
                        <p className={"text1"}>{canAdd[gid][key]['name']}</p>
                        <p className={"text2"}>{canAdd[gid][key]['bind_time']}</p>
                        <p className={"text3"}>{canAdd[gid][key]['address']}</p>
                        <Checkbox onChange={this.selectMiner.bind(this,canAdd[gid][key]['hardware_id'])} style={{position:"absolute",top:"11px",left:"456px"}}></Checkbox>
                    </div>
                )
            })
        )
        return(
            <div>
                <div onClick={this.closeCreateArea.bind(this)} className={"add-delete-background"}></div>
                <div className={"add-delete-miner"}>
                    <h5>添加组矿工</h5>
                    <Icon onClick={this.closeCreateArea.bind(this)} type="close" style={{position:"absolute",top:"18px",left:"521px",fontSize:"12px"}} />
                    <div className={"add-miner-top"}>
                        <p className={"tip1"}>矿机名</p>
                        <p className={"tip2"}>日期</p>
                        <p className={"tip3"}>所在地</p>
                    </div>
                    <div className={"list-area"}>
                        {listItems}
                    </div>
                    <input onClick={this.addGroupPoolMiner.bind(this)} className={"confirm"} type={"button"} value={"确定"} />
                    <h6>已选择{this.state[OPERATION.POOL_INFO][OPERATION.ADD_MINER][ACTION.CHOOSE_CAN_ADD].length}台</h6>
                </div>
            </div>
        )
    }

}