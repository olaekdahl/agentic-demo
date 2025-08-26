import React from 'react';
import { useAuthStore } from '../store/authStore';
import './Header.css';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <h1>🌤️ Weather App</h1>
        </div>
        
        <nav className="header-nav">
          {isAuthenticated && user ? (
            <div className="header-user">
              <span className="welcome-text">
                Welcome, {user.username}!
              </span>
              <button 
                onClick={handleLogout}
                className="logout-btn"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="header-auth">
              <span>Please log in to view weather data</span>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;