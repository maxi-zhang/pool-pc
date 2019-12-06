import React from "react";
import store from "../../../store";
import {ACTION, OPERATION} from "../../common/Config";
import {getDiskPower,stringCut,isEmpty} from "../../common/Common";
import {Dropdown, Icon, Menu} from "antd";
import {changePoolCoin, changeIndex, setPoolWallet, openPopupBox} from "../../common/model/PoolModel";

export default class PoolInsideTop extends React.Component{
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
    changeCurrentCoin(coin){
        changePoolCoin(coin)
    }
    changeIndex(module){
        changeIndex(module)
    }
    openPopupBox(path){
        if(path === OPERATION.POOL_SET){
            setPoolWallet();
        }else if(path === OPERATION.ADD_MINER){
            openPopupBox(OPERATION.ADD_MINER);
        }else if(path === OPERATION.DELETE_MINER){
            openPopupBox(OPERATION.DELETE_MINER);
        }
    }
    render() {
        const listItems =(
            Object.keys(this.state[OPERATION.POOL_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info']).map((key)=> {
                return(
                    <Menu.Item key={key} >
                        <a onClick={this.changeCurrentCoin.bind(this,this.state[OPERATION.POOL_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info'][key]['mining_type'])} target="_blank" rel="noopener noreferrer">
                            {this.state[OPERATION.POOL_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info'][key]['mining_type']}
                        </a>
                    </Menu.Item>
                )
            })
        )
        const menu = (
            <Menu>
                {listItems}
            </Menu>
        )
        const menu1 = (
            <Menu>
                <Menu.Item>
                    <a onClick={this.openPopupBox.bind(this,OPERATION.POOL_SET)} rel="noopener noreferrer" href="/#/">
                        设置
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={this.openPopupBox.bind(this,OPERATION.ADD_MINER)} rel="noopener noreferrer" href="/#/">
                        添加矿工
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={this.openPopupBox.bind(this,OPERATION.DELETE_MINER)} rel="noopener noreferrer" href="/#/">
                        移除矿工
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a rel="noopener noreferrer" href="/#/">
                        excel导入矿机
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a rel="noopener noreferrer" href="/#/">
                        导出excel模板
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a rel="noopener noreferrer" href="/#/">
                        订单管理
                    </a>
                </Menu.Item>
            </Menu>
        );
        return(
            <div className={"pool-top-common"}>
                <h5>{stringCut(this.state[OPERATION.POOL_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['name'],13)}</h5>
                <h6 className={"tip1"}>总磁盘：
                    {getDiskPower(this.state[OPERATION.POOL_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['disk_space_all'])}
                </h6>
                {this.state[OPERATION.POOL_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info'].length > 1?
                    <h6 className={"tip2"}>{this.state[OPERATION.POOL_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info'][0]['mining_type']}/{this.state[OPERATION.POOL_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info'][1]['mining_type']}</h6>:
                    <h6 className={"tip2"}>{this.state[OPERATION.POOL_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info'][0]['mining_type']}</h6>
                }
                {this.state[OPERATION.POOL_INFO][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]['mining_info'].length > 1?
                    <Dropdown placement={"bottomCenter"} overlayClassName={"more-operation"} overlay={menu} >
                        <div className={"coin-select"}>
                            <a className="ant-dropdown-link" href="#">
                                <button className={"coin"}>{this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.CURRENT_COIN][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]} <Icon type="caret-down" /></button>
                            </a>
                        </div>
                    </Dropdown>:<React.Fragment></React.Fragment>
                }
                {/*className={"rent"}*/}
                <button onClick={this.changeIndex.bind(this,OPERATION.POOL_RENT)}
                        className={this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.POOL_INDEX][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]] === OPERATION.POOL_RENT?
                            "rent on":"rent"
                        }
                        type={"button"} >租赁</button>
                <button onClick={this.changeIndex.bind(this,OPERATION.POOL_OPERATION)}
                        className={(this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.POOL_INDEX][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]] === OPERATION.POOL_OPERATION || isEmpty(this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.POOL_INDEX][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]]))?
                            "manage on":"manage"
                        }
                        type={"button"} >运维</button>
                <button onClick={this.changeIndex.bind(this,OPERATION.POOL_PROFIT)}
                        className={this.state[OPERATION.POOL_INFO][OPERATION.POOL_MAIN][ACTION.POOL_INDEX][this.state[OPERATION.MENU_INFO][ACTION.SECONDARY_MENU][OPERATION.INDEX_MENU_3]] === OPERATION.POOL_PROFIT?
                            "income on":"income"
                        }
                        type={"button"} >收益</button>
                <Dropdown placement={"bottomRight"} overlayClassName={"more-operation"} overlay={menu1} >
                    <div className={"operation-block"}>
                        <a className="ant-dropdown-link" href="#">
                            <div className={"more-operation"}>
                                <Icon type="ellipsis" />
                            </div>
                        </a>
                    </div>
                </Dropdown>
            </div>
        )
    }
}