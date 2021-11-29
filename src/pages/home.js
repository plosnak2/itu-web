import React, { Component } from 'react';
import {auth} from '../firebase'
import {Navigate} from 'react-router-dom'
import cookie from 'js-cookie';
import Loader from "react-loader-spinner";
import Navbar from '../static/navbar';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state= {
      user: cookie.get('mail'),
      loading: true,
      unathorized: false
    }
  }

  componentDidMount(){
    auth.onAuthStateChanged( user => {
      if (user) {
        this.setState({loading: false})
      } else {
        this.setState({unathorized: true})
        this.setState({loading: false})
      }
    })
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
        if(this.state.unathorized){
          return(
            <Navigate to="/"/>
          )
        }
        return (
          <div>
            <Navbar />
            <div  className="container">
              <h3>{this.state.user}</h3>
            </div>
          </div>
        );
      }
      
    }
  }
  
  export default Home;
  