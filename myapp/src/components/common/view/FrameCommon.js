import React from "react";
import TopBanner from "./TopBanner";
import MainMenu from "./MainMenu";
import SecondaryMenu from "./SecondaryMenu";
import store from "../../../store";
import {OPERATION, ACTION} from "../Config";
import CreatePoolStepOne from "../../page/pool/CreatePoolStepOne"
import CreatePoolStepTwo from "../../page/pool/CreatePoolStepTwo"
import {openWebSocket} from "../websocket/WebSocket";


export default class app extends React.Component {
    constructor(props){
        super(props);
        this.state = store.getState();
        openWebSocket();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
    }
    storeChange(){
        this.state = store.getState();
        this.setState(this.state)
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    render() {
        return (
            <React.Fragment>
                <TopBanner />
                <MainMenu />
                {this.state[OPERATION.MENU_INFO][ACTION.INDEX_MENU] !== OPERATION.INDEX_MENU_1?
                    <SecondaryMenu />:<React.Fragment></React.Fragment>
                }
                {this.state[OPERATION.PATH_INFO][ACTION.CURRENT_OPEN] === OPERATION.CREATE_POOL_ONE ?
                    <CreatePoolStepOne /> :
                    <React.Fragment></React.Fragment>
                }
                {this.state[OPERATION.PATH_INFO][ACTION.CURRENT_OPEN] === OPERATION.CREATE_POOL_TWO ?
                    <CreatePoolStepTwo />:
                    <React.Fragment></React.Fragment>
                }
            </React.Fragment>
        );
    }
}



