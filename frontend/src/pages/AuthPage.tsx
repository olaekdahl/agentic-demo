import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import './AuthPage.css';

interface AuthPageProps {
  onAuthSuccess: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitchToRegister = () => setIsLogin(false);
  const handleSwitchToLogin = () => setIsLogin(true);

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        
        <div className="auth-content">
          <div className="auth-header">
            <h1>🌤️ Weather App</h1>
            <p>Get real-time weather forecasts for any city</p>
          </div>
          
          {isLogin ? (
            <LoginForm
              onSuccess={onAuthSuccess}
              onSwitchToRegister={handleSwitchToRegister}
            />
          ) : (
            <RegisterForm
              onSuccess={onAuthSuccess}
              onSwitchToLogin={handleSwitchToLogin}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;