/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, Suspense, useDeferredValue } from "react";
import { Link } from "react-router-dom";
import SearchResults from "../components/SearchResults.js";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Classic() {
  const [query, setQuery] = useState("");
  const [selectedProfessors, setSelectedProfessors] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  const correctProfessor = "Nom du Professeur Correct"; // Replace with the actual correct professor's name or ID
  const lastProfessor = "Nom du Professeur"; // Replace with dynamic variable if needed

  const handleProfessorSelect = (professor) => {
    setSelectedProfessors((prevSelected) => [...prevSelected, professor]);
    setIsCorrect(professor.nom === correctProfessor); // Adjust the comparison as needed
  };

  const getExcludedProfessorsQuery = () => {
    const excludedIds = selectedProfessors.map(prof => prof.id).join(',');
    return excludedIds ? `&exclude=${excludedIds}` : '';
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
          <span>Devine le Professeur de Polytech Angers</span>
        </div>

        {/* Game box */}
        <div className="box">
          <div className="game-container">
            <h3>Quel professeur sera celui d'aujourd'hui ?</h3>
            <div className="Indices">
              <div className="Box_Indice">
                <img src="/img/icon-statut.png" alt="Icône 1" />
                <p>Indice du Statut</p>
                <div className="tooltip">Statut professionel du Professeur</div>
              </div>
              <div className="Box_Indice">
                <img src="/img/icon-these.png" alt="Icône 2" />
                <p>Indice du Sujet de Thèse</p>
                <div className="tooltip">
                  Nom du sujet de Thèse du Professeur
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table with additional information */}
        <div className="classic-prof-info">
          <table>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Genre</th>
                <th>Laris</th>
                <th>Âge</th>
                <th>Spécialité</th>
                <th>Université d'études</th>
                <th>Année PhD</th>
              </tr>
            </thead>
            <tbody>
              {selectedProfessors.map((professor, index) => (
                <tr key={index}>
                  <td>
                    <img src={professor.photo} alt="Professor" width="100" />
                  </td>
                  <td>{professor.genre}</td>
                  <td>{professor.laris}</td>
                  <td>{professor.age}</td>
                  <td>{professor.specialite}</td>
                  <td>{professor.universite}</td>
                  <td>{professor.anneePhd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Professor name input with autocomplete */}
        <div className="box">
          <form onSubmit={(e) => e.preventDefault()}>
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

          {/* Display search results */}
          <Suspense fallback={<h2>Chargement...</h2>}>
            <div style={{ opacity: isStale ? 0.5 : 1 }}>
              <SearchResults
                query={`${deferredQuery}${getExcludedProfessorsQuery()}`}
                onSelect={handleProfessorSelect}
              />
            </div>
          </Suspense>

          {/* Display correctness indicator */}
          {isCorrect !== null && (
            <div style={{ color: isCorrect ? 'green' : 'red' }}>
              {isCorrect ? 'Correct !' : 'Faux, essayez encore !'}
            </div>
          )}
        </div>

        {/* Display the last professor to guess */}
        <div>
          <h3>Le professeur d'hier était : {lastProfessor}</h3>
        </div>

        {/* Display previously selected professors */}
        <div>
          <h3>Professeurs déjà essayés :</h3>
          <ul>
            {selectedProfessors.map((professor, index) => (
              <li key={index}>
                {professor.prenom} {professor.nom}
              </li>
            ))}
          </ul>
        </div>

        {/* Promotional section */}
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
