import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import Login from './pages/login';
import Registration from './pages/registration';
import { Routes, Route , Link } from 'react-router-dom';



class App extends Component {
  state = { 
    
   } 
  login
  render() { 
    return (
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route exact path='/' element={<Login/>}></Route>
            <Route exact path="/registration" element={<Registration/>} />

          </Routes>
          
        </header>
      </div>
    );
  }
}

 
export default App;
