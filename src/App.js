import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from './components/login.js';
import React, { Component } from 'react';
import Home from './pages/home'
import Register from './components/register'
import Shopping from './components/shopping';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/shopping" element={<Shopping />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
