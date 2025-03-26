import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="header-content">
        <div className="logo-container left">
          <img src="/img/gear.svg" alt="Logo Engrenage" className="logo-gear" />
        </div>
        <div className="logo-container center">
          <Link to="/"><img src="/img/polytech-angers-logo-modif.png" alt="Polytech Angers" className="logo-polytech" /></Link>
        </div>
        <div className="language-selector right">
          <img src="/img/france.png" alt="Drapeau France" className="flag" />
        </div>
      </div>
    </header>
  );
}

export default Header;
