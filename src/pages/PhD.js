import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PhD() {
  const [guess, setGuess] = useState("");
  const lastProfessor = "Nom du Professeur"; // Remplace par une variable dynamique si nécessaire

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Deviner :", guess);
    // Ajoute ici la logique pour vérifier la réponse
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
            <Link to="/photo">
              <img src="/img/photo-button.png" alt="Photo" />
            </Link>
          </li>
          <li>
            <Link to="/phd" className="selected">
              <img src="/img/phd-button.png" alt="PhD" />
            </Link>
          </li>
        </ul>
      </nav>

      <main>
        <div id="subtitle">
          <span>Devine le Professeur de Polytech Angers</span>
        </div>

        {/* Boîte contenant le jeu */}
        <div className="box">
          <div className="game-container">
            <h3>Quel professeur a obtenu son diplôme PhD cette année ?</h3>
            <div className="PhD_Année">2022</div>
            <div className="PhD_Indices">
              <div className="PhD_Box">
                <img src="/img/icon-age.png" alt="Icône 1" />
                <p>Indice Âge</p>
                <div className="tooltip">Âge du Professeur</div>
              </div>
              <div className="PhD_Box">
                <img src="/img/icon-specialite.png" alt="Icône 2" />
                <p>Indice Spécialité</p>
                <div className="tooltip">
                  Spécialité à laquelle le professeur est affilié
                </div>
              </div>
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

export default PhD;
