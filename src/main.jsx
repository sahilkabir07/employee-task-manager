import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import { AuthProvider } from './context/AuthProvider.jsx';  // Import AuthProvider

createRoot(document.getElementById('root')).render(
  <Router> {/* Wrap the entire app in Router */}
    <AuthProvider> {/* Wrap the app with AuthProvider for authentication */}
      <App />
    </AuthProvider>
  </Router>
);
