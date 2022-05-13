import { useState } from 'react'
import logo from './logo.svg'
import './scss/style.scss'
import { Outlet, Link } from 'react-router-dom';
import Login from './components/Login/';
import ListItems from './components/ListItems/';
import NavBar from './components/NavBar';

function App() {

  return (
    <div className="frame">
      <div className="frame__scroller">
        <NavBar />
        <div className="frame__content">
        <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App
