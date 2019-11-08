import React from 'react';
import Input from '../../common/Input'
// import store from  '../../../store/index'

export default class app extends React.Component {
    constructor(props){
        super(props)
        // console.log(store.getState())
    }
    componentDidMount() {

    }
    render() {
        return (
            <div>
                <Input type={"text"}  />
            </div>
        );
    }
}