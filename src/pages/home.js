import React, { Component } from 'react';
import {auth} from '../firebase'
import {Navigate} from 'react-router-dom'
import cookie from 'js-cookie';
import Loader from "react-loader-spinner";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state= {
      loggedOf: false,
      user: cookie.get('mail'),
      loading: true
    }
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount(){
    auth.onAuthStateChanged( user => {
      if (user) {
        this.setState({loading: false})
      } else {
        this.setState({loggedOf: true})
        this.setState({loading: false})
      }
    })
  }

  signOut(){
      auth
        .signOut()
        .then(() => {
            cookie.remove("mail")
            this.setState({loggedOf: true})
        })
        .catch(error => alert(error.message))
    }

    render(){
      if(this.state.loading){
        return(
          <div className="vertical">
            <Loader 
            type="ThreeDots"
            color="#0782F9"
            height={100}
            width={100}
            />
          </div>
        )
      }
      else {
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
  }
  
  export default Home;
  