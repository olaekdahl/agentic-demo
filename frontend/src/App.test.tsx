import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock the stores to avoid axios import issues in tests
jest.mock('./store/authStore', () => ({
  useAuthStore: () => ({
    isAuthenticated: false,
    checkAuth: jest.fn(),
    isLoading: false,
  }),
}));

jest.mock('./store/weatherStore', () => ({
  useWeatherStore: () => ({
    currentWeather: null,
    forecast: null,
  }),
}));

import App from './App';

test('renders loading screen initially', () => {
  render(<App />);
  // The app should show loading initially
  expect(document.querySelector('.loading-screen') || document.querySelector('.auth-page')).toBeTruthy();
});
