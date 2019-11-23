import React from 'react';
import store from "../../../store";
import {ACTION, OPERATION, PATH} from "../Config";
import {changeMenuStatus} from "../model/PoolModel";

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
    showMenu = (menu) =>{
        changeMenuStatus(ACTION.INDEX_MENU,menu)
    }
    render() {
        let menu1 = "menu-index";
        let menu2 = "serve-index";
        let menu3 = "pool-index";
        let menu4 = "user-index";
        if(this.state[ACTION.INDEX_MENU] == OPERATION.INDEX_MENU_1){
            menu1 = menu1 + "-on";
        }else if(this.state[ACTION.INDEX_MENU] == OPERATION.INDEX_MENU_2){
            menu2 = menu2 + "-on";
        }else if(this.state[ACTION.INDEX_MENU] == OPERATION.INDEX_MENU_3){
            menu3 = menu3 + "-on";
        }else if(this.state[ACTION.INDEX_MENU] == OPERATION.INDEX_MENU_4){
            menu4 = menu4 + "-on";
        }
        return (
            <div id={"main-menu"}>
                <div className={menu1} onClick={this.showMenu.bind(this,OPERATION.INDEX_MENU_1)}>
                    <div className={"menu-border"}></div>
                    <p>首页</p>
                </div>
                <div className={menu2} onClick={this.showMenu.bind(this,OPERATION.INDEX_MENU_2)}>
                    <div className={"menu-border"}></div>
                    <p>服务台</p>
                </div>
                <div className={menu3} onClick={this.showMenu.bind(this,OPERATION.INDEX_MENU_3)}>
                    <div className={"menu-border"}></div>
                    <p>矿场</p>
                </div>
                <div className={menu4} onClick={this.showMenu.bind(this,OPERATION.INDEX_MENU_4)}>
                    <div className={"menu-border"}></div>
                    <p>我的</p>
                </div>
            </div>
        )
    }
}