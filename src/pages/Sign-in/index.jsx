import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, fetchUserProfile } from '../../utils/Auth'; 
import '../../styles/css/accueil.css';
import { useDispatch } from 'react-redux';

import { setUser } from '../../Redux/userSlice';



function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState(false);

  // Fonction appelée à la soumission du formulaire
  const handleLogin = async (e) => {
    e.preventDefault();
    if (rememberMe) {
      localStorage.setItem('rememberEmail', email);
      localStorage.setItem('rememberPassword', password);
    } else {
      localStorage.removeItem('rememberEmail');
      localStorage.removeItem('rememberPassword');
    }
    try {
      // Appel à la fonction loginUser de Auth.js
      const data = await loginUser({ email, password });
      const { token } = data.body;
  
      // On va chercher les infos de l'utilisateur après login
      const userDetails = await fetchUserProfile(token); 
  
      const user = {
        token,
        firstName: userDetails.body.firstName,
        lastName: userDetails.body.lastName,
      };
  
      dispatch(setUser(user));
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
  
      navigate('/User');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberEmail');
    const savedPassword = localStorage.getItem('rememberPassword');
    if (savedEmail) setEmail(savedEmail);
    if (savedPassword) setPassword(savedPassword);
  }, []);

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="input-remember">
          <input type="checkbox" id="remember-me" checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}/>
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">Sign In</button>
          {error && <div className="error-message">{error}</div>}
        </form>
      </section>
    </main>
  );
}

export default SignIn;