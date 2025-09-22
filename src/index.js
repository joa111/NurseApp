// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
// Using new modular CSS system via styles/main.css imported in App.js
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
