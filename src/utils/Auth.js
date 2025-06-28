

// Ce fichier regroupe les appels liés à l'authentification (login, profil).
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

export const updateUserProfile = async (token, newData) => {
  try {
    const response = await api.put('/user/profile', newData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Profile update failed' };
  }
};