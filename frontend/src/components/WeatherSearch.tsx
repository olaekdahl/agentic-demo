import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useWeatherStore } from '../store/weatherStore';
import './WeatherSearch.css';

interface WeatherSearchData {
  city: string;
}

const WeatherSearch: React.FC = () => {
  const { fetchCurrentWeather, fetchForecast, isLoading, error, clearError } = useWeatherStore();
  const [searchType, setSearchType] = useState<'current' | 'forecast'>('current');
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<WeatherSearchData>();

  const onSubmit = async (data: WeatherSearchData) => {
    try {
      clearError();
      if (searchType === 'current') {
        await fetchCurrentWeather(data.city);
      } else {
        await fetchForecast(data.city);
      }
    } catch (error) {
      // Error is handled by the store
    }
  };

  return (
    <div className="weather-search">
      <div className="search-header">
        <h2>Weather Search</h2>
        <div className="search-type-toggle">
          <button
            type="button"
            className={`toggle-btn ${searchType === 'current' ? 'active' : ''}`}
            onClick={() => setSearchType('current')}
          >
            Current Weather
          </button>
          <button
            type="button"
            className={`toggle-btn ${searchType === 'forecast' ? 'active' : ''}`}
            onClick={() => setSearchType('forecast')}
          >
            5-Day Forecast
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="search-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter city name (e.g., London, New York)"
            {...register('city', {
              required: 'City name is required',
              minLength: {
                value: 2,
                message: 'City name must be at least 2 characters'
              }
            })}
            className={errors.city ? 'error' : ''}
          />
          {errors.city && (
            <span className="field-error">{errors.city.message}</span>
          )}
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          className="search-btn"
        >
          {isLoading ? (
            <>
              <span className="loading-spinner"></span>
              Searching...
            </>
          ) : (
            <>
              🔍 Search Weather
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default WeatherSearch;