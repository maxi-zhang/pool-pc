import React from 'react';
import store from "../../../store";

import home from "../../../img/home_ico_clickfarm.png"
import purse from "../../../img/home_ico_purse.png"
import trophy from "../../../img/home_ico_rankinglist.png"
import shop from "../../../img/home_ico_store.png"

export default class app extends React.Component {
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
            <div className={"homepage-main"}>
                <div className={"icon-main"}>
                    <div>
                        <img src={home} />
                    </div>
                    <p>软件商店</p>
                </div>
                <div className={"icon-main"}>
                    <div>
                        <img src={purse} />
                    </div>
                    <p>FileCoin钱包</p>
                </div>
                <div className={"icon-main"}>
                    <div>
                        <img src={trophy} />
                    </div>
                    <p>矿池排行榜</p>
                </div>
                <div className={"icon-main"}>
                    <div>
                        <img src={shop} />
                    </div>
                    <p>FileCoin刷单</p>
                </div>
            </div>
        );
    }
}