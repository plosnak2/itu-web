/**
 * Author: Jakub Zaukolec (xzauko00)
 * This is logical and graphic component for creating navigation bar (top menu) that navigates over pages and handles signing out
 */
import React, { Component } from 'react';
import {auth} from '../firebase'
import {Navigate} from 'react-router-dom'
import cookie from 'js-cookie';
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import logo from '../images/logo.png'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state= {
          loggedOf: false,
        }
        this.signOut = this.signOut.bind(this);
      }

    // function for signing out current logged in user
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
    if(this.state.loggedOf){
        return(
            <Navigate to="/"/>
        )
    } else {
        return(
            <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top" style={{backgroundColor:"#0782F9"}}>
            <div className="container">
            <a class="navbar-brand"><img src={logo} width="60" height="60" class="d-inline-block align-top" alt="" /> </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <Link to="/home"><a class="nav-link" style={{fontSize:20, color:"#0782F9"}}>Recepty</a></Link>
                </li>
                <li class="nav-item">
                    <Link to="/favourites"><a class="nav-link" style={{fontSize:20, color:"#0782F9" }}>Obľúbené</a></Link>
                </li>
                <li class="nav-item">
                    <Link to="/newrecipe"><a class="nav-link" style={{fontSize:20, color:"#0782F9" }}>Pridať recept</a></Link>
                </li>
                <li class="nav-item">
                    <Link to="/shopping"><a class="nav-link" style={{fontSize:20, color:"#0782F9" }}>Nakúpné zoznamy</a></Link>
                </li>
                </ul>
                <button  className="btn btn-primary" onClick={this.signOut}>Odhlásiť</button>
            </div>
            </div>
            </nav>
        )
      }
    }
      
  }
  
  export default Navbar;
  