import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import Start from "./pages/Start"
import UserSignup from './pages/UserSignup'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Start />} />
          <Route path='/signup' element={<UserSignup />} />
          <Route path='/login' element={<UserLogin />} />
          <Route path='/captain-signup' element={<CaptainSignup />} />
          <Route path='/captain-login' element={<CaptainLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
