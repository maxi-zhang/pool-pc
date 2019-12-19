import React from 'react';
import store from "../../../store";
import {Icon,Input} from "antd";
import {closeOpenArea} from "../../common/model/PoolModel";
import {ACTION, COIN, OPERATION} from "../../common/Config";
import {CHANGE_STORE} from "../../../store/config";
import DiskIcon from "../../../img/control_ico_disk@2x.png"
import BHDIcon from  "../../../img/BHD-icon.png"
import YTAIcon from  "../../../img/yta_name.png"
import FILIcon from "../../../img/ico_moac_nor.png"
import MOACIcon from "../../../img/moac-icon.png"
import Qrcode from "../../../img/qrcode.png"


export default class DeviceIndex extends React.Component{
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
                        <DeviceMenu/>
                        <DeviceText/>
                    </div>
                </div>
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
    changeMenu(menu){
        this.state[OPERATION.MENU_INFO][ACTION.DEVICE_MENU] = menu;
        const action = {
            type:CHANGE_STORE,
            info:this.state
        }
        store.dispatch(action)
    }
    render() {
        return(
            <div className={"menu"}>
                {this.state[OPERATION.MENU_INFO][ACTION.DEVICE_MENU] === OPERATION.DEVICE_MENU_1?
                    <div className={"block menu1_on"} onClick={this.changeMenu.bind(this,OPERATION.DEVICE_MENU_1)}>
                        <p>系统信息</p>
                    </div>:
                    <div className={"block menu1"} onClick={this.changeMenu.bind(this,OPERATION.DEVICE_MENU_1)}>
                        <p>系统信息</p>
                    </div>
                }
                {this.state[OPERATION.MENU_INFO][ACTION.DEVICE_MENU] === OPERATION.DEVICE_MENU_2?
                    <div className={"block menu2_on"} onClick={this.changeMenu.bind(this,OPERATION.DEVICE_MENU_2)}>
                        <p>系统性能</p>
                    </div>:
                    <div className={"block menu2"} onClick={this.changeMenu.bind(this,OPERATION.DEVICE_MENU_2)}>
                        <p>系统性能</p>
                    </div>
                }
                {this.state[OPERATION.MENU_INFO][ACTION.DEVICE_MENU] === OPERATION.DEVICE_MENU_3 ?
                    <div className={"block menu3_on"} onClick={this.changeMenu.bind(this,OPERATION.DEVICE_MENU_3)}>
                        <p>磁盘管理</p>
                    </div> :
                    <div className={"block menu3"} onClick={this.changeMenu.bind(this,OPERATION.DEVICE_MENU_3)}>
                        <p>磁盘管理</p>
                    </div>
                }
                {this.state[OPERATION.MENU_INFO][ACTION.DEVICE_MENU] === OPERATION.DEVICE_MENU_4 ?
                    <div className={"block menu4_on"} onClick={this.changeMenu.bind(this,OPERATION.DEVICE_MENU_4)}>
                        <p>网络配置</p>
                    </div> :
                    <div className={"block menu4"} onClick={this.changeMenu.bind(this,OPERATION.DEVICE_MENU_4)}>
                        <p>网络配置</p>
                    </div>
                }
                {this.state[OPERATION.MENU_INFO][ACTION.DEVICE_MENU] === OPERATION.DEVICE_MENU_5 ?
                    <div className={"block menu5_on"} onClick={this.changeMenu.bind(this,OPERATION.DEVICE_MENU_5)}>
                        <p>矿机质押</p>
                    </div>:
                    <div className={"block menu5"} onClick={this.changeMenu.bind(this,OPERATION.DEVICE_MENU_5)}>
                        <p>矿机质押</p>
                    </div>
                }
                {this.state[OPERATION.MENU_INFO][ACTION.DEVICE_MENU] === OPERATION.DEVICE_MENU_6 ?
                    <div className={"block menu6_on"} onClick={this.changeMenu.bind(this,OPERATION.DEVICE_MENU_6)}>
                        <p>挖矿目录</p>
                    </div> :
                    <div className={"block menu6"} onClick={this.changeMenu.bind(this,OPERATION.DEVICE_MENU_6)}>
                        <p>挖矿目录</p>
                    </div>
                }
            </div>
        )
    }
}

class DeviceText extends React.Component{
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
        return(
            <React.Fragment>
                {this.state[OPERATION.MENU_INFO][ACTION.DEVICE_MENU] === OPERATION.DEVICE_MENU_1?
                    <SystemInfo/>:
                    <React.Fragment></React.Fragment>
                }
                {this.state[OPERATION.MENU_INFO][ACTION.DEVICE_MENU] === OPERATION.DEVICE_MENU_2?
                    <SystemProfit/>:
                    <React.Fragment></React.Fragment>
                }
                {this.state[OPERATION.MENU_INFO][ACTION.DEVICE_MENU] === OPERATION.DEVICE_MENU_3 ?
                    <DiskManage/>:
                    <React.Fragment></React.Fragment>
                }
                {this.state[OPERATION.MENU_INFO][ACTION.DEVICE_MENU] === OPERATION.DEVICE_MENU_4 ?
                    <NetworkSet/>:
                    <React.Fragment></React.Fragment>
                }
                {this.state[OPERATION.MENU_INFO][ACTION.DEVICE_MENU] === OPERATION.DEVICE_MENU_5 ?
                    <MinerMortgage/>:
                    <React.Fragment></React.Fragment>
                }
                {this.state[OPERATION.MENU_INFO][ACTION.DEVICE_MENU] === OPERATION.DEVICE_MENU_6 ?
                    <ChooseCatalog/>:
                    <React.Fragment></React.Fragment>
                }
            </React.Fragment>
        )
    }
}


// 选择挖矿目录
class ChooseCatalog extends React.Component{
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
        return(
            <div className={"choose-catalog text"}>
                <div className={"choose-catalog-detail"}>
                    <img src={DiskIcon}/>
                    <p className={"text1"}>盘位1</p>
                    <p className={"text2"}>921.31GB</p>
                    <p className={"text3"}>正常</p>
                    <input type={"button"} className={"choose"} value={"选择"} />
                </div>
                <div className={"choose-catalog-detail"}>
                    <img src={DiskIcon}/>
                    <p className={"text1"}>盘位1</p>
                    <p className={"text2"}>921.31GB</p>
                    <p className={"text3"}>正常</p>
                    <input type={"button"} className={"choose"} value={"选择"} />
                </div>
                <div className={"choose-catalog-detail"}>
                    <img src={DiskIcon}/>
                    <p className={"text1"}>盘位1</p>
                    <p className={"text2"}>921.31GB</p>
                    <p className={"text3"}>正常</p>
                    <input type={"button"} className={"choose"} value={"选择"} />
                </div>
                <div className={"choose-catalog-detail"}>
                    <img src={DiskIcon}/>
                    <p className={"text1"}>盘位1</p>
                    <p className={"text2"}>921.31GB</p>
                    <p className={"text3"}>正常</p>
                    <input type={"button"} className={"choose"} value={"选择"} />
                </div>
            </div>
        )
    }
}

// 矿机质押
class MinerMortgage extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        this.menu = 'recharge';
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
    changeMenu(page){
        this.menu = page;
        this.setState(this.state)
    }
    render() {
        // 当前矿场ID
        let pool = this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3];
        // 当前币种
        let coin = this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.CURRENT_COIN][pool]
        return(
            <div className={"miner-mortgage text"}>
                {coin === COIN.YTA?
                    <img className={"coin"} src={YTAIcon} />:
                    <React.Fragment></React.Fragment>
                }
                {coin === COIN.FIL?
                    <img className={"coin"} src={FILIcon} />:
                    <React.Fragment></React.Fragment>
                }
                {coin === COIN.BHD?
                    <img className={"coin"} src={BHDIcon} />:
                    <React.Fragment></React.Fragment>
                }
                <div className={"tip-icon coin1"}></div>
                <div className={"tip-icon coin2"}></div>
                <p className={"tip1"}>余额</p>
                <p className={"text1"}>38.00</p>
                <p className={"tip2"}>已抵押</p>
                <p className={"text2"}>200.000YTA</p>
                <div className={"catalog"}>
                    {this.menu === 'recharge'?
                        <div className={"on"}>充币</div>:
                        <div onClick={this.changeMenu.bind(this,"recharge")}>充币</div>
                    }
                    {this.menu === 'mortgage' ?
                        <div className={"on"}>质押</div> :
                        <div onClick={this.changeMenu.bind(this,"mortgage")}>质押</div>
                    }
                </div>
                {this.menu === 'recharge'?
                    <div className={"area recharge"}>
                        <h6 className={"tip1"}>请务必使用你已认证通过的*XXXX地址充值，否则资产将不可找回。</h6>
                        <h6 className={"tip2"}>请勿向上述地址充值任何非BHD资产，否则资产将不可找回。</h6>
                        <img src={Qrcode} className={"qrcode"} />
                        <div className={"address"}>
                            <p className={"text1"}>充币地址：</p>
                            <p className={"text2"}>3QDDzoaJobVa1uUuW1kkNXnf7gerFdMcmm</p>
                            <p className={"text3"}>复制</p>
                        </div>
                    </div>:<React.Fragment></React.Fragment>
                }
                {this.menu === 'mortgage' ?
                    <div className={"area mortgage"}>
                    </div> :<React.Fragment></React.Fragment>
                }
            </div>
        )
    }
}

// 网络配置
class NetworkSet extends React.Component{
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
        return(
            <div className={"text"}>
                网络配置
            </div>
        )
    }
}

// 磁盘管理
class DiskManage extends React.Component{
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
        return(
            <div className={"text"}>
                磁盘管理
            </div>
        )
    }
}

// 系统性能
class SystemProfit extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        this.menu = 'cpu';
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
    changeMenu(prop){
        this.menu = prop;
        this.setState(this.state)
    }
    render() {
        return(
            <div className={"system-profit text"}>
                <div className={"top"}>
                    {this.menu === 'cpu'?
                        <div onClick={this.changeMenu.bind(this,'cpu')} className={"page on"}>CPU</div>:
                        <div onClick={this.changeMenu.bind(this,'cpu')} className={"page"}>CPU</div>
                    }
                    {this.menu === 'memory'?
                        <div onClick={this.changeMenu.bind(this,'memory')} className={"page on"}>内存</div>:
                        <div onClick={this.changeMenu.bind(this,'memory')} className={"page"}>内存</div>
                    }
                    {this.menu === 'network'?
                        <div onClick={this.changeMenu.bind(this,'network')} className={"page on"}>网络</div>:
                        <div onClick={this.changeMenu.bind(this,'network')} className={"page"}>网络</div>
                    }
                </div>
                {this.menu === 'cpu'?
                    <div className={"context cpu"}>
                        this is cpu
                    </div>:<React.Fragment></React.Fragment>
                }
                {this.menu === 'memory'?
                    <div className={"context cpu"}>
                        this is memory
                    </div>:<React.Fragment></React.Fragment>
                }
                {this.menu === 'network'?
                    <div className={"context cpu"}>
                        this is network
                    </div>:<React.Fragment></React.Fragment>
                }
            </div>
        )
    }
}

// 系统性能
class SystemInfo extends React.Component{
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
        return(
            <div className={"system-info text"}>
                <p className={"tit1"}>操作系统</p>
                <p className={"text1"}>版本:<span>这里是版本信息</span></p>

                <p className={"tit2"}>操作系统</p>
                <p className={"text2"}>处理器：<span>这里是CPU信息</span></p>
                <p className={"text3"}>内存：<span>这里是内存信息</span></p>
                <p className={"text4"}>温度：<span>这里是温度相关信息</span></p>

                <p className={"tit3"}>名称</p>
                <p className={"text5"}>设备名称：</p>
                <Input className={'device'} />
                <p className={"text6"}>IP地址：<span>10.11.12.23</span></p>

                <input value={"保存"} type={"button"} className={"confirm-button"} />

            </div>
        )
    }
}