/**
 * Author: Jakub Zaukole (xzauko00)
 * This is graphic component for register page
 */
import React, { Component } from 'react';
import '../App.css';
import logo from '../images/logo.png'
import { Link } from "react-router-dom";

class RegisterPage extends Component {
  render(){
    return (
      <div id="login">
        <div class="container">
          <h2 style={{textAlign:"center"}}><img src={logo} style={{width:250}} alt="Placeholder"/></h2>
            <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6">
                    <div id="login-box" class="col-md-12">
                        <div id="login-form" class="form">
                            <h3 class="text-center text-info">Vytvorte si účet</h3>
                            {this.props.error && (<h5 class="text-center" style={{color:"red"}}>{this.props.errorMessage}</h5>)}
                            <div class="form-group">
                                <label for="username" class="text-info">Prihlasovací mail:</label><br />
                                <input type="text" name="username" id="username" class="form-control" value={this.props.mail} onChange={this.props.onChangeMail}/>
                            </div>
                            <div class="form-group">
                                <label for="password" class="text-info">Prihlasovacie heslo:</label><br />
                                <input type="password" name="password" id="password" class="form-control" value={this.props.password} onChange={this.props.onChangePass}/>
                            </div>
                            <div class="form-group">
                                <label for="passwordagain" class="text-info">Potvrdenie hesla:</label><br />
                                <input type="password" name="passwordagain" id="passwordagain" class="form-control" value={this.props.passwordAgain} onChange={this.props.onChangePassAgain}/>
                            </div>
                            <div class="form-group">
                                <input type="submit" name="submit" class="btn btn-info btn-md" value="Zaregistrovať" onClick={this.props.register}/>
                            </div>
                            <div id="register-link" class="text-right">
                                <br />
                                <Link to="/"><p class="text-info">Prihlásiť sa tu!</p></Link>
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

export default RegisterPage;
