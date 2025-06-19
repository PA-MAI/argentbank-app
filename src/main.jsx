import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import './styles/css/accueil.css'
//import App from './App.jsx'
import Accueil from './pages/Accueil'
import Header from './components/Header'
import Footer from './components/Footer'
import SignIn from './pages/Sign-in'
import User from './pages/User'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
        <Routes> 
          <Route path="/" element={<Accueil />} />
          <Route path="/Sign-in" element={<SignIn />} />
          <Route path="/User" element={<User/>} />
        </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
