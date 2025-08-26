const express = require('express');
const axios = require('axios');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();

// Get current weather for a city
router.get('/current/:city', isAuthenticated, async (req, res) => {
  try {
    const { city } = req.params;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: 'Weather service not configured',
        message: 'API key is missing'
      });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const weatherData = {
      city: response.data.name,
      country: response.data.sys.country,
      temperature: Math.round(response.data.main.temp),
      feelsLike: Math.round(response.data.main.feels_like),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      pressure: response.data.main.pressure,
      visibility: response.data.visibility / 1000, // Convert to km
      timestamp: new Date().toISOString()
    };

    res.json({
      weather: weatherData
    });

  } catch (error) {
    console.error('Weather API error:', error.response?.data || error.message);
    
    if (error.response?.status === 404) {
      return res.status(404).json({
        error: 'City not found',
        message: 'Please check the city name and try again'
      });
    }

    res.status(500).json({
      error: 'Failed to fetch weather data',
      message: 'Please try again later'
    });
  }
});

// Get weather forecast for a city
router.get('/forecast/:city', isAuthenticated, async (req, res) => {
  try {
    const { city } = req.params;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: 'Weather service not configured',
        message: 'API key is missing'
      });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    const forecastData = response.data.list.map(item => ({
      datetime: item.dt_txt,
      temperature: Math.round(item.main.temp),
      feelsLike: Math.round(item.main.feels_like),
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
      pressure: item.main.pressure
    }));

    res.json({
      city: response.data.city.name,
      country: response.data.city.country,
      forecast: forecastData
    });

  } catch (error) {
    console.error('Weather forecast API error:', error.response?.data || error.message);
    
    if (error.response?.status === 404) {
      return res.status(404).json({
        error: 'City not found',
        message: 'Please check the city name and try again'
      });
    }

    res.status(500).json({
      error: 'Failed to fetch weather forecast',
      message: 'Please try again later'
    });
  }
});

module.exports = router;