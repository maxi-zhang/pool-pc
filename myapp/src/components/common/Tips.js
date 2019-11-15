import React from 'react';

export default class Index extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return <h5 className={"login-title"}>{this.props.title}</h5>;
    }
}