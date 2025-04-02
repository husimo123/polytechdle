/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState, Suspense, useDeferredValue } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import SearchResults from "../components/SearchResults.js";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Professeur from "../components/Professeur.js";

function Classic() {
  const [query, setQuery] = useState("");
  const [attempts, setAttempts] = useState([]);
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  const [professeur, setProfesseur] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const { language } = useLanguage();

  // Get data from the database
  useEffect(() => {
    fetch('http://localhost:5000/professeur-du-jour/classic')
        .then(response => response.json())
        .then(data => setProfesseur(data))
        .catch(error => console.error('Erreur:', error));
  }, []);

  const texts = {
    fr: {
      guessTitle: "Quel professeur sera celui d'aujourd'hui ?",
      statusHint: "Indice du Statut",
      statusTooltip: "Statut: Professeur",
      thesisHint: "Indice du Sujet de Thèse",
      thesisTooltip: "Sujet de thèse: Etude de systèmes à événements discrets",
      correct: "Correct !",
      wrong: "Faux, essayez encore !",
      lastProfessor: "Le professeur d'hier était :",
      placeholder: "Nom du professeur",
      submit: "Deviner",
    },
    en: {
      guessTitle: "Which professor is today’s?",
      statusHint: "Status Hint",
      statusTooltip: "Status: Professor",
      thesisHint: "Thesis Topic Hint",
      thesisTooltip: "Thesis Topic: Study of discrete event systems",
      correct: "Correct!",
      wrong: "Wrong, try again!",
      lastProfessor: "Yesterday’s professor was:",
      placeholder: "Professor's name",
      submit: "Guess",
    },
  };

  const {
    guessTitle,
    statusHint,
    statusTooltip,
    thesisHint,
    thesisTooltip,
    correct,
    wrong,
    lastProfessor,
    placeholder,
    submit,
  } = texts[language];

  const handleSelect = (prof) => {
    if (gameOver || attempts.some((attempt) => attempt.nom === prof.nom)) return;
    
    const isCorrect = prof.nom.toLowerCase() === professeur.nom.toLowerCase();
    const newAttempt = new Professeur(
      prof.nom, prof.prenom, prof.genre, prof.laris, prof.age, prof.specialite, 
      prof.univ_etudes, prof.annee_phd, prof.statut, prof.sujet_these, prof.photo, isCorrect
    );
    
    setAttempts((prevAttempts) => [newAttempt, ...prevAttempts]);
    if (isCorrect) setGameOver(true);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim() || gameOver) return;
  };

  return (
    <div>
      <Header />
      <nav>
        <ul className="header-classic">
          <li>
            <Link to="/classic" className="selected">
              <img src="/img/classic-button.png" alt="Classic" />
            </Link>
          </li>
          <li>
            <Link to="/phd">
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
          <span>{guessTitle}</span>
        </div>

        <div className="box">
          <div className="game-container">
            <h3>{guessTitle}</h3>
            <div className="Indices">
              <div className={`Box_Indice ${attempts.length < 4 ? "disabled" : ""}`}>
                <img src="/img/icon-statut.png" alt="Icone 1" />
                <p>{statusHint}</p>
                {attempts.length < 4 && <p><span className="small-italic">Dans  {4 - attempts.length} Essais</span></p>}
                {attempts.length >= 4 && <div className="tooltip">{statusTooltip} {professeur.statut}</div>}
              </div>
              <div className={`Box_Indice ${attempts.length < 8 ? "disabled" : ""}`}>
                <img src="/img/icon-these.png" alt="Icone 2" />
                <p>{thesisHint}</p>
                {attempts.length < 8 && <p><span className="small-italic">Dans  {8 - attempts.length} Essais</span></p>}
                {attempts.length >= 8 && <div className="tooltip">{thesisTooltip} {professeur.sujet_these}</div>}
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
                      placeholder="Nom du professeur"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      disabled={gameOver}
                    />
                  </td>
                  <td className="text-input">
                    <button type="submit" disabled={gameOver}>Deviner</button>
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

        <div className="classic-prof-info">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Genre</th>
                <th>Laris</th>
                <th>Âge</th>
                <th>Spécialité</th>
                <th>Université d'études</th>
                <th>Année PhD</th>
                <th>Statut</th>
                <th>Sujet thèse</th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((professor,index) => (
                <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                  <td>
                    <img src={professor.photo} alt="Professor" width="100" />
                  </td>
                  <td style={{ backgroundColor: professor.genre === professeur.genre ? "green" : "red" }}>
                    {professor.genre}
                  </td>
                  <td style={{ backgroundColor: professor.laris === professeur.laris ? "green" : "red" }}>
                    {professor.laris === 1 ? "Oui" : "Non"}
                  </td>
                  <td style={{ backgroundColor: professor.age === professeur.age ? "green" : "red" }}>
                    {professor.age}
                  </td>
                  <td style={{ backgroundColor: professor.specialite === professeur.specialite ? "green" : "red" }}>
                    {professor.specialite}
                  </td>
                  <td style={{ backgroundColor: professor.univ_etudes === professeur.univ_etudes ? "green" : "red" }}>
                    {professor.univ_etudes}
                  </td>
                  <td style={{ backgroundColor: professor.annee_phd === professeur.annee_phd ? "green" : "red" }}>
                    {professor.annee_phd}
                  </td>
                  <td style={{ backgroundColor: professor.statut === professeur.statut ? "green" : "red" }}>
                    {professor.statut}
                  </td>
                  <td style={{ backgroundColor: professor.sujet_these === professeur.sujet_these ? "green" : "red" }}>
                    {professor.sujet_these}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {gameOver && <h3>Bravo ! Vous avez trouvé le professeur du jour : {professeur.prenom} {professeur.nom} 🎉</h3>}

        <div>
          <hr className="separator" />
          <h3>Le professeur d'hier était : {lastProfessor}</h3>
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

export default Classic;
