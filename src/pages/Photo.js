/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState, Suspense, useDeferredValue } from "react";
import { Link } from "react-router-dom";
import SearchResults from "../components/SearchResults.js";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Professeur from "../components/Professeur.js";

function Photo() {
  // Appel a la base
  const [query, setQuery] = useState("");
  const [attempts, setAttempts] = useState([]);
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  const lastProfessor = "Professor's Name"; // À remplacer dynamiquement
  const [professeur, setProfesseur] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  
  // Gestion des données de la page
  const [blurMode, setBlurMode] = useState(false); // Blur image avec chaque guess
  const [colorMode, setColorMode] = useState(false); // colorimétrie de l'image
  const [blur, setBlurimg] = useState(true); // Blur image 
  // Get data from the database
  useEffect(() => {
    fetch('http://localhost:5000/professeur-du-jour')
       .then(response => response.json())
       .then(data => setProfesseur(data))
       .catch(error => console.error('Erreur:', error));
  }, []);

  // Gestiond du bouton deviner
  const handleSelect = (prof) => {
    if (gameOver || attempts.some((attempt) => attempt.nom === prof.nom)) return;
    
    const isCorrect = prof.nom.toLowerCase() === professeur.nom.toLowerCase();
    const newAttempt = new Professeur(
      prof.nom, prof.prenom, prof.genre, prof.laris, prof.age, prof.specialite, 
      prof.univ_etudes, prof.annee_phd, prof.statut, prof.sujet_these, prof.photo, isCorrect
    );
    
    setAttempts((prevAttempts) => [newAttempt, ...prevAttempts]);
    if (isCorrect) {
      setGameOver(true);
      ///////////////////////////////////////////////////////
      setBlurimg(false);
      // Il faut trouver autre chose ici pour montrer l'image en claire quand on a trouvé le bon prof
      ///////////////////////////////////////////////////////
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim() || gameOver) return;
    console.log(attempts.length);
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
            <Link to="/phd">
              <img src="/img/phd-button.png" alt="PhD" />
            </Link>
          </li>
          <li>
            <Link to="/photo" className="selected">
              <img src="/img/photo-button.png" alt="Photo" />
            </Link>
          </li>
        </ul>
      </nav>

      <main>
        <div id="subtitle">
          <span>Guess the Professor from Polytech Angers</span> {/* Changer le texte ici */}
        </div>

        {/* Jeu */}
        <div className="box">
          <div className="game-container">
            <h3>Which Polytech professor is in the following photo?</h3> {/* Changer le texte ici */}
            <br />
            {/* Vérification que l'objet professeur n'est pas vide pour éviter le crash de la page */}
            {professeur ? (
            <img
              src={professeur.photo}
              alt="Professor photo"
              width="200"
              height="200"
              style={ // Blur the image and color considering the choice of the user.
                !blur ? { // if the game is won : Clear filters from image
                  filter: `grayscale(0%) blur(0px)`, 
                  WebkitFilter: `grayscale(0%) blur(0px)`, 
                 }:
                 blurMode && !colorMode ? {
                  filter: `grayscale(100%) blur(${Math.max(0, 15 - attempts.length)}px)`, // progressively reduce the blur on the image
                  WebkitFilter: `grayscale(100%) blur(${Math.max(15 - attempts.length)}px)`, 
                } :
                //Full blur and grey
                !blurMode && !colorMode ? {
                  filter: `grayscale(100%) blur(${15}px)`,
                  WebkitFilter: `grayscale(100%) blur(${15}px)`,
                }:
                // Adaptive blur and colors
                  blurMode && !colorMode ?
                {
                  filter: `blur(${Math.max(0, 15 - attempts.length)}px)`, // progressively reduce the blur on the image
                  WebkitFilter: `blur(${Math.max(15 - attempts.length)}px)`, 
                }:
                // Full blur and color
                {
                  filter: `blur(${15}px)`,
                  WebkitFilter: `blur(${15}px)`,
                }
              }
            />
          ) : ( // si l'objet est vide on affiche :
              <p>Loading Error...</p> 
            )}
            <br></br>
            <p>Number of attempts: {attempts.length}</p> {/* Traduction de "Nombre d'essais" */}
            {/* Options de jeu */}
            <div>
              <table id="button-choice">
                <tbody>
                  <tr>
                    <td>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={blurMode}
                          onChange={() => setBlurMode(!blurMode)}
                        />
                        <span className="slider round"></span>
                      </label>
                      <br />
                      <label>Each attempt reduces the blur</label> {/* Traduction de "Chaque essai réduit le flou" */}
                    </td>
                    <td>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={colorMode}
                          onChange={() => setColorMode(!colorMode)}
                        />
                        <span className="slider round"></span>
                      </label>
                      <br />
                      <label>Show colors</label> {/* Traduction de "Afficher les couleurs" */}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Saisie du nom du professeur avec autocomplétion */}
        <div className="box">
          <form onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td className="text-input">
                    <input
                      id="input"
                      type="text"
                      placeholder="Professor's name"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      disabled={gameOver}
                    />
                  </td>
                  <td className="text-input">
                    <button type="submit" disabled={gameOver}>Guess</button> {/* Traduction de "Deviner" */}
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <Suspense fallback={<h2>Loading...</h2>}> {/* Traduction de "Chargement..." */}
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

        {gameOver && <h3>Congratulations! You found the professor of the day: {professeur.prenom} {professeur.nom} 🎉</h3>} {/* Traduction de "Bravo ! Vous avez trouvé le professeur du jour" */}

        <div>
          <hr className="separator" />
          <h3>The professor from yesterday was: {lastProfessor}</h3> {/* Traduction de "Le professeur d'hier était" */}
        </div>

        {/* Section promotionnelle */}
        <div className="box">
          <h1>Want more?</h1> {/* Traduction de "Vous en voulez plus ?" */}
          <h2>Play our other games!</h2> {/* Traduction de "Jouez à nos autres jeux !" */}
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

export default Photo;
