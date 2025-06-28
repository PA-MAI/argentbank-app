import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../styles/css/accueil.css';

function User() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);
   // État pour afficher ou non le formulaire d’édition
   const [editMode, setEditMode] = useState(false);

  
  // Si l'utilisateur n'est pas connecté, on le redirige vers la page d'accueil
  useEffect(() => {
    if (!user || !user.token) {
      console.warn('Redirection sécurisée car user est null');
      navigate('/');
    }
  }, [user, navigate]);
  
 // Champs contrôlés pour les inputs (préremplis avec les infos actuelles)
 const [firstName, setFirstName] = useState(user?.firstName || '');
 const [lastName, setLastName] = useState(user?.lastName || '');
  

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back<br />
          {user ? `${firstName} ${lastName}` : ''}
        </h1>

        {/* Bouton pour activer le mode édition */}
        <button className="edit-button" onClick={() => setEditMode(!editMode)}>
          Edit Name
        </button>

        {/* Bloc de modification (sans action de mise à jour) */}
        {editMode && (
          <div className="edit-name-form">
            <input
              type="text"
              value={user ? user.firstName : ''}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="edit-name-input"
            />
            <input
              type="text"
              value={user ? user.lastName : ''}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="edit-name-input"
            />
            <button className="edit-button" disabled>
              Modifier
            </button>
          </div>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>

      {/* Comptes simulés */}
      {[
        {
          title: 'Argent Bank Checking (x8349)',
          amount: '$2,082.79',
          description: 'Available Balance',
        },
        {
          title: 'Argent Bank Savings (x6712)',
          amount: '$10,928.42',
          description: 'Available Balance',
        },
        {
          title: 'Argent Bank Credit Card (x8349)',
          amount: '$184.30',
          description: 'Current Balance',
        },
      ].map((account, index) => (
        <section className="account" key={index}>
          <div className="account-content-wrapper">
            <h3 className="account-title">{account.title}</h3>
            <p className="account-amount">{account.amount}</p>
            <p className="account-amount-description">{account.description}</p>
          </div>
          
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
         
        </section>
      ))}
    </main>
  );
}

export default User;