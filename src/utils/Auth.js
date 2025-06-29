

// Ce fichier regroupe les appels liés à l'authentification (login, profil et l'update du profil).
// Il utilise l'instance axios centralisée de `Api.jsx`.

import api from '../utils/Api';// axios.create()

export const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post('/user/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

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
/**
 * Fonction pour mettre à jour les informations de profil utilisateur
 * @param {string} token - Le token d'authentification (peut être optionnel ici grâce à l'intercepteur)
 * @param {string} firstName - Nouveau prénom
 * @param {string} lastName - Nouveau nom
 * @returns {Object} - Données mises à jour
 */
export const updateUserProfile = async (newData) => {
  try {
    // Grâce à l’intercepteur, pas besoin de passer manuellement le token ici
    const response = await api.put('/user/profile', newData);
    return response.data.body;
  } catch (error) {
    console.error('Échec de la mise à jour du profil', error);
    throw error.response?.data || { message: 'Profile update failed' };
  }
};