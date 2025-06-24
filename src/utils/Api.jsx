import axios from 'axios';

// Base URL pour tes requêtes API (ajuste-le selon ton backend)
const API_URL = 'http://localhost:3001/api'; // Change en fonction de ton backend

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Timeout pour les requêtes (10 secondes)
});

// Fonction pour récupérer les utilisateurs (par exemple, pour la validation du login)
export const getUserByUsername = async (username) => {
  try {
    const response = await api.get(`/users?username=${username}`); // Adapter l'API pour ce genre de requêtes
    return response.data; // Retourne les données récupérées
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// Fonction pour authentifier un utilisateur
export const authenticateUser = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password }); // Adapte cette route en fonction de ton backend
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export default api;