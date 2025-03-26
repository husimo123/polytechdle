import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Photo() {
  const [guess, setGuess] = useState("");
  const [blurMode, setBlurMode] = useState(false);
  const [colorMode, setColorMode] = useState(false);
  const lastProfessor = "Nom du Professeur"; // À remplacer dynamiquement

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Deviner :", guess);
    // Ajoute ici la logique de vérification
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
            <Link to="/photo" className="selected">
              <img src="/img/photo-button.png" alt="Photo" />
            </Link>
          </li>
          <li>
            <Link to="/phd">
              <img src="/img/phd-button.png" alt="PhD" />
            </Link>
          </li>
        </ul>
      </nav>

      <main>
        <div id="subtitle">
          <span>Devine le Professeur de Polytech Angers</span>
        </div>

        {/* Jeu */}
        <div className="game-container">
          <div className="box">
            <h3>Quel professeur de Polytech figure sur la photo suivante ?</h3>
            <br />
            <img
              src="https://perso-laris.univ-angers.fr/~lhommeau/photo2.jpg"
              alt="Photo prof"
              width="200"
              height="200"
              style={{
                filter: blurMode ? "blur(10px)" : "none",
                WebkitFilter: blurMode ? "blur(10px)" : "none",
              }}
            />
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
                      <label>Chaque essai réduit le flou</label>
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
                      <label>Afficher les couleurs</label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Saisie du nom du professeur */}
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
                      value={guess}
                      onChange={(e) => setGuess(e.target.value)}
                    />
                  </td>
                  <td className="text-input">
                    <button type="submit">Deviner</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>

        {/* Affichage du dernier professeur à deviner */}
        <div>
          <h3>Le professeur d'hier était : {lastProfessor}</h3>
        </div>

        {/* Section promotionnelle */}
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

export default Photo;
