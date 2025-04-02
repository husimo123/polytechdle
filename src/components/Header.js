import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import Cookies from 'js-cookie'; // Importation de js-cookie
import { Line } from 'react-chartjs-2'; // Importation de Chart.js (tu peux utiliser d'autres librairies si nécessaire)
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Enregistrer les composants nécessaires dans ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour la popup
  const [timeRemaining, setTimeRemaining] = useState(''); // État pour le temps restant de la journée
  const { language, toggleLanguage } = useLanguage(); // Utilisation du contexte de la langue
  const location = useLocation(); // Utilisation de useLocation pour savoir où tu te trouves dans l'application

  const currentMode = location.pathname.split('/')[1]; // On récupère le mode depuis l'URL, ex: "/phd", "/classic", "/photo"

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

  // Fonction pour charger les statistiques du jeu depuis les cookies
  const loadStatistics = (mode) => {
    const stats = Cookies.get(`${mode}Stats`); // On charge les statistiques basées sur le mode actuel
    if (stats) {
      return JSON.parse(stats);
    } else {
      return {
        totalGames: 0,
        totalWins: 0,
        totalAttempts: 0,
        longestWinStreak: 0,
        currentWinStreak: 0,
        attemptsPerGame: [], // On stocke les essais pour chaque partie
        winDates: [] // On stocke les dates des victoires pour afficher un graphique
      };
    }
  };

  const stats = loadStatistics(currentMode); // Charge les statistiques en fonction du mode actuel

  // Texte de la popup en fonction de la langue
  const modalText = language === 'fr' ? 
    `Dans ce jeu, tu as trois modes : Classic, PhD et Photo.
     Dans chacun d'eux, tu devras deviner un professeur de polytech.
     .\nTemps restant aujourd'hui : \n${timeRemaining}` :
    `In this game, you have three modes: Classic, PhD, and Photo.
     In each of them, you will have to guess a professor from polytech.
     .\nTime remaining today: \n${timeRemaining}\n\n`;

  const statsText = language === 'fr' ? 
    `Statistiques du mode ${currentMode} :
    - Total de jeux : ${stats.totalGames}
    - Victoires : ${stats.totalWins}
    - Meilleure série de victoires : ${stats.longestWinStreak}
    - Série actuelle : ${stats.currentWinStreak}
    - Essais en moyenne : ${(stats.totalAttempts / stats.totalGames).toFixed(2)}` :
    `${currentMode} Statistics:
    - Total games: ${stats.totalGames}
    - Wins: ${stats.totalWins}
    - Longest win streak: ${stats.longestWinStreak}
    - Current win streak: ${stats.currentWinStreak}
    - Average attempts: ${(stats.totalAttempts / stats.totalGames).toFixed(2)}`;

  // Données pour le graphique
  const chartData = {
    labels: stats.winDates, // Dates des victoires
    datasets: [
      {
        label: 'Nombre d\'essais',
        data: stats.attemptsPerGame, // Nombre d'essais pour chaque jeu
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

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
            
            {/* Conteneur avec texte et graphique */}
            <div className="modal-text-container">
              <div className="modal-text-box">
                <pre>{modalText}</pre>
                <pre>{statsText}</pre>
              </div>

              <div className="chart-container">
                <h3>{language === 'fr' ? 'Graphique des essais' : 'Attempts Chart'}</h3>
                <div className="chart-wrapper" style={{ height: '200px', marginTop: '10px' }}>
                  <Line data={chartData} options={{ maintainAspectRatio: true, responsive: true }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
