import React from 'react';
import {Link} from "react-router-dom";
import {clearReduxData} from "../../common/model/UserModel";
import store from "../../../store";
import {checkUserToken} from "../../common/Common";
import TopBanner from '../../common/view/TopBanner'
import MainMenu from '../../common/view/MainMenu'

export default class app extends React.Component {
    constructor(props){
        super(props);
        clearReduxData(props.location.pathname)
        this.state = store.getState();
        checkUserToken(this.state);
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
            <div>
                <TopBanner />
                <MainMenu />
            </div>
        );
    }
}