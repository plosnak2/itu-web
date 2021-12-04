/**
 * Author: Jakub Zaukole (xzauko00)
 * This is graphic component for login page
 */
import React, { Component } from 'react';
import '../App.css';
import logo from '../images/logo.png'
import { Link } from "react-router-dom";

class LoginPage extends Component {
  render(){
    return (
      <div id="login">
        <div class="container">
          <h2 style={{textAlign:"center"}}><img src={logo} style={{width:250}} alt="Placeholder"/></h2>
            <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6">
                    <div id="login-box" class="col-md-12">
                        <div id="login-form" class="form">
                            <h3 class="text-center text-info">Prihláste sa pre prístup do aplikácie</h3>
                            {this.props.badlogin && (<h5 class="text-center" style={{color:"red"}}>Nesprávny mail alebo heslo</h5>)}
                            <div class="form-group">
                                <label for="username" class="text-info">Prihlasovací mail:</label><br />
                                <input type="text" name="username" id="username" class="form-control" onChange={this.props.onChangeMail} value={this.props.mail}/>
                            </div>
                            <div class="form-group">
                                <label for="password" class="text-info">Prihlasovacie heslo:</label><br />
                                <input type="password" name="password" id="password" class="form-control" onChange={this.props.onChangePass} value={this.props.password}/>
                            </div>
                            <div class="form-group">
                                <input type="submit" name="submit" class="btn btn-info btn-md" value="Prihlásiť" onClick={this.props.login}/>
                            </div>
                            <div id="register-link" class="text-right">
                                <br />
                                <Link to="/register"><p class="text-info">Zaregistrovať sa TU!</p></Link>
                            </div>
                          </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default LoginPage;
