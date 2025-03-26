/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
  const [professeur, setProfesseur] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/professeur-du-jour')
      .then(response => response.json())
      .then(data => setProfesseur(data))
      .catch(error => console.error('Erreur:', error));
  }, []);

  return (
    <div>
      <Header />
      <main>
        <div id="subtitle">
          <span>Devine le Professeur de Polytech Angers</span>
        </div>
        <div className="menu-container">
          <div className="buttons-container">
            <Link to="/classic" className="button-link">
              <div className="button-game">
                <img src="/img/classic-button.png" className="button-img" width="100%" />
                <div className="button-title">Classique</div>
                <div className="button-description">Des indices à chaque essai</div>
              </div>
            </Link>
            <Link to="/phd" className="button-link">
              <div className="button-game">
                <img src="/img/phd-button.png" className="button-img" width="100%" />
                <div className="button-title">PhD</div>
                <div className="button-description">Devinez avec l'année du PhD</div>
              </div>
            </Link>
            <Link to="/photo" className="button-link">
              <div className="button-game">
                <img src="/img/photo-button.png" className="button-img" width="100%" />
                <div className="button-title">Photo</div>
                <div className="button-description">Devinez avec une photo</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Affichage du professeur du jour */}
        <div className="prof-container">
          <h2>Professeur du Jour</h2>
          {professeur ? (
            <div className="prof-card">
              <h3>{professeur.prenom} {professeur.nom}</h3>
              <p>Spécialité : {professeur.specialite}</p>
              <p>Université : {professeur.univ_etudes}</p>
              <img src={professeur.photo} alt="Photo du professeur" className="prof-img" />
            </div>
          ) : (
            <p>Chargement...</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
