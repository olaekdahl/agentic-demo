const express = require('express');
const { Op } = require('sequelize');
const passport = require('../config/passport');
const { User } = require('../models');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        error: 'All fields are required'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters long'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { username: username.toLowerCase() },
          { email: email.toLowerCase() }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'Username or email already exists'
      });
    }

    // Create new user
    const user = await User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password
    });

    // Log the user in after registration
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Login after registration failed' });
      }
      
      res.status(201).json({
        message: 'User registered successfully',
        user: user.toJSON()
      });
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: 'Registration failed',
      message: error.message
    });
  }
});

// Login route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Authentication error' });
    }
    
    if (!user) {
      return res.status(401).json({ 
        error: 'Login failed',
        message: info?.message || 'Invalid credentials'
      });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Login failed' });
      }
      
      res.json({
        message: 'Login successful',
        user: user.toJSON()
      });
    });
  })(req, res, next);
});

// Logout route
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    
    res.json({ message: 'Logout successful' });
  });
});

// Get current user
router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      user: req.user.toJSON()
    });
  } else {
    res.status(401).json({
      error: 'Not authenticated'
    });
  }
});

module.exports = router;