import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import Signup from './components/Signup.jsx'
import VerifyOtp from './components/VerifyOtp.jsx'
import Login from './components/Login.jsx'
createRoot(document.getElementById('root')).render(
    <StrictMode >
<BrowserRouter>
<Routes>
    <Route path='/' element={<Signup/>}></Route>
    <Route path='/verify-otp' element={<VerifyOtp />} />
    <Route path='/login' element={<Login />} />
</Routes>
</BrowserRouter>
</StrictMode>

)
