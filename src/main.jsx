import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import './styles/css/accueil.css'
import Accueil from './pages/Accueil'
import Header from './components/Header'
import Footer from './components/Footer'
import SignIn from './pages/Sign-in'
import User from './pages/User'

import { store } from './Redux/store'
import { Provider } from 'react-redux'
import PrivateRoute from './utils/PrivateRoute';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Header />
        <Routes> 
          <Route path="/" element={<Accueil />} />
          <Route path="/Login" element={<SignIn />} />
          <Route path="/User" element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
          />
        </Routes>
      <Footer />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
