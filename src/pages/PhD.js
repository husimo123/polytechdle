/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, Suspense, useDeferredValue } from "react";
import { Link } from "react-router-dom";
import SearchResults from "../components/SearchResults.js";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PhD() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  const lastProfessor = "Nom du Professeur"; // Remplace par une variable dynamique si nécessaire

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

        {/* Saisie du nom du professeur avec autocomplétion */}
        <div className="box">
          <form>
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
                    />
                  </td>
                  <td className="text-input">
                    <button type="submit">Deviner</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>

          {/* Affichage des résultats de la recherche */}
          <Suspense fallback={<h2>Chargement...</h2>}>
            <div style={{ opacity: isStale ? 0.5 : 1 }}>
              <SearchResults query={deferredQuery} />
            </div>
          </Suspense>
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
