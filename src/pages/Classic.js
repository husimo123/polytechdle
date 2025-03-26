/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Classic() {
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
            <Link to="/classic" className="selected">
              <img src="/img/classic-button.png" alt="Classic" />
            </Link>
          </li>
          <li>
            <Link to="/photo">
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

        {/* Boîte contenant le jeu */}
        <div className="box">
          <div className="game-container">
            <h3>Quel professeur sera celui d'aujourd'hui ?</h3>
            <div className="Classic_Indices">
              <div className="Classic_Box">
                <img src="/img/icon-age.png" alt="Icône 1" />
                <p>Indice Âge</p>
                <div className="tooltip">Âge du Professeur</div>
              </div>
              <div className="Classic_Box">
                <img src="/img/icon-specialite.png" alt="Icône 2" />
                <p>Indice Spécialité</p>
                <div className="tooltip">
                  Spécialité à laquelle le professeur est affilié
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Tableau avec les informations supplémentaires */}
        <div className="classic-prof-info">
              <table>
                <thead>
                  <tr>
                    <th>Genre</th>
                    <th>Laris</th>
                    <th>Âge</th>
                    <th>Spécialité</th>
                    <th>Université d'études</th>
                    <th>Année PhD</th>
                    <th>Statut</th>
                    <th>Sujet Thèse</th>
                    <th>Photo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Genre Value</td>
                    <td>Laris Value</td>
                    <td>Age Value</td>
                    <td>Speciality Value</td>
                    <td>University Value</td>
                    <td>PhD Year Value</td>
                    <td>Status Value</td>
                    <td>Thesis Subject Value</td>
                    <td>
                      <img src="/img/professor-photo.jpg" alt="Professor" width="100" />
                    </td>
                  </tr>
                </tbody>
              </table>
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
        
      </main>

      <Footer />
    </div>
  );
}

export default Classic;
