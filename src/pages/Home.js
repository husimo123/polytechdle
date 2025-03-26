import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
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
      </main>
      <Footer />
    </div>
  );
}

export default Home;
