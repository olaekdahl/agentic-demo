import React from 'react';
import { ForecastData } from '../types';
import './ForecastDisplay.css';

interface ForecastDisplayProps {
  forecast: ForecastData;
}

const ForecastDisplay: React.FC<ForecastDisplayProps> = ({ forecast }) => {
  const getWeatherIconUrl = (icon: string) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  const formatDateTime = (datetime: string) => {
    const date = new Date(datetime);
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  // Group forecast items by date
  const groupedForecast = forecast.forecast.reduce((acc, item) => {
    const date = new Date(item.datetime).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, typeof forecast.forecast>);

  return (
    <div className="forecast-display">
      <div className="forecast-header">
        <h3>5-Day Weather Forecast</h3>
        <p className="location">{forecast.city}, {forecast.country}</p>
      </div>

      <div className="forecast-content">
        {Object.entries(groupedForecast).map(([date, items]) => (
          <div key={date} className="forecast-day">
            <div className="day-header">
              <h4>{formatDateTime(items[0].datetime).date}</h4>
            </div>
            
            <div className="day-items">
              {items.map((item, index) => {
                const { time } = formatDateTime(item.datetime);
                return (
                  <div key={index} className="forecast-item">
                    <div className="forecast-time">
                      {time}
                    </div>
                    
                    <div className="forecast-weather">
                      <img 
                        src={getWeatherIconUrl(item.icon)} 
                        alt={item.description}
                        className="forecast-icon"
                      />
                      <div className="forecast-temp">
                        {item.temperature}°C
                      </div>
                    </div>
                    
                    <div className="forecast-details">
                      <div className="forecast-description">
                        {item.description.charAt(0).toUpperCase() + item.description.slice(1)}
                      </div>
                      <div className="forecast-metrics">
                        <span>💧 {item.humidity}%</span>
                        <span>💨 {item.windSpeed} m/s</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay;