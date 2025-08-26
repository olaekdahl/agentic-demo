import React from 'react';
import { WeatherData } from '../types';
import './WeatherDisplay.css';

interface WeatherDisplayProps {
  weather: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  const getWeatherIconUrl = (icon: string) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="weather-display">
      <div className="weather-header">
        <div className="location">
          <h3>{weather.city}, {weather.country}</h3>
          <p className="timestamp">Updated: {formatTime(weather.timestamp)}</p>
        </div>
        <div className="weather-icon">
          <img 
            src={getWeatherIconUrl(weather.icon)} 
            alt={weather.description}
            title={weather.description}
          />
        </div>
      </div>

      <div className="temperature-section">
        <div className="main-temp">
          <span className="temperature">{weather.temperature}°C</span>
          <span className="feels-like">Feels like {weather.feelsLike}°C</span>
        </div>
        <div className="description">
          {weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-grid">
          <div className="detail-item">
            <div className="detail-icon">💧</div>
            <div className="detail-content">
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{weather.humidity}%</span>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">💨</div>
            <div className="detail-content">
              <span className="detail-label">Wind Speed</span>
              <span className="detail-value">{weather.windSpeed} m/s</span>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">📊</div>
            <div className="detail-content">
              <span className="detail-label">Pressure</span>
              <span className="detail-value">{weather.pressure} hPa</span>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">👁️</div>
            <div className="detail-content">
              <span className="detail-label">Visibility</span>
              <span className="detail-value">{weather.visibility} km</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;