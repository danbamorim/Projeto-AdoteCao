import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'


/* importando context */
import { UserProvider } from './context/UserContext'

// importando paginas 
import Home from './components/pages/Home'
import Login from './components/pages/auth/Login'
import Register from './components/pages/auth/Register'
import Profile from './components/pages/User/Profile'
import Pets from './components/pages/Pet/MyPets'

// importando componentes 
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container'
import  Message  from './components/layout/Message'
import MyPets from './components/pages/Pet/MyPets'
import AddPet from './components/pages/Pet/AddPet'


function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar/>
        <Message/>
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/pet/mypets" element={<MyPets />} />
            <Route path="/pet/add" element={<AddPet />} />
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