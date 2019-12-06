import React from 'react';
import store from "./store";
import Axios from "axios";
import qs from "qs";
import {checkNetworkIp} from "./components/common/Common";
import {changeCommonStatus} from "./components/common/model/UserModel";
import {ACTION, OPERATION} from "./components/common/Config";
import {CHANGE_STORE} from "./store/config";

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

  aaa(e){
    let info = e.target.value;
    const action = {
      type:'dddd',
      info:info
    }
    store.dispatch(action)
  }
  bbb(){
    // Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    // Axios.post('/user/user/get', qs.stringify(
    //     {
    //       user_id:7890013,
    //       token:'d40a99a69f755869a0290168cce1585d'
    //     })
    // ).then(function(data){
    //   const action = {
    //     type:'eeee',
    //     info:4123123123
    //   }
    //   store.dispatch(action)
    // });
    // checkNetworkIp()

    let info = this.state;
    Axios({
      method:"post",
      url:"/user/getIp",
      data:{}
    }).then(function(data){
      info[OPERATION.SYSTEM_INFO][ACTION.CLIENT_IP] = data.data.data;
      // const action = {
      //   type:CHANGE_STORE,
      //   info:info
      // }
      // store.dispatch(action)

      const action = {
        type:'eeee',
        info:info
      }
      store.dispatch(action)

    })
  }
  render() {
    return (
        <div>
          <input type={"text"} onChange={this.aaa.bind(this)} /><br />
          <input type={"button"} onClick={this.bbb.bind(this)} value={"submit"} />
        </div>
    );
  }
}