import React, { useState, useEffect, Suspense, useDeferredValue } from "react";
import { Link } from "react-router-dom";
import SearchResults from "../components/SearchResults.js";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Classic() {
  const [query, setQuery] = useState("");
  const [selectedProfessors, setSelectedProfessors] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const deferredQuery = useDeferredValue(query);
  const [loading, setLoading] = useState(false);

  // Simule le professeur à deviner aujourd'hui (remplacer par une source dynamique)
  const correctProfessor = {
    nom: "Dupont",
    prenom: "Jean",
    genre: "Homme",
    laris: "Oui",
    age: 45,
    specialite: "Informatique",
    univ_etudes: "Université de Nantes",
    annee_phd: 2005,
  };

  const lastProfessor = "Nom du Professeur"; // À remplacer dynamiquement

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
          <span>Devine le Professeur de Polytech Angers</span>
        </div>

        <div className="box">
          <div className="game-container">
            <h3>Quel professeur sera celui d'aujourd'hui ?</h3>
            <div className="Indices">
              {attempts >= 4 && (
                <div className="Box_Indice">
                  <img src="/img/icon-statut.png" alt="Icône 1" />
                  <p>Indice du Statut</p>
                  <div className="tooltip">Statut professionnel du Professeur</div>
                </div>
              )}
              {attempts >= 8 && (
                <div className="Box_Indice">
                  <img src="/img/icon-these.png" alt="Icône 2" />
                  <p>Indice du Sujet de Thèse</p>
                  <div className="tooltip">Nom du sujet de Thèse du Professeur</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="classic-prof-info">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
              {selectedProfessors.map((professor) => (
                <tr key={professor.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td>
                    <img src={professor.photo} alt="Professor" width="100" />
                  </td>
                  <td style={{ backgroundColor: professor.genre === correctProfessor.genre ? "green" : "red" }}>{professor.genre}</td>
                  <td style={{ backgroundColor: professor.laris === correctProfessor.laris ? "green" : "red" }}>{professor.laris}</td>
                  <td style={{ backgroundColor: professor.age === correctProfessor.age ? "green" : "red" }}>{professor.age}</td>
                  <td style={{ backgroundColor: professor.specialite === correctProfessor.specialite ? "green" : "red" }}>{professor.specialite}</td>
                  <td style={{ backgroundColor: professor.univ_etudes === correctProfessor.univ_etudes ? "green" : "red" }}>{professor.univ_etudes}</td>
                  <td style={{ backgroundColor: professor.annee_phd === correctProfessor.annee_phd ? "green" : "red" }}>{professor.annee_phd}</td>
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

          <Suspense fallback={<h2>Chargement...</h2>}>
            <div style={{ opacity: loading ? 0.5 : 1 }}>
              <SearchResults
                query={deferredQuery}
                onSelect={handleProfessorSelect}
                selectedProfessors={selectedProfessors}
              />
            </div>
          </Suspense>

          {isCorrect !== null && (
            <div style={{ color: isCorrect ? 'green' : 'red', fontWeight: 'bold' }}>
              {isCorrect ? '✅ Correct !' : '❌ Faux, essayez encore !'}
            </div>
          )}
        </div>

        <div>
          <h3>Le professeur d'hier était : {lastProfessor}</h3>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Classic;
