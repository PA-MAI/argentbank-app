import axios from 'axios';

/**
 * Configuration de l'instance Axios personnalisée.
 * centralisation de
 * - l'URL de base
 * - le timeout
 * - les headers par défaut
 */
const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Intercepteur de requêtes :
 * Il intercepte toutes les requêtes sortantes et ajoute automatiquement
 * le token d'authentification dans les headers si présent dans le localStorage.
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

