import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import CreateCandidate from './CreateCandidate';
import SearchCandidate from './SearchCandidate';

const App = () => {
  const [currentComponent, setCurrentComponent] = useState('search');

  const handleLinkClick = (component) => {
    setCurrentComponent(component);
  };

  return (
    <div>
      <nav>
        <a href="#" onClick={() => handleLinkClick('create')}> Cadastrar </a>
        <a href="#" onClick={() => handleLinkClick('search')}> Buscar </a>
      </nav>
      
      {currentComponent === 'search' && <SearchCandidate />}
      {currentComponent === 'create' && <CreateCandidate />}
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);

