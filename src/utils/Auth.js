

// Ce fichier regroupe les appels liés à l'authentification (login, profil et l'update du profil).
// Utilisation de l'instance axios centralisée de `Api.jsx`.

import api from '../utils/Api';// axios.create()
// fonction de gestion du login
export const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post('/user/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};
// fonction de gestion du token
export const fetchUserProfile = async (token) => {
  try {
    const response = await api.post('/user/profile', {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Profile fetch failed' };
  }
};

// Fonction pour mettre à jour les informations de profil utilisateur 
export const updateUserProfile = async (newData) => {
  try {
    // Grâce à l’intercepteur, pas besoin de passer manuellement le token 
    const response = await api.put('/user/profile', newData);
    return response.data.body;
  } catch (error) {
    console.error('Profile update failed', error);
    throw error.response?.data || { message: 'Profile update failed' };
  }
};