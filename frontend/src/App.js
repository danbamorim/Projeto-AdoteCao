import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import React from 'react'

// importando paginas 
import Home from './components/pages/Home'
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element = {<Login />}/>
        <Route path="/register" element = {<Register />}/>
        <Route path="/" element = {<Login />}/>
        </Routes>
    </Router>
  )
}

export default App;
// switch virou Routes