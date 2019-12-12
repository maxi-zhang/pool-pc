import ReconnectingWebSocket from "reconnecting-websocket";
import store from "../../../store/index"
import {ACTION, OPERATION} from "../Config";
import {message} from "antd";

message.config({
    top: '50%'
})

let condition = 0;

let openWebSocket = () =>{
    window.ws = new ReconnectingWebSocket("ws://120.79.36.70:8088/ws");
    window.ws.onopen = function(){
        let msg = '{"from":"html","act":"start","act_code":"start","user_id":'+store.getState()[OPERATION.USER_INFO][ACTION.ADMIN_USER_ID]+',"token":"'+store.getState()[OPERATION.USER_INFO][ACTION.ADMIN_TOKEN]+'"}';
        console.log(msg)
        window.ws.send(msg);
        setInterval(function () {
            if(condition === 1){
                msg = '{"from":"html","act":"heartbeat","act_code":"heartbeat"}';
                console.log(msg);
                window.ws.send(msg);
            }
        },5000);
    }
    window.ws.onmessage = function(e) {
        let data = JSON.parse(e.data);
        console.log(data);
        if(data.code === 0 && data.action === 'start'){
            condition = 1;
            return;
        }
        if(data.code === 0 && data.action === 'set_system_status'){
            if(data['act_code'].indexOf('restart') !== -1){
                message.success('已向矿机下发重启指令', 2);
                return
            }
            if(data['act_code'].indexOf('shutdown') !== -1){
                message.success('已向矿机下发关闭指令', 2);
                return
            }
        }

    }
}

export {openWebSocket}