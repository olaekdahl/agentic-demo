import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { WeatherState } from '../types';
import { weatherService } from '../services/weather';

interface WeatherActions {
  fetchCurrentWeather: (city: string) => Promise<void>;
  fetchForecast: (city: string) => Promise<void>;
  clearWeatherData: () => void;
  clearError: () => void;
  setSelectedCity: (city: string) => void;
}

const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  isLoading: false,
  error: null,
  selectedCity: '',
};

export const useWeatherStore = create<WeatherState & WeatherActions>()(
  devtools(
    (set, get) => ({
      ...initialState,

      fetchCurrentWeather: async (city: string) => {
        if (!city.trim()) {
          set({ error: 'City name is required' });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const response = await weatherService.getCurrentWeather(city);
          set({
            currentWeather: response.weather,
            isLoading: false,
            error: null,
            selectedCity: city,
          });
        } catch (error: any) {
          set({
            currentWeather: null,
            isLoading: false,
            error: error.response?.data?.message || 'Failed to fetch weather data',
          });
          throw error;
        }
      },

      fetchForecast: async (city: string) => {
        if (!city.trim()) {
          set({ error: 'City name is required' });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const forecastData = await weatherService.getForecast(city);
          set({
            forecast: forecastData,
            isLoading: false,
            error: null,
            selectedCity: city,
          });
        } catch (error: any) {
          set({
            forecast: null,
            isLoading: false,
            error: error.response?.data?.message || 'Failed to fetch forecast data',
          });
          throw error;
        }
      },

      clearWeatherData: () => {
        set({
          currentWeather: null,
          forecast: null,
          error: null,
          selectedCity: '',
        });
      },

      clearError: () => set({ error: null }),

      setSelectedCity: (city: string) => set({ selectedCity: city }),
    }),
    {
      name: 'weather-store',
    }
  )
);