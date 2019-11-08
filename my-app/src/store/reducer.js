import Axios from 'axios';

Axios({
    method:"post",
    url:"/user/login",
    data:{
        account:"18823161828",
        password:"admin123"
    }
}).then()

const defaultState = {
    inputValue:'write',
    list:[1,2,3]
}
export default (state = defaultState,action)=>{
    // console.log(state);
    // console.log(action);
    if(action.type === 'changeInput'){
        let newState = JSON.parse(JSON.stringify((state)));
        newState.inputValue=action.ccc;
        // console.log(newState);
        return newState;
    }
    return state
}