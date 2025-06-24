import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Pour la navigation après connexion
//import { authenticateUser } from '../../utils/Api';  // Import de la fonction API
import axios from 'axios';
import '../../styles/css/accueil.css';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Utilisé pour rediriger après connexion
  
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3001/api/v1/user/login', {
            email,
            password,
          });  

        
            const { token } = response.data.body;
            localStorage.setItem('token', token);
      
            console.log('Login successful:', token);
  
        // Redirige l'utilisateur vers la page de profil
        navigate('/User');  
      } catch (err) {
        setError(err.response?.data?.message || 'Login failed');
      }
    };
  
    return (
        <main className="main bg-dark">
        <section className="sign-in-content">
          <h1>Sign In</h1>
          <form onSubmit={handleLogin}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="sign-in-button">Sign In</button>
            {error && <div className="error-message">{error}</div>}
          </form>
        </section>
      </main>
    );
  }
  
  export default SignIn;