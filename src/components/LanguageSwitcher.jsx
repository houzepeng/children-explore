import React from 'react';
import { FaGlobe } from 'react-icons/fa';

const LanguageSwitcher = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="language-switcher">
      <button 
        className="lang-switch-btn"
        onClick={() => onLanguageChange(currentLanguage === 'en' ? 'zh' : 'en')}
        aria-label={`Switch to ${currentLanguage === 'en' ? 'Chinese' : 'English'}`}
      >
        <FaGlobe />
        <span>{currentLanguage === 'en' ? '中文' : 'English'}</span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;