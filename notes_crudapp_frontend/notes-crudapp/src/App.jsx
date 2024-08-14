import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import  Modal  from 'react-modal'

Modal.setAppElement('#root');
function App() {
  

  return (
    <>
    <Router>
    <Routes>
      <Route path="/home/:userId"  element={<Home/>}/>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
    </Routes>
  </Router>
    </>
  )
}

export default App
