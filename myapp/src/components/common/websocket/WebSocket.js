import ReconnectingWebSocket from "reconnecting-websocket";
import store from "../../../store/index"
import {ACTION, OPERATION} from "../Config";

let condition = 0;
let openWebSocket = () =>{
    let ws = new ReconnectingWebSocket("ws://192.168.1.212:8088/ws");
    ws.onopen = function(){
        let msg = '{"from":"html","act":"start","act_code":"start","user_id":'+store.getState()[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID]+',"token":"'+store.getState()[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN]+'"}';
        console.log(msg)
        ws.send(msg);
        setInterval(function () {
            if(condition === 1){
                msg = '{"from":"html","act":"heartbeat","act_code":"heartbeat"}';
                console.log(msg);
                ws.send(msg);
            }
        },5000);
    }
    ws.onmessage = function(e) {
        let data = JSON.parse(e.data);
        console.log(data);
        if(data.code === 0 && data.action === 'start'){
            condition = 1;
            return;
        }
    }
}

export {openWebSocket}