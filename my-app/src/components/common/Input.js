import React from 'react';
import store from '../../store'

export default class InputText extends  React.Component{
    constructor(props){
        super(props)
        this.state = {value: ''};
        this.state.type = props.type;
        this.state.abc = store.getState();
        this.handleChange = this.handleChange.bind(this);
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
    }
    storeChange(){
        this.state.abc = store.getState();
        this.setState(store.getState())
    }
    handleChange(e){
        this.setState({value:e.target.value})
        const action = {
            type:'changeInput',
            aaa:'bbb',
            ccc:e.target.value
        }
        store.dispatch(action)
    }
    render() {
        let value = this.state.value;
        let type = this.state.type;
        return(
            <div>
                <input name={"aaa"} type={type} value={value} onChange={this.handleChange} />
                <p>{this.state.abc.inputValue}</p>
            </div>
        );
    }
}
