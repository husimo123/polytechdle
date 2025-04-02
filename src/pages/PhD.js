/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState, Suspense, useDeferredValue } from "react";
import { Link } from "react-router-dom";
import SearchResults from "../components/SearchResults.js";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Professeur from "../components/Professeur.js";
import { useLanguage } from "../LanguageContext";
import Cookies from 'js-cookie'; // Importation de js-cookie
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function PhD() {
  const [query, setQuery] = useState("");
  const [attempts, setAttempts] = useState([]);
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  const [professeur, setProfesseur] = useState(null);
  const lastProfessor = "Nom du Professeur";
  const [gameOver, setGameOver] = useState(false);
  const { language } = useLanguage();

  // Charger les statistiques depuis les cookies
  const loadStatistics = () => {
    const stats = Cookies.get('phdStats');
    if (stats) {
      return JSON.parse(stats);
    } else {
      return {
        totalGames: 0,
        totalWins: 0,
        totalAttempts: 0,
        longestWinStreak: 0,
        currentWinStreak: 0,
        games: []
      };
    }
  };

  // Sauvegarder les statistiques dans les cookies
  const saveStatistics = (stats) => {
    Cookies.set('phdStats', JSON.stringify(stats), { expires: 365 });
  };

  // Initialiser les statistiques
  const [stats, setStats] = useState(loadStatistics);

  // Fonction de mise à jour après une partie
  const updateStatistics = (isCorrect) => {
    let newStats = { ...stats };
    newStats.totalGames++;

    if (isCorrect) {
      newStats.totalWins++;
      newStats.currentWinStreak++;
      if (newStats.currentWinStreak > newStats.longestWinStreak) {
        newStats.longestWinStreak = newStats.currentWinStreak;
      }
    } else {
      newStats.currentWinStreak = 0;
    }

    newStats.totalAttempts += attempts.length;
    newStats.games.push({
      date: new Date().toISOString(),
      attempts: attempts.length,
      correct: isCorrect
    });

    setStats(newStats);
    saveStatistics(newStats);
  };

  // Get data from the database
  useEffect(() => {
    fetch('http://localhost:5000/professeur-du-jour')
      .then(response => response.json())
      .then(data => setProfesseur(data))
      .catch(error => console.error('Erreur:', error));
  }, []);

  const handleSelect = (prof) => {
    if (gameOver || attempts.some((attempt) => attempt.nom === prof.nom)) return;

    const isCorrect = prof.nom.toLowerCase() === professeur.nom.toLowerCase();
    const newAttempt = new Professeur(
      prof.nom, prof.prenom, prof.genre, prof.laris, prof.age, prof.specialite,
      prof.univ_etudes, prof.annee_phd, prof.statut, prof.sujet_these, prof.photo, isCorrect
    );

    setAttempts((prevAttempts) => [newAttempt, ...prevAttempts]);
    if (isCorrect) setGameOver(true);
    updateStatistics(isCorrect);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim() || gameOver) return;
  };

  const texts = {
    fr: {
      subtitle: "Devine le Professeur de Polytech Angers",
      phdTitle: "Quel professeur a obtenu son diplôme PhD cette année ?",
      ageHint: "Indice Âge",
      specialtyHint: "Indice Spécialité",
      attemptsRemaining: "Dans {n} Essais",
      correctGuess: "Bravo ! Vous avez trouvé le professeur du jour :",
      lastProfessor: "Le professeur d'hier était :",
      placeholder: "Nom du professeur",
      submit: "Deviner",
    },
    en: {
      subtitle: "Guess the Professor from Polytech Angers",
      phdTitle: "Which professor earned their PhD this year?",
      ageHint: "Age Hint",
      specialtyHint: "Specialty Hint",
      attemptsRemaining: "In {n} attempts",
      correctGuess: "Congrats! You’ve found today’s professor:",
      lastProfessor: "Yesterday’s professor was:",
      placeholder: "Professor's name",
      submit: "Guess",
    },
  };

  const {
    subtitle,
    phdTitle,
    ageHint,
    specialtyHint,
    attemptsRemaining,
    correctGuess,
    lastProfessor: lastProfessorText,
    placeholder,
    submit,
  } = texts[language];

  // Graph data for attempts
  const graphData = {
    labels: stats.games.map(game => new Date(game.date).toLocaleDateString()), // Dates des parties
    datasets: [{
      label: 'Nombre d\'essais par partie',
      data: stats.games.map(game => game.attempts),
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
    }],
  };

  return (
    <div>
      <Header />
      <nav>
        <ul className="header-classic">
          <li>
            <Link to="/classic">
              <img src="/img/classic-button.png" alt="Classic" />
            </Link>
          </li>
          <li>
            <Link to="/phd" className="selected">
              <img src="/img/phd-button.png" alt="PhD" />
            </Link>
          </li>
          <li>
            <Link to="/photo">
              <img src="/img/photo-button.png" alt="Photo" />
            </Link>
          </li>
        </ul>
      </nav>

      <main>
        <div id="subtitle">
          <span>{subtitle}</span>
        </div>

        <div className="box">
          <div className="game-container">
            <h3>{phdTitle}</h3>
            <div className="PhD_Année">{professeur ? professeur.annee_phd : "Chargement..."}</div>
            <div className="Indices">
              <div className={`Box_Indice ${attempts.length < 3 ? "disabled" : ""}`}>
                <img src="/img/icon-age.png" alt="Icône 1" />
                <p>{ageHint}</p>
                {attempts.length < 3 && <p><span className="small-italic">{attemptsRemaining.replace("{n}", 3 - attempts.length)}</span></p>}
                {attempts.length >= 3 && <div className="tooltip">Âge du Professeur : {professeur.age}</div>}
              </div>
              <div className={`Box_Indice ${attempts.length < 6 ? "disabled" : ""}`}>
                <img src="/img/icon-specialite.png" alt="Icône 2" />
                <p>{specialtyHint}</p>
                {attempts.length < 6 && <p><span className="small-italic">{attemptsRemaining.replace("{n}", 6 - attempts.length)}</span></p>}
                {attempts.length >= 6 && <div className="tooltip">Spécialité : {professeur.specialite}</div>}
              </div>
            </div>
          </div>
        </div>

        <div className="box">
          <form onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td className="text-input">
                    <input
                      id="input"
                      type="text"
                      placeholder={placeholder}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      disabled={gameOver}
                    />
                  </td>
                  <td className="text-input">
                    <button type="submit" disabled={gameOver}>{submit}</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <Suspense fallback={<h2>Chargement...</h2>}>
            <div style={{ opacity: isStale ? 0.5 : 1 }}>
              {!gameOver && <SearchResults query={deferredQuery} onSelect={handleSelect} exclude={attempts.map(a => a.nom)} />}
            </div>
          </Suspense>
        </div>

        <div className="attempt-container">
          <ul className="search-results">
            {attempts.map((attempt, index) => (
              <li
                key={index}
                className="search-item"
                style={{ backgroundColor: attempt.isCorrect ? "green" : "red" }}
              >
                <img src={attempt.photo} alt={`${attempt.prenom} ${attempt.nom}`} className="prof-photo" />
                <span>{attempt.prenom} {attempt.nom}</span>
              </li>
            ))}
          </ul>
        </div>

        {gameOver && <h3>{correctGuess} {professeur.prenom} {professeur.nom} 🎉</h3>}

        <div>
          <hr className="separator" />
          <h3>{lastProfessorText} {lastProfessor}</h3>
        </div>

        {/* Statistiques */}
        <div className="box">
          <h3>Statistiques</h3>
          <p>Total de jeux : {stats.totalGames}</p>
          <p>Victoires : {stats.totalWins}</p>
          <p>Meilleure série de victoires : {stats.longestWinStreak}</p>
          <p>Série actuelle : {stats.currentWinStreak}</p>
          <p>Essais en moyenne : {(stats.totalAttempts / stats.totalGames).toFixed(2)}</p>
          <div>
            <Line data={graphData} />
          </div>
        </div>

        <div className="box">
          <h1>Vous en voulez plus ?</h1>
          <h2>Jouez à nos autres jeux !</h2>
          <br />
          <div>
            <Link to="/etudiantdle" className="button-link">
              <div className="button-game">
                <img src="/img/etudiantdle.png" className="button-img" alt="Etudiantdle" />
              </div>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PhD;
