import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import Start from "./pages/Start"
import UserSignup from './pages/UserSignup'
import UserProtectedWrapper from './components/UserProtectedWrapper'
import CaptainProtectedWrapper from './components/CaptainProtectedWrapper'
import CaptainHome from './pages/CaptainHome'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
import WaitingForDriver from './pages/WaitingForDriver'
import GoToPickup from './pages/GoToPickup'

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
          <Route path='/home' element={<UserProtectedWrapper> <Home /> </UserProtectedWrapper>} />
          <Route path='/waiting-for-driver' element={<UserProtectedWrapper> <WaitingForDriver /> </UserProtectedWrapper>} />
          <Route path='/riding' element={<UserProtectedWrapper> <Riding /> </UserProtectedWrapper>} />

          <Route path='/captain-home' element={<CaptainProtectedWrapper><CaptainHome /></CaptainProtectedWrapper>} />
          <Route path='/going-to-pickup' element={<CaptainProtectedWrapper><GoToPickup /></CaptainProtectedWrapper>} />
          <Route path='/captain-riding' element={<CaptainProtectedWrapper> <CaptainRiding /> </CaptainProtectedWrapper>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
