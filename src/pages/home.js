import React, { Component } from 'react';
import {auth} from '../firebase'
import {Navigate} from 'react-router-dom'
import cookie from 'js-cookie';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state= {
      loggedOf: false,
      user: cookie.get("mail")
    }
    this.signOut = this.signOut.bind(this);
  }

  signOut(){
      auth
        .signOut()
        .then(() => {
            console.log("odhlasujem")
            cookie.remove("mail")
            this.setState({loggedOf: true})
        })
        .then(() => {
            
         
         })
        .catch(error => alert(error.message))
    }

    render(){
      if(this.state.loggedOf){
        return(
          <Navigate to="/"/>
        )
      }

      return (
        <div>
        <button  className="btn btn-primary" onClick={this.signOut}>Odlhasit</button>
        <h3>{this.state.user}</h3>
        </div>
      );
    }
  }
  
  export default Home;
  