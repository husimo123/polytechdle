import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../LanguageContext';

function Home() {
  const [professeur, setProfesseur] = useState(null);
  const { language } = useLanguage();

  useEffect(() => {
    fetch('http://localhost:5000/professeur-du-jour')
      .then(response => response.json())
      .then(data => setProfesseur(data))
      .catch(error => console.error('Erreur:', error));
  }, []);

  const texts = {
    fr: {
      subtitle: 'Devine le Professeur de Polytech Angers',
      classic: 'Classique',
      classicDescription: 'Des indices à chaque essai',
      phd: 'PhD',
      phdDescription: 'Devinez avec l\'année du PhD',
      photo: 'Photo',
      photoDescription: 'Devinez avec une photo',
      profOfTheDay: 'Professeur du Jour',
      specialty: 'Spécialité',
      university: 'Université',
      loading: 'Chargement...',
    },
    en: {
      subtitle: 'Guess the Professor from Polytech Angers',
      classic: 'Classic',
      classicDescription: 'Clues with each attempt',
      phd: 'PhD',
      phdDescription: 'Guess with the year of the PhD',
      photo: 'Photo',
      photoDescription: 'Guess with a photo',
      profOfTheDay: 'Professor of the Day',
      specialty: 'Specialty',
      university: 'University',
      loading: 'Loading...',
    },
  };

  const {
    subtitle,
    classic,
    classicDescription,
    phd,
    phdDescription,
    photo,
    photoDescription,
    profOfTheDay,
    specialty,
    university,
    loading,
  } = texts[language];

  return (
    <div>
      <Header />
      <main>
        <div id="subtitle">
          <span>{subtitle}</span>
        </div>
        <div className="menu-container">
          <div className="buttons-container">
            <Link to="/classic" className="button-link">
              <div className="button-game">
                <img src="/img/classic-button.png" className="button-img" width="100%" />
                <div className="button-title">{classic}</div>
                <div className="button-description">{classicDescription}</div>
              </div>
            </Link>
            <Link to="/phd" className="button-link">
              <div className="button-game">
                <img src="/img/phd-button.png" className="button-img" width="100%" />
                <div className="button-title">{phd}</div>
                <div className="button-description">{phdDescription}</div>
              </div>
            </Link>
            <Link to="/photo" className="button-link">
              <div className="button-game">
                <img src="/img/photo-button.png" className="button-img" width="100%" />
                <div className="button-title">{photo}</div>
                <div className="button-description">{photoDescription}</div>
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
