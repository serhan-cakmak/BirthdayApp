import logo from './logo.svg';
import  { Component } from 'react';
import './App.css';
import Login from './pages/login';
import Registration from './pages/registration';
import Home from './pages/home';
import { Routes, Route , Link } from 'react-router-dom';




class App extends Component {
  state = { 
    
   };

  render() { 
    return (
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route exact path='/' element={<Login/>}></Route>
            <Route exact path="/register" element={<Registration/>}></Route>
            <Route path="/home/*" element={<Home/>}></Route>
          </Routes>
          
        </header>
      </div>
    );
  }
}

 
export default App;
