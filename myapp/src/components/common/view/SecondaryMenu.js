import React from 'react';
import store from "../../../store";
import {ACTION, OPERATION} from "../Config";
import {changeMenuStatus,openPopupBox} from "../model/PoolModel";
import {Icon} from "antd";

export default class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        this.menu = {};
        this.id = 'secondary-menu';
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
    createPool(){
        openPopupBox(OPERATION.CREATE_POOL_ONE);
    }
    showMenu(menu){
        changeMenuStatus(ACTION.SECONDARY_MENU,menu,this.state)
    }
    render() {
        this.menu = {};
        if(this.state[OPERATION.MENU_INFO][ACTION.INDEX_MENU] === OPERATION.INDEX_MENU_1){
            this.id = 'secondary-none';
        }else if(this.state[OPERATION.MENU_INFO][ACTION.INDEX_MENU] === OPERATION.INDEX_MENU_2){
            this.id = 'secondary-menu';
            this.menu[OPERATION.SECOND_MENU_4] = '我的设备';
            this.menu[OPERATION.SECOND_MENU_5] = '我的委托';
            this.menu[OPERATION.SECOND_MENU_6] = '委托给我';
            this.menu[OPERATION.SECOND_MENU_3] = '员工管理';
            this.menu[OPERATION.SECOND_MENU_7] = '虚拟节点';
            this.menu[OPERATION.SECOND_MENU_8] = '节点收益';
            this.menu[OPERATION.SECOND_MENU_9] = '监控报警';
            this.menu[OPERATION.SECOND_MENU_10] = '我的工单';
            this.menu[OPERATION.SECOND_MENU_12] = '虚拟主机用户';
            this.menu[OPERATION.SECOND_MENU_13] = '我的用户';
            this.menu[OPERATION.SECOND_MENU_14] = '抽成设置';
        }else if(this.state[OPERATION.MENU_INFO][ACTION.INDEX_MENU] === OPERATION.INDEX_MENU_3){
            this.id = 'secondary-menu';
        }else if(this.state[OPERATION.MENU_INFO][ACTION.INDEX_MENU] === OPERATION.INDEX_MENU_4){
            this.id = 'secondary-menu';
            this.menu[OPERATION.SECOND_MENU_1] = '钱包设置';
            this.menu[OPERATION.SECOND_MENU_2] = '关于我们';
        }
        const ListItems = Object.keys(this.menu).map((key) =>{
                if(key === this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][this.state[OPERATION.MENU_INFO][ACTION.INDEX_MENU]]){
                    return (<div key={key} onClick={this.showMenu.bind(this,key)} className={"menu-detail-on"}><p>{this.menu[key]}</p></div>)
                }else{
                    return (<div key={key} onClick={this.showMenu.bind(this,key)} className={"menu-detail"}><p>{this.menu[key]}</p></div>)
                }
            }
        );
        let PoolItems;
        if(this.state[OPERATION.MENU_INFO][ACTION.INDEX_MENU] === OPERATION.INDEX_MENU_3){
             PoolItems  = Object.keys(this.state[OPERATION.POOL_INFO][ACTION.POOL_DATA]).map((key)=>{
                if(this.state[OPERATION.POOL_INFO][ACTION.POOL_DATA][key]['up_id'] ===  this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][this.state[OPERATION.MENU_INFO][ACTION.INDEX_MENU]]){
                    return (<div key={this.state[OPERATION.POOL_INFO][ACTION.POOL_DATA][key]['up_id']} onClick={this.showMenu.bind(this,this.state[OPERATION.POOL_INFO][ACTION.POOL_DATA][key]['up_id'])} className={"menu-detail-on"}><p>{this.state[OPERATION.POOL_INFO][ACTION.POOL_DATA][key]['name']}</p></div>)
                }else{
                    return (<div key={this.state[OPERATION.POOL_INFO][ACTION.POOL_DATA][key]['up_id']} onClick={this.showMenu.bind(this,this.state[OPERATION.POOL_INFO][ACTION.POOL_DATA][key]['up_id'])} className={"menu-detail"}><p>{this.state[OPERATION.POOL_INFO][ACTION.POOL_DATA][key]['name']}</p></div>)
                }
            });
        }else{
             PoolItems = <React.Fragment></React.Fragment>;
        }

        return (
            <div id={this.id}>
                {this.state[OPERATION.MENU_INFO][ACTION.INDEX_MENU] === OPERATION.INDEX_MENU_3?
                    <div onClick={this.createPool.bind(this)} className={"menu-detail create-pool"}><p><Icon type="plus-circle" />&nbsp;&nbsp;创建矿场</p></div>:
                    <div></div>
                }
                {ListItems}
                {PoolItems}
            </div>
        )

    }
}