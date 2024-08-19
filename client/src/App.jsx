import { useEffect, useState } from 'react';
import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import logo from './assets/icons8-yarn-80.png';

function App() {

  return (
    <>
    <div className="d-flex container-fluid bg-dark text-white">
      <div>
        <img className="logo m-2" src={logo} alt="yarn icon"/>
      </div>
      <h1 className="m-2 align-self-center">Use Your Stash</h1>
      <p className="m-2 ms-5 top-links align-self-center">yarn</p>
      <p className="m-2 ms-5 top-links align-self-center">patterns</p>
    </div>
    </>
  )
}

export default App