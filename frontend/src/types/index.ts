export interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  timestamp: string;
}

export interface ForecastItem {
  datetime: string;
  temperature: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
}

export interface ForecastData {
  city: string;
  country: string;
  forecast: ForecastItem[];
}

export interface WeatherState {
  currentWeather: WeatherData | null;
  forecast: ForecastData | null;
  isLoading: boolean;
  error: string | null;
  selectedCity: string;
}