import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import Login from './components/pages/login';
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
              

          </Routes>
          
        </header>
      </div>
    );
  }
}

 
export default App;
