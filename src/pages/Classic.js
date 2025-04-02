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
      statusTooltip: "Statut: ",
      thesisHint: "Indice du Sujet de Thèse",
      thesisTooltip: "Sujet de thèse: ",
      correct: "Correct !",
      wrong: "Faux, essayez encore !",
      lastProfessor: "Le professeur d'hier était :",
      placeholder: "Nom du professeur",
      submit: "Deviner",
      attemptsText: "tentatives",
      tableHeaders: {
        photo: "Photo",
        genre: "Genre",
        laris: "Laris",
        age: "Âge",
        specialite: "Spécialité",
        univ_etudes: "Université d'études",
        annee_phd: "Année PhD",
        statut: "Statut",
        sujet_these: "Sujet thèse",
      },
    },
    en: {
      guessTitle: "Which professor is today’s?",
      statusHint: "Status Hint",
      statusTooltip: "Status: ",
      thesisHint: "Thesis Topic Hint",
      thesisTooltip: "Thesis Topic: ",
      correct: "Correct!",
      wrong: "Wrong, try again!",
      lastProfessor: "Yesterday’s professor was:",
      placeholder: "Professor's name",
      submit: "Guess",
      attemptsText: "attempts",
      tableHeaders: {
        photo: "Photo",
        genre: "Gender",
        laris: "Laris",
        age: "Age",
        specialite: "Specialty",
        univ_etudes: "University of Studies",
        annee_phd: "PhD Year",
        statut: "Status",
        sujet_these: "Thesis Topic",
      },
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
    attemptsText,
    tableHeaders,
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
                {attempts.length < 4 && <p><span className="small-italic">In {4 - attempts.length} {attemptsText}</span></p>}
                {attempts.length >= 4 && <div className="tooltip">{statusTooltip} {professeur.statut}</div>}
              </div>
              <div className={`Box_Indice ${attempts.length < 8 ? "disabled" : ""}`}>
                <img src="/img/icon-these.png" alt="Icone 2" />
                <p>{thesisHint}</p>
                {attempts.length < 8 && <p><span className="small-italic">In {8 - attempts.length} {attemptsText}</span></p>}
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
          <Suspense fallback={<h2>Loading...</h2>}>
            <div style={{ opacity: isStale ? 0.5 : 1 }}>
              {!gameOver && <SearchResults query={deferredQuery} onSelect={handleSelect} exclude={attempts.map(a => a.nom)} />}
            </div>
          </Suspense>
        </div>

        <div className="classic-prof-info">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>{tableHeaders.photo}</th>
                <th>{tableHeaders.genre}</th>
                <th>{tableHeaders.laris}</th>
                <th>{tableHeaders.age}</th>
                <th>{tableHeaders.specialite}</th>
                <th>{tableHeaders.univ_etudes}</th>
                <th>{tableHeaders.annee_phd}</th>
                <th>{tableHeaders.statut}</th>
                <th>{tableHeaders.sujet_these}</th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((professor, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                  <td>
                    <img src={professor.photo} alt="Professor" width="100" />
                  </td>
                  <td style={{ backgroundColor: professor.genre === professeur.genre ? "green" : "red" }}>
                    {professor.genre}
                  </td>
                  <td style={{ backgroundColor: professor.laris === professeur.laris ? "green" : "red" }}>
                    {professor.laris === 1 ? "Yes" : "No"}
                  </td>
                  <td style={{ backgroundColor: professor.age === professeur.age ? "green" : "red" }}>
                    { professor.age === professeur.age ? professor.age   
                    :professor.age < professeur.age ? professor.age + "↑" : professor.age + "↓" }
                  </td>
                  <td style={{ backgroundColor: professor.specialite === professeur.specialite ? "green" : "red" }}>
                    {professor.specialite}
                  </td>
                  <td style={{ backgroundColor: professor.univ_etudes === professeur.univ_etudes ? "green" : "red" }}>
                    {professor.univ_etudes}
                  </td>
                  <td style={{ backgroundColor: professor.annee_phd === professeur.annee_phd ? "green" : "red" }}>
                    { professor.annee_phd === professeur.annee_phd ? professor.annee_phd   
                    : professor.annee_phd < professeur.annee_phd ? professor.annee_phd + "↑" : professor.annee_phd + "↓" } 
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

        {gameOver && <h3>Congratulations! You guessed today’s professor: {professeur.prenom} {professeur.nom} 🎉</h3>}

        <div>
          <hr className="separator" />
          <h3>{lastProfessor}</h3>
        </div>

        <div className="box">
          <h1>Want more?</h1>
          <h2>Play our other games!</h2>
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
