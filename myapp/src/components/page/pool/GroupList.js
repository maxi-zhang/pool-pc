import React from "react";
import store from "../../../store";
import {changeIndex, openPopupBox} from "../../common/model/PoolModel";
import {ACTION, OPERATION} from "../../common/Config";
import {Icon} from "antd";
import {getDiskPower, isEmpty} from "../../common/Common";

export default class GroupList extends React.Component{
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
    changeIndex(module){
        changeIndex(module)
    }
    openPopupBox(path){
        openPopupBox(path)
    }
    render() {
        const list = this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][OPERATION.DEL_GROUP][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]
        const pool = this.state[OPERATION.POOL_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]

        const listItems = list ? Object.keys(list).map((key)=> {
            return(
                <div key={key} onClick={this.changeIndex.bind(this,list[key]['group_id'])} className={"group-list-single"}>
                    <p className={"text1"}>{list[key]['name']}</p>
                    <p className={"text2"}>{list[key]['device_online']}/{list[key]['device_all']}</p>
                    <p className={"text3"}>{getDiskPower(list[key]['power'])}</p>
                </div>
            )
        }):<React.Fragment></React.Fragment>

        const form = this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.UNGROUP_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]
        return (
            <div className={"border"}>
                <div className={"total-machine"}>
                    <h5>矿机数：{pool['device_online']}/{pool['device_all']}</h5>
                    <Icon onClick={this.openPopupBox.bind(this,OPERATION.ADD_GROUP)} style={{color:"#7C8B96",fontSize:"20px",position:"absolute",right:"40px"}} type="plus-circle" />
                    <Icon onClick={this.openPopupBox.bind(this,OPERATION.DEL_GROUP)}  style={{color:"#7C8B96",fontSize:"20px",position:"absolute",right:"71px"}} type="minus-circle" />
                </div>
                <div className={"pool-list-topic"}>
                    <p className={"tip1"}>组名</p>
                    <p className={"tip2"}>矿机数</p>
                    <p className={"tip3"}>算力大小</p>
                </div>

                {isEmpty(form)?
                    <React.Fragment></React.Fragment>:<React.Fragment><div onClick={this.changeIndex.bind(this,"default")} className={"group-list-single"}>
                        <p className={"text1"}>默认分组</p>
                        <p className={"text2"}>{form['device_online']}/{form['device_all']}</p>
                        <p className={"text3"}>{getDiskPower(form['power'])}</p>
                    </div></React.Fragment>
                }
                {listItems}
            </div>
        );
    }
}