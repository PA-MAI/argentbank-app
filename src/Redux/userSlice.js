
// Ce fichier contient le "slice" Redux pour la gestion de l'utilisateur connecté.
// Il gère :
// - la mise à jour des informations utilisateur après login
// - la déconnexion
// - la persistance via localStorage (remember me)

import { createSlice } from '@reduxjs/toolkit';


// Récupération des infos de l'utilisateur depuis localStorage si elles existent
const userInfoFromStorage = JSON.parse(localStorage.getItem('user')) || null;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: userInfoFromStorage, // { token, firstName, lastName }
  },
  reducers: {
    // Action pour enregistrer les infos utilisateur après login
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    // Action pour déconnecter l'utilisateur
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('user'); // Nettoyage du stockage
      localStorage.removeItem('token');
    },
    //Enregistrement de l'utilisateur dans le local storage pour le remember me
    updateUser: (state, action) => {
      if (state.userInfo) {
        state.userInfo.firstName = action.payload.firstName;
        state.userInfo.lastName = action.payload.lastName;
    
        // Mise à jour du localStorage 
        localStorage.setItem('user', JSON.stringify(state.userInfo));
      }
    },
  },
});




// Export des actions pour les utiliser ailleurs (ex: Header, SignIn)
export const { setUser, logout, updateUser } = userSlice.actions;

export default userSlice.reducer;
