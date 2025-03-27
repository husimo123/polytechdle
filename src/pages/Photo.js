/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {  useEffect, useState, Suspense, useDeferredValue  } from "react";
import { Link } from "react-router-dom";
import SearchResults from "../components/SearchResults.js";
import Header from "../components/Header";
import Footer from "../components/Footer";


function Photo() {
  // Appel a la base
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  const lastProfessor = "Nom du Professeur"; // À remplacer dynamiquement
  const [professeur, setProfesseur] = useState(null);

  // Gestion des données de la page
  const [guess, setGuess] = useState(""); // Guess de l'utilisateur
  const [blurMode, setBlurMode] = useState(true); // Blur image avec chaque guess
  const [blur, setBlurimg] = useState(true); // Blur image
  const [nb_tries, setnbTries] =  useState(0); // Nombre d'essais
  const [colorMode, setColorMode] = useState(true); // colorimétrie de l'image
  
  // Get data from the database
  useEffect(() => {
    fetch('http://localhost:5000/professeur-du-jour')
       .then(response => response.json())
       .then(data => setProfesseur(data))
       .catch(error => console.error('Erreur:', error));
  }, []);

  // Gestiond du bouton deviner
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Deviner :", guess);
    if(guess === "hugo"){
      setBlurimg(false);
    }
    
    setnbTries(nb_tries + 1);
    
    console.log("Nb tries : ", nb_tries);
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
          <span>Devine le Professeur de Polytech Angers</span>
        </div>

        {/* Jeu */}
        <div className="box">
          <div className="game-container">
            <h3>Quel professeur de Polytech figure sur la photo suivante ?</h3>
            <br />
            {/* Verification que l'objet professeur n'est pas vide pour eviter le crash de la page. */}
            {professeur ? (
            <img
              src={professeur.photo}
              alt="Photo prof"
              width="200"
              height="200"
              style={
               // Blur the image and color considering the choice of the user.
               // Adaptive blur and grey 
                blurMode && colorMode ? {
                  filter: `grayscale(100%) blur(${Math.max(0, 15 - nb_tries)}px)`, // progressively reduce the blur on the image
                  WebkitFilter: `grayscale(100%) blur(${Math.max(15 - nb_tries)}px)`, 
                } :
                //Full blur and grey
                !blurMode && colorMode ? {
                  filter: `grayscale(100%) blur(${15}px)`,
                  WebkitFilter: `grayscale(100%) blur(${15}px)`,
                }:
                // Adaptive blur and colors
                  blurMode && !colorMode ?
                {
                  filter: `blur(${Math.max(0, 15 - nb_tries)}px)`, // progressively reduce the blur on the image
                  WebkitFilter: `blur(${Math.max(15 - nb_tries)}px)`, 
                }:
                // Full blur and color
                {
                  filter: `blur(${15}px)`,
                  WebkitFilter: `blur(${15}px)`,
                }
              }
            />
          ) : ( // si l'objet est vide on affiche :
              <p>Erreur de chargement...</p>
            )}
            <br></br>
            <p>Nombre d'essais :{nb_tries}</p>
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

        {/* Saisie du nom du professeur avec autocomplétion */}
        <div className="box">
          <form onSubmit={(handleSubmit)}>
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
                    <button type="submit" >Deviner</button>
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

export default Photo;
