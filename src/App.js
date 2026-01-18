import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/ui/Navigation';
import { GlobalStyles } from './styles/GlobalStyles';
import './styles/main.css';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import DashboardPage from './pages/DashboardPage';
import NurseProfileManagementPage from './pages/NurseProfileManagementPage';

function App() {
  return (
    <AuthProvider>
      <GlobalStyles />
      <Router>
        <div className="App">
          <Navigation />
          <main id="main-content" className="flex flex-col min-h-screen">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<NurseProfileManagementPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
