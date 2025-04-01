import React, { useState, useEffect, Suspense, useDeferredValue } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import SearchResults from "../components/SearchResults.js";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Classic() {
  const [query, setQuery] = useState("");
  const [selectedProfessors, setSelectedProfessors] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const deferredQuery = useDeferredValue(query);
  const [loading, setLoading] = useState(false);
  const { language } = useLanguage();

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

  // Simule le professeur à deviner aujourd'hui
  const correctProfessor = {
    nom: "Dupont",
    prenom: "Jean",
    genre: "Masculin",
    laris: 1,
    age: 45,
    specialite: "Informatique",
    univ_etudes: "Université de Nantes",
    annee_phd: 2005,
    statut: "Professeur",
    sujet_these: "Etude de systèmes à événements discrets dans l'algèbre (max,+)"
  };

  const lastProfessorName = "Nom du Professeur"; // À remplacer dynamiquement

  const handleProfessorSelect = (professor) => {
    setSelectedProfessors((prevSelected) => [...prevSelected, professor]);
  };

  useEffect(() => {
    if (selectedProfessors.length > 0) {
      const lastSelected = selectedProfessors[selectedProfessors.length - 1];
      setIsCorrect(lastSelected.nom === correctProfessor.nom);
    }
  }, [selectedProfessors]);

  const attempts = selectedProfessors.length;

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
              {attempts >= 4 && (
                <div className="Box_Indice">
                  <img src="/img/icon-statut.png" alt="Icone 1" />
                  <p>{statusHint}</p>
                  <div className="tooltip">{statusTooltip}</div>
                </div>
              )}
              {attempts >= 8 && (
                <div className="Box_Indice">
                  <img src="/img/icon-these.png" alt="Icone 2" />
                  <p>{thesisHint}</p>
                  <div className="tooltip">{thesisTooltip}</div>
                </div>
              )}
            </div>
          </div>
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
              {selectedProfessors.map((professor) => (
                <tr key={professor.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td>
                    <img src={professor.photo} alt="Professor" width="100" />
                  </td>
                  <td style={{ backgroundColor: professor.genre === correctProfessor.genre ? "green" : "red" }}>
                    {professor.genre}
                  </td>
                  <td style={{ backgroundColor: professor.laris === correctProfessor.laris ? "green" : "red" }}>
                    {professor.laris === 1 ? "Oui" : "Non"}
                  </td>
                  <td style={{ backgroundColor: professor.age === correctProfessor.age ? "green" : "red" }}>
                    {professor.age}
                  </td>
                  <td style={{ backgroundColor: professor.specialite === correctProfessor.specialite ? "green" : "red" }}>
                    {professor.specialite}
                  </td>
                  <td style={{ backgroundColor: professor.univ_etudes === correctProfessor.univ_etudes ? "green" : "red" }}>
                    {professor.univ_etudes}
                  </td>
                  <td style={{ backgroundColor: professor.annee_phd === correctProfessor.annee_phd ? "green" : "red" }}>
                    {professor.annee_phd}
                  </td>
                  <td style={{ backgroundColor: professor.statut === correctProfessor.statut ? "green" : "red" }}>
                    {professor.statut}
                  </td>
                  <td style={{ backgroundColor: professor.sujet_these === correctProfessor.sujet_these ? "green" : "red" }}>
                    {professor.sujet_these}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="box">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => setLoading(false), 500);
            }}
          >
            <input
              id="input"
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">{submit}</button>
          </form>

          <Suspense fallback={<h2>Chargement...</h2>}>
            <SearchResults query={deferredQuery} onSelect={handleProfessorSelect} selectedProfessors={selectedProfessors} />
          </Suspense>

          {isCorrect !== null && <div style={{ color: isCorrect ? "green" : "red", fontWeight: "bold" }}>{isCorrect ? correct : wrong}</div>}
        </div>

        <div>
          <h3>{lastProfessor} {lastProfessorName}</h3>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Classic;
