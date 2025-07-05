import React from 'react';
import { useSelector } from 'react-redux'; // Pour accéder à l'état Redux (user connecté ou non)
import { Navigate } from 'react-router-dom'; // Pour rediriger vers une autre page si l'utilisateur n'est pas autorisé

/**
 * Ce composant permet de protéger une route privée (ex : /User, /Transactions...)
 * Il vérifie si l'utilisateur est connecté via Redux (présence du token)
 * Si l'utilisateur n'est pas connecté, il est redirigé vers la page de connexion (/Login)
 * Sinon, la page enfant (children) est affichée normalement
 */
function PrivateRoute({ children }) {
  // Récupère les infos de l'utilisateur connecté depuis le state Redux
  const user = useSelector((state) => state.user.userInfo);

  // Si l'utilisateur n'est pas connecté ou s'il n'a pas de token : on bloque l'accès
  if (!user || !user.token) {
    console.warn(' Access denied: user not logged in');
    return <Navigate to="/" />; // Redirection automatique
  }

  // Si l'utilisateur est connecté : on autorise l'accès à la page demandée
  return children;
}

export default PrivateRoute;