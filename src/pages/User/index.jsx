import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import '../../styles/css/accueil.css';
import { updateUserProfile } from '../../utils/Auth'; // Fonction API PUT vers /user/profile
import { updateUser } from '../../Redux/userSlice'; // Action Redux pour maj le store

function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);

   // État pour afficher ou non le formulaire 
   // État local des champs d'édition
   const [editMode, setEditMode] = useState(false);

  // Si utilisateur pas connecté, redirection vers la page d'accueil
  useEffect(() => {
    if (!user || !user.token) {
      console.warn('Safe redirection because user is null');
      navigate('/');
    }
  }, [user, navigate]);
  
 // Champs contrôlés pour les inputs (préremplis avec nom prenom)
 const [firstName, setFirstName] = useState(user?.firstName || '');
 const [lastName, setLastName] = useState(user?.lastName || '');
  
  
   // Fonction appelée au clic sur "Save"
   const handleSave = async () => {
    try {
      const updated = await updateUserProfile({ firstName, lastName });
      dispatch(updateUser(updated)); // Mise à jour du Redux Store
      setEditMode(false); //quitte le mode édition
    } catch (err) {
      console.warn(' Profile update failed', err);
    }
  };
  // Fonction pour annuler la modification
  const handleCancel = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEditMode(false);
  };

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

        {/* Bloc de modification */}
        {editMode && (
          <div className="edit-name-form">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="edit-name-input"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="edit-name-input"
            />
            <div>
              <button className="edit-button" onClick={handleSave}>
                Save
              </button>
              <button className="edit-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
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