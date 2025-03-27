import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour la popup
  const [timeRemaining, setTimeRemaining] = useState(''); // État pour le temps restant de la journée
  const { language, toggleLanguage } = useLanguage(); // Utilisation du contexte de la langue

  // Fonction pour ouvrir la popup
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fonction pour fermer la popup
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Fonction pour calculer le temps restant de la journée
  const calculateTimeRemaining = () => {
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999); // Fixer la fin de la journée à 23h59:59

    const timeDiff = endOfDay - now; // Différence entre la fin de la journée et l'heure actuelle
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    // Formatage du temps restant en "HH:MM:SS"
    return `${hours} heures, ${minutes} minutes, ${seconds} secondes`;
  };

  // Mettre à jour l'heure restante toutes les secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000); // Actualiser toutes les secondes

    return () => clearInterval(interval); // Nettoyage du setInterval lorsqu'on quitte la page
  }, []); // Le tableau vide [] garantit que le setInterval n'est appelé qu'une seule fois au démarrage

  // Texte de la popup en fonction de la langue
  const modalText = language === 'fr' ?
    `Dans ce jeu, tu as trois modes : Classic, PhD et Photo.
     Dans chacun d'eux, tu devras deviner un professeur de polytech.
     .\nTemps restant aujourd'hui : \n${timeRemaining}` :
    `In this game, you have three modes: Classic, PhD, and Photo.
     In each of them, you will have to guess a professor from polytech.
     .\nTime remaining today: \n${timeRemaining}`;

  return (
    <header>
      <div className="header-content">
        <div className="logo-container left">
          <img
            src="/img/gear.svg"
            alt="Logo Engrenage"
            className="logo-gear"
            onClick={openModal} // Ouvre la popup quand on clique
          />
        </div>
        <div className="logo-container center">
          <Link to="/">
            <img src="/img/polytech-angers-logo-modif.png" alt="Polytech Angers" className="logo-polytech" />
          </Link>
        </div>
        <div className="language-selector right">
          <img
            src={language === 'fr' ? "/img/france.png" : "/img/royaume-uni.png"}
            alt={language === 'fr' ? "Drapeau France" : "Drapeau UK"}
            className="flag"
            onClick={toggleLanguage} // Change la langue quand on clique
          />
        </div>
      </div>

      {/* Popup modale */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>X</button>
            <h2>{language === 'fr' ? 'Bienvenue dans polytechdle !' : 'Welcome to polytechdle!'}</h2>
            <textarea
              className="text-box"
              value={modalText}
            />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
