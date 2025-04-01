import React from 'react';
import { useLanguage } from '../LanguageContext';

function Footer() {
  const { language } = useLanguage();

  const texts = {
    fr: {
      copyright: "&copy; 2025 SIMON Hugo & NAVET Titouan & HODE Dorian. Tous droits réservés.",
    },
    en: {
      copyright: "&copy; 2025 SIMON Hugo & NAVET Titouan & HODE Dorian. All rights reserved.",
    },
  };

  return (
    <footer>
      <p dangerouslySetInnerHTML={{ __html: texts[language].copyright }}></p>
    </footer>
  );
}

export default Footer;
