/**
 * Author: Jakub Zaukolec (xzauko00)
 * This is logical component for registering new users
 */
import {auth, UsersRef} from '../firebase'
import React, { Component } from 'react';
import '../App.css';
import {Navigate} from 'react-router-dom'
import cookie from 'js-cookie';
import RegisterPage from '../pages/registerpage'
import Loader from "react-loader-spinner";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
        logged: false,
        mail: '',
        password: '',
        passwordAgain: '',
        error: false,
        errorMessage: '',
        loading: true
    }
    this.register = this.register.bind(this)
    this.onChangeMail = this.onChangeMail.bind(this)
    this.onChangePass = this.onChangePass.bind(this)
    this.onChangePassAgain = this.onChangePassAgain.bind(this)
  }

  componentDidMount(){
   auth.onAuthStateChanged( user => {
    if (user) {
      this.setState({loading: false})
      this.setState({logged: true})
    } else {
      this.setState({loading: false})
    }
  })
  }

  // function that changes state of mail
  onChangeMail(e) {
    this.setState({mail: e.target.value})
  }

  // function that changes state of password
  onChangePass(e) {
    this.setState({password: e.target.value})
  }

  // function that changes state of confirmation password
  onChangePassAgain(e) {
    this.setState({passwordAgain: e.target.value})
  }
 
  // function that handles registering new user (with all possible errors that can occur)
  register(){
      if(this.state.mail === '' || this.state.password === '' || this.state.passwordAgain === ''){
        this.setState({
            error: true,
            errorMessage: 'Musia byť vyplnené všetky polia',
            password: '',
            passwordAgain: ''
        })
      } else {
        if(this.state.password !== this.state.passwordAgain){
            this.setState({
                error: true,
                errorMessage: 'Hesla sa nezhodujú',
                password: '',
                passwordAgain: ''
            })
        } else {
            if(this.state.password.length < 6){
                this.setState({
                    error: true,
                    errorMessage: 'Heslo musí mať aspoň 6 znakov',
                    password: '',
                    passwordAgain: ''
                })
            } else {
                auth
                .createUserWithEmailAndPassword(this.state.mail, this.state.password)
                .then(userCredentials => {
                    cookie.set("mail", this.state.mail)
                    UsersRef.doc(this.state.mail).set({
                        favourites: [],
                        rating: {},
                        shopping: []
                      })
                    .then(() => {
                        this.setState({logged: true})
                    })
                })
                
                .catch(error => {
                    this.setState({
                        error: true,
                        errorMessage: 'Táto emailová adresa sa už používa',
                        password: '',
                        passwordAgain: ''
                    })
                })
            }
            
        }
      }
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
            <RegisterPage mail={this.state.mail} password={this.state.password} passwordAgain={this.state.passwordAgain} onChangeMail={this.onChangeMail} onChangePass={this.onChangePass} onChangePassAgain={this.onChangePassAgain} register={this.register} error={this.state.error} errorMessage={this.state.errorMessage}/>
            );
            }
        }
}

export default Register;
