import React from "react";
import store from "../../../store";
import {
    changeCoinValue,
    changeCurrentCoin,
    checkCreatePoolTwo,
    closeClearError,
    closeOpenArea,
    getPoolCoinSet
} from "../../common/model/PoolModel";
import {ACTION, COIN, FILSET, OPERATION, YTASET} from "../../common/Config";
import {Alert, Icon, Input} from "antd";
import FileCoinIcon from "../../../img/ico_filecoin.png";
import BHDIcon from "../../../img/bhd_coin.png";
import YTAIcon from "../../../img/ytacoin.png";

export default class CreatePoolStepTwo extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        getPoolCoinSet();
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
    closeError(){
        closeClearError()
    }
    checkCreatePoolTwo(){
        checkCreatePoolTwo()
    }
    changeCurrentCoin(coin){
        changeCurrentCoin(coin);
    }
    changeValue(coin,key,e){
        changeCoinValue(coin,key,e.target.value);
    }

    render() {
        let length = this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE].split("|").length;
        return(
            <React.Fragment>
                <div onClick={this.closeCreateArea.bind(this)} className={"add-delete-background"}></div>
                <div className={"create-pool-two"}>
                    <h5>链设置</h5>
                    <Icon onClick={this.closeCreateArea.bind(this)} type="close" style={{position:"absolute",top:"18px",left:"521px",fontSize:"12px"}} />

                    {length > 1?
                        <React.Fragment>
                            <div className={"coin-type"}>
                                {this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE].split("|")[0] === this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.CURRENT_COIN]?
                                    <div onClick={this.changeCurrentCoin.bind(this,this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE].split("|")[0])} className={"on"}>{this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE].split("|")[0]}</div>:
                                    <div onClick={this.changeCurrentCoin.bind(this,this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE].split("|")[0])} className={"off"}>{this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE].split("|")[0]}</div>
                                }
                                {this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE].split("|")[1] === this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.CURRENT_COIN] ?
                                    <div onClick={this.changeCurrentCoin.bind(this,this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE].split("|")[1])} className={"on"}>{this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE].split("|")[1]}</div>:
                                    <div onClick={this.changeCurrentCoin.bind(this,this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE].split("|")[1])} className={"off"}>{this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.AP_TYPE].split("|")[1]}</div>
                                }

                            </div>
                        </React.Fragment>:<React.Fragment></React.Fragment>
                    }

                    <div className={"error-area"}>
                        {this.state[OPERATION.ERROR_INFO][ACTION.ERROR_CODE] > 0?
                            <Alert onClose={this.closeError.bind(this)} message={this.state[OPERATION.ERROR_INFO][ACTION.ERROR_DESCRIPTION]} type="error" closable />:
                            <React.Fragment></React.Fragment>
                        }
                    </div>

                    <div className={"create-main"}>
                        {this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.CURRENT_COIN] === COIN.FIL?
                            <React.Fragment>
                                <div className={"coin-logo"}>
                                    <img src={FileCoinIcon} />
                                </div>
                                <div className={"info"} style={{marginTop:"57px"}}>
                                    <p><span>*</span>钱包地址：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.FIL,FILSET.MINING_ID)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.MINING_ID]} placeholder="请输入钱包地址" />
                                </div>
                                <div className={"info"} style={{height:"20px"}}>
                                    <h4>提示：矿场每日支付时间为8:00-16:00</h4>
                                </div>
                                <div className={"info"} style={{marginTop:"0px"}}>
                                    <p><span>*</span>最小打款数：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.FIL,FILSET.MIN_INCOME)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.MIN_INCOME]} placeholder="10.00起" />
                                </div>
                                <div className={"info"}>
                                    <p><span>*</span>最高手续费：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.FIL,FILSET.GAS_LIMIT)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.GAS_LIMIT]} placeholder="10.00起" />
                                </div>
                                <div className={"info"}>
                                    <p><span>*</span>最低手续费：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.FIL,FILSET.GAS_PRICE)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.GAS_PRICE]} placeholder="10.00起" />
                                </div>
                                <div className={"info"}>
                                    <p><span>*</span>报价：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.FIL,FILSET.PRICE)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.PRICE]} placeholder="请输入" />
                                </div>
                                <div className={"info"}>
                                    <p><span>*</span>有效区块数：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.FIL,FILSET.BLOCK)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.FIL][FILSET.BLOCK]} placeholder="请输入" />
                                </div>
                            </React.Fragment>:<React.Fragment></React.Fragment>
                        }
                        {this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.CURRENT_COIN] === COIN.BHD?
                            <React.Fragment>
                                <div className={"coin-logo"}>
                                    <img src={BHDIcon} />
                                </div>
                                <div className={"info"} style={{marginTop:"57px"}}>
                                    <p><span>*</span>钱包地址：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.BHD,FILSET.MINING_ID)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][FILSET.MINING_ID]} placeholder="请输入钱包地址" />
                                </div>
                                <div className={"info"} style={{height:"20px"}}>
                                    <h4>提示：矿场每日支付时间为8:00-16:00</h4>
                                </div>
                                <div className={"info"} style={{marginTop:"0px"}}>
                                    <p><span>*</span>最小打款数：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.BHD,FILSET.MIN_INCOME)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][FILSET.MIN_INCOME]} placeholder="10.00起" />
                                </div>
                                <div className={"info"}>
                                    <p><span>*</span>最高手续费：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.BHD,FILSET.GAS_LIMIT)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][FILSET.GAS_LIMIT]} placeholder="10.00起" />
                                </div>
                                <div className={"info"}>
                                    <p><span>*</span>最低手续费：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.BHD,FILSET.GAS_PRICE)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][FILSET.GAS_PRICE]} placeholder="10.00起" />
                                </div>
                                <div className={"info"}>
                                    <p><span>*</span>报价：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.BHD,FILSET.PRICE)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][FILSET.PRICE]} placeholder="请输入" />
                                </div>
                                <div className={"info"}>
                                    <p><span>*</span>有效区块数：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.BHD,FILSET.BLOCK)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.BHD][FILSET.BLOCK]} placeholder="请输入" />
                                </div>
                            </React.Fragment>:<React.Fragment></React.Fragment>
                        }
                        {this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][ACTION.CURRENT_COIN] === 'YTA' ?
                            <React.Fragment>
                                <div className={"coin-logo"}>
                                    <img src={YTAIcon} />
                                </div>
                                <div className={"info"} style={{marginTop:"57px"}}>
                                    <p><span>*</span>储存空间(GB)：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.YTA,YTASET.DISK_SPACE)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.DISK_SPACE]} placeholder="请输入储存空间" />
                                </div>
                                <div className={"info"}>
                                    <p><span>*</span>抵押用户名：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.YTA,YTASET.USER_MORTGAGE)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.USER_MORTGAGE]} placeholder="请输入抵押用户名" />
                                </div>
                                <div className={"info"}>
                                    <p><span>*</span>抵押额度：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.YTA,YTASET.MORTGAGE_BALANCE)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.MORTGAGE_BALANCE]} placeholder="请输入抵押额度" />
                                </div>
                                <div className={"info"}>
                                    <p><span>*</span>管理员账号：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.YTA,YTASET.USER_MANAGE)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.USER_MANAGE]} placeholder="请输入管理员账号" />
                                </div>
                                <div className={"info"}>
                                    <p><span>*</span>矿池ID：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.YTA,YTASET.AlIANCE_POOL_ID)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.AlIANCE_POOL_ID]} placeholder="请输入矿池ID" />
                                </div>
                                <div className={"info"}>
                                    <p><span>*</span>矿池密钥：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.YTA,YTASET.ALIANCE_POOL_KEY)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.ALIANCE_POOL_KEY]} placeholder="请输入矿池密钥" />
                                </div>
                                <div className={"info"}>
                                    <p><span>*</span>矿池配额(GB)：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.YTA,YTASET.ALIANCE_POOL_SPACE)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.ALIANCE_POOL_SPACE]} placeholder="请输入矿池配额" />
                                </div>
                                <div className={"info"}>
                                    <p><span>*</span>收益账号：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.YTA,YTASET.MINING_ID)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.MINING_ID]} placeholder="请输入收益账号" />
                                </div>
                                <div className={"info"}>
                                    <p><span>*</span>机器节点数：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.YTA,YTASET.NODE_COUNT)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.NODE_COUNT]} placeholder="请输入机器节点数" />
                                </div>
                                <div className={"info"}>
                                    <p><span>*</span>端口开始点：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.YTA,YTASET.PORT_FROM)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.PORT_FROM]} placeholder="请输入端口开始点" />
                                </div>
                                <div className={"info"}>
                                    <p><span>*</span>端口结束点：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.YTA,YTASET.PORT_TO)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.PORT_TO]} placeholder="请输入端口结束点" />
                                </div>
                                <div className={"info"}>
                                    <p><span>*</span>查询服务器：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.YTA,YTASET.HOST_URI)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.HOST_URI]} placeholder="请输入查询服务器" />
                                </div>
                                <div className={"info"}>
                                    <p><span>*</span>抵押账号私钥：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.YTA,YTASET.MORTGAGE_KEY)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.MORTGAGE_KEY]} placeholder="请输入抵押账号私钥" />
                                </div>
                                <div className={"info"}>
                                    <p><span>*</span>管理账号私钥：</p>
                                    <Input onChange={this.changeValue.bind(this,COIN.YTA,YTASET.MANAGE_KEY)} value={this.state[OPERATION.POOL_INFO][OPERATION.CREATE_POOL][COIN.YTA][YTASET.MANAGE_KEY]} placeholder="请输入管理账号私钥" />
                                </div>

                            </React.Fragment>:<React.Fragment></React.Fragment>
                        }

                        <Icon style={{position:"absolute",left:"399px",top:"67px",display:"none"}} type="lock" />
                        <Icon style={{position:"absolute",left:"399px",top:"130px",display:"none"}} type="unlock" />
                    </div>
                    <div className={"underline"}></div>
                    <input onClick={this.checkCreatePoolTwo.bind(this)} className={"button"} type={"button"} value={"确定"} />
                </div>
            </React.Fragment>
        )
    }
}