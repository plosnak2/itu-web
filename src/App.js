import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from './components/login.js';
import React, { Component } from 'react';
//import Home from './pages/home'
import Register from './components/register'
import Home from './components/home'
import Shopping from './components/shopping';
import Favourites from './components/favourites';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/shopping" element={<Shopping />} />
          <Route exact path="/favourites" element={<Favourites />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
