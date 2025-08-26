import api from './api';
import { WeatherData, ForecastData } from '../types';

export const weatherService = {
  async getCurrentWeather(city: string): Promise<{ weather: WeatherData }> {
    const response = await api.get(`/weather/current/${encodeURIComponent(city)}`);
    return response.data;
  },

  async getForecast(city: string): Promise<ForecastData> {
    const response = await api.get(`/weather/forecast/${encodeURIComponent(city)}`);
    return response.data;
  }
};