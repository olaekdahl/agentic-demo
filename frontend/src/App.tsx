import React, { useEffect, useState } from 'react';
import { useAuthStore } from './store/authStore';
import AuthPage from './pages/AuthPage';
import WeatherPage from './pages/WeatherPage';
import './App.css';

function App() {
  const { isAuthenticated, checkAuth, isLoading } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      await checkAuth();
      setIsInitializing(false);
    };

    initializeAuth();
  }, []); // Remove checkAuth dependency to prevent re-runs

  const handleAuthSuccess = () => {
    // Authentication successful, the store will handle state update
  };

  if (isInitializing || isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="App">
      {isAuthenticated ? (
        <WeatherPage />
      ) : (
        <AuthPage onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  );
}

export default App;
