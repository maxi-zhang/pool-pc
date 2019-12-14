import React from 'react';
import store from "../../../store";
import {Icon} from "antd";
import {closeOpenArea} from "../../common/model/PoolModel";

export default class DeviceIndex extends React.Component {
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
    }
    storeChange(){
        this.state = store.getState();
        this.setState(this.state);
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }

    render() {
        return (
            <React.Fragment>
                <DeviceMenu/>
                <div></div>


            </React.Fragment>
        );
    }
}


class DeviceMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
    }
    storeChange(){
        this.state = store.getState();
        this.setState(this.state);
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    closeCreateArea(){
        closeOpenArea()
    }
    render() {
        return(
            <React.Fragment>
                <div onClick={this.closeCreateArea.bind(this)} className={"add-delete-background"}></div>
                <div className={"device-index-main"}>
                    <h5>控制面板</h5>
                    <Icon onClick={this.closeCreateArea.bind(this)} type="close" style={{position:"absolute",top:"18px",left:"521px",fontSize:"12px"}} />
                    <div className={"inner"}>
                        <div className={"menu"}>
                            <div className={"block menu1_on"}>
                                <p>系统信息</p>
                            </div>
                            <div className={"block menu2"}>
                                <p>系统性能</p>
                            </div>
                            <div className={"block menu3"}>
                                <p>磁盘管理</p>
                            </div>
                            <div className={"block menu4"}>
                                <p>网络配置</p>
                            </div>
                            <div className={"block menu5"}>
                                <p>矿机质押</p>
                            </div>
                            <div className={"block menu6"}>
                                <p>挖矿目录</p>
                            </div>
                        </div>
                        <div className={"text"}>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}










