# Weather App

A full-stack weather application built with Node.js, Express, React, and PostgreSQL. The app provides real-time weather data and 5-day forecasts for cities worldwide, with secure user authentication and modern UI design.

## Features

- 🌤️ **Real-time Weather Data**: Current weather conditions for any city
- 📅 **5-Day Forecast**: Detailed weather predictions with 3-hour intervals  
- 🔐 **Secure Authentication**: User registration and login with bcrypt password hashing
- 📱 **Responsive Design**: Modern UI that works on desktop and mobile
- 🐳 **Containerized**: Ready for deployment with Docker
- ☁️ **Cloud Ready**: Configured for AWS deployment with ECS and ECR
- 🚀 **CI/CD Pipeline**: Automated testing and deployment with GitHub Actions

## Technology Stack

### Backend
- **Node.js** with Express framework
- **PostgreSQL** database with Sequelize ORM
- **Passport.js** for authentication
- **bcrypt** for password hashing
- **OpenWeatherMap API** for weather data

### Frontend
- **React** with TypeScript
- **Zustand** for state management
- **React Hook Form** for form validation
- **Axios** for API communication
- **CSS3** with modern styling

### Infrastructure
- **Docker** containerization
- **AWS ECS** (Elastic Container Service) 
- **AWS ECR** (Elastic Container Registry)
- **GitHub Actions** for CI/CD

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 12+
- Docker (optional)
- OpenWeatherMap API key

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd agentic-demo
   ```

2. **Get OpenWeatherMap API Key**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Get your free API key

3. **Configure Backend Environment**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your database and API key details
   ```

4. **Configure Frontend Environment**
   ```bash
   cd ../frontend
   cp .env.example .env
   # Modify REACT_APP_API_URL if needed
   ```

### Local Development

1. **Start PostgreSQL**
   ```bash
   # Option 1: Using Docker
   docker run --name weather-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=weather_app_dev -p 5432:5432 -d postgres:15

   # Option 2: Use your local PostgreSQL installation
   createdb weather_app_dev
   ```

2. **Install Dependencies**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend  
   cd ../frontend
   npm install
   ```

3. **Start Development Servers**
   ```bash
   # Terminal 1: Backend
   cd backend
   npm run dev

   # Terminal 2: Frontend
   cd frontend
   npm start
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Using Docker

1. **Create environment file**
   ```bash
   echo "OPENWEATHER_API_KEY=your_api_key_here" > .env
   ```

2. **Start with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the application at http://localhost:5000**

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Weather Endpoints

- `GET /api/weather/current/:city` - Get current weather for city
- `GET /api/weather/forecast/:city` - Get 5-day forecast for city

### Health Check

- `GET /health` - Application health status

## Deployment

### AWS Deployment

The application is configured for deployment on AWS using ECS and ECR:

1. **Setup AWS Infrastructure**
   - Create ECR repository
   - Setup ECS cluster with Fargate
   - Configure RDS PostgreSQL instance
   - Setup AWS Secrets Manager for environment variables

2. **Configure GitHub Secrets**
   ```
   AWS_ACCESS_KEY_ID
   AWS_SECRET_ACCESS_KEY
   ```

3. **Deploy**
   - Push to main branch triggers automatic deployment
   - GitHub Actions builds, tests, and deploys the application

### Environment Variables

#### Backend
- `DB_HOST` - Database host
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name
- `OPENWEATHER_API_KEY` - OpenWeatherMap API key
- `SESSION_SECRET` - Session encryption key
- `NODE_ENV` - Environment (development/production)

#### Frontend
- `REACT_APP_API_URL` - Backend API URL

## Development

### Project Structure

```
agentic-demo/
├── backend/                # Node.js backend
│   ├── config/            # Database and passport config
│   ├── models/            # Sequelize models
│   ├── routes/            # Express routes
│   ├── middleware/        # Custom middleware
│   └── server.js          # Main server file
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Zustand stores
│   │   ├── services/      # API services
│   │   └── types/         # TypeScript types
│   └── public/            # Static files
├── .github/workflows/     # GitHub Actions
├── .aws/                  # AWS configuration
├── Dockerfile             # Multi-stage Docker build
└── docker-compose.yml     # Local development
```

### Available Scripts

#### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

#### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from create-react-app

### Testing

Run the test suites:

```bash
# Backend tests
cd backend
npm test

# Frontend tests  
cd frontend
npm test
```

## Security

- Passwords are hashed using bcrypt
- Session-based authentication with secure cookies
- CORS configured for cross-origin requests
- Helmet.js for security headers
- Input validation on all endpoints
- Non-root user in Docker container

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:

- Create an issue in the repository
- Check the API documentation above
- Review environment variable configuration

---

Built with ❤️ using modern web technologies
