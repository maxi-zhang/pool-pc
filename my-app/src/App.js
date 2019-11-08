import React from 'react';
import Axios from 'axios';

export default class app extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {

  }
  about(){
      Axios({
          method:"post",
          url:"/user/login",
          data:{
              account:"18823161828",
              password:"admin123"
          }
      })
  }
  render() {
    return (
        <div>
            this is output
            <br />
            <input onClick={()=>this.about()} type="button" value="button" />
        </div>
    );
  }
}