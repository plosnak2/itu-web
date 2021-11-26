import {auth} from '../firebase'
import React, { Component } from 'react';
import '../App.css';
import LoginPage from '../pages/loginpage';
import {Navigate} from 'react-router-dom'
import Loader from "react-loader-spinner";
import cookie from 'js-cookie';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: '',
      password: '',
      logged: false,
      badlogin: false,
      loading: true
    }
    this.login = this.login.bind(this)
    this.onChangeMail = this.onChangeMail.bind(this)
    this.onChangePass = this.onChangePass.bind(this)
  }

  componentDidMount(){
    auth.onAuthStateChanged(async user => {
      if (user) {
        this.setState({loading: false})
        this.setState({logged: true})
      } else {
        this.setState({loading: false})
      }
    })
  }

  login(){
    auth.signInWithEmailAndPassword(this.state.mail, this.state.password)
    .then((User) => {
      cookie.set("mail", this.state.mail)
      this.setState({logged: true})
    }).catch((error) => {
      this.setState({mail: ''})
      this.setState({password: ''})
      this.setState({badlogin: true})
    });
  }

  onChangeMail(e) {
    this.setState({mail: e.target.value})
  }

  onChangePass(e) {
    this.setState({password: e.target.value})
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
    } else {
      if(this.state.logged){
        return(
          <Navigate to="/home"/>
        )
        
      }
      return (
        <LoginPage login={this.login} onChangeMail={this.onChangeMail} onChangePass={this.onChangePass} badlogin={this.state.badlogin} mail={this.state.mail} password={this.state.password}/>
      );
    }
  }
}

export default Login;
