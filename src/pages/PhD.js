/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, Suspense, useDeferredValue } from "react";
import { Link } from "react-router-dom";
import SearchResults from "../components/SearchResults.js";
import Header from "../components/Header";
import Footer from "../components/Footer";

class Professeur {
  constructor(prenom, nom, photo, isCorrect = false) {
    this.prenom = prenom;
    this.nom = nom;
    this.photo = photo;
    this.isCorrect = isCorrect;
  }
}

function PhD() {
  const [query, setQuery] = useState("");
  const [attempts, setAttempts] = useState([]);
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  const ProfesseurADeviner = "Lhommeau";
  const lastProfessor = "Nom du Professeur";
  const [gameOver, setGameOver] = useState(false);

  const handleSelect = (prof) => {
    if (gameOver || attempts.some((attempt) => attempt.nom === prof.nom)) return;
    
    const isCorrect = prof.nom.toLowerCase() === ProfesseurADeviner.toLowerCase();
    const newAttempt = new Professeur(prof.prenom, prof.nom, prof.photo, isCorrect);
    
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
          <span>Devine le Professeur de Polytech Angers</span>
        </div>

        <div className="box">
          <div className="game-container">
            <h3>Quel professeur a obtenu son diplôme PhD cette année ?</h3>
            <div className="PhD_Année">2003</div>
            <div className="Indices">
              <div className="Box_Indice">
                <img src="/img/icon-age.png" alt="Icône 1" />
                <p>Indice Âge</p>
                <div className="tooltip">Âge du Professeur</div>
              </div>
              <div className="Box_Indice">
                <img src="/img/icon-specialite.png" alt="Icône 2" />
                <p>Indice Spécialité</p>
                <div className="tooltip">Spécialité à laquelle le professeur est affilié</div>
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

        {gameOver && <h3>Bravo ! Vous avez trouvé le professeur du jour : {ProfesseurADeviner} 🎉</h3>}

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

export default PhD;