import React from 'react';
import { useWeatherStore } from '../store/weatherStore';
import Header from '../components/Header';
import WeatherSearch from '../components/WeatherSearch';
import WeatherDisplay from '../components/WeatherDisplay';
import ForecastDisplay from '../components/ForecastDisplay';
import './WeatherPage.css';

const WeatherPage: React.FC = () => {
  const { currentWeather, forecast } = useWeatherStore();

  return (
    <div className="weather-page">
      <Header />
      
      <main className="weather-main">
        <div className="weather-container">
          <WeatherSearch />
          
          <div className="weather-results">
            {currentWeather && (
              <WeatherDisplay weather={currentWeather} />
            )}
            
            {forecast && (
              <ForecastDisplay forecast={forecast} />
            )}
            
            {!currentWeather && !forecast && (
              <div className="empty-state">
                <div className="empty-icon">🌤️</div>
                <h3>Search for Weather</h3>
                <p>Enter a city name above to get current weather or forecast data.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WeatherPage;