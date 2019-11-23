import {SUBMIT_INPUT} from "../../../store/config";
import store from "../../../store";

// 更该目录信息
let changeMenuStatus = (menu, value) =>{
    let info = [];
    info[menu] = value;
    const action = {
        type:SUBMIT_INPUT,
        info:info
    }
    store.dispatch(action)
}


export {changeMenuStatus}

