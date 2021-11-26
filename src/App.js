import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from './components/login.js';
import React, { Component } from 'react';
import Home from './pages/home'
import Register from './pages/register'

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
