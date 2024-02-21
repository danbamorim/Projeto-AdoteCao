import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import Container from './components/layout/Container'


/* importando context */
import { UserProvider } from './context/UserContext'

// importando paginas 
import Home from './components/pages/Home'
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'


// importando componentes 
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'


function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar/>
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
        <Footer/>
      </UserProvider>
    </Router>
  )
}

export default App;
// switch virou Routes