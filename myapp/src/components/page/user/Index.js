import React from 'react';

import Input from '../../common/Input'

export default class app extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount() {

    }
    render() {
        return (
            <div>
                <Input type={"text"}  />
                <Input type={"radio"}  />
            </div>
        );
    }
}