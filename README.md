# Weather Forecast App

A full-stack MERN application for weather forecasting with user authentication and role-based access control.

## Features

- **User Authentication**: Secure login and registration with JWT and bcrypt
- **Role-Based Access Control**: Admin and User roles with different permissions
- **Weather Forecasting**: Get current weather and 5-day forecasts for any city
- **Favorite Cities**: Save and manage your favorite cities
- **Responsive Design**: Mobile-friendly interface using Bootstrap
- **Admin Dashboard**: Manage users and saved cities

## Tech Stack

- **Frontend**: React, Bootstrap, Chart.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt
- **API**: OpenWeatherMap

## Prerequisites

- Node.js (v14 or higher)
- MongoDB account
- OpenWeatherMap API key (already included in the code)

## Installation

### Clone the repository

\`\`\`bash
git clone https://github.com/yourusername/weather-forecast-app.git
cd weather-forecast-app
\`\`\`

### Set up environment variables

Create a `.env` file in the server directory with the following variables:

\`\`\`
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://patelrudraa:W52GuMqIinyVPPRC@weather-app.veseavk.mongodb.net/Weather?retryWrites=true&w=majority&appName=weather-app
JWT_SECRET=weatherapp123secretkey456
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
\`\`\`

### Install dependencies and run the application

\`\`\`bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Run both server and client (from server directory)
cd ../server
npm run dev
\`\`\`

The application will be available at `http://localhost:3000`

## Project Structure

\`\`\`
weather-forecast-app/
├── client/                     # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page components
│   │   ├── context/            # Context providers
│   │   ├── utils/              # Utility functions
│   │   ├── App.js              # Main App component
│   │   └── index.js            # Entry point
│   └── package.json
├── server/                     # Backend Node.js/Express application
│   ├── config/                 # Configuration files
│   ├── controllers/            # Route controllers
│   ├── middleware/             # Custom middleware
│   ├── models/                 # MongoDB models
│   ├── routes/                 # API routes
│   ├── utils/                  # Utility functions
│   ├── server.js               # Entry point
│   └── package.json
└── README.md                   # Project documentation
\`\`\`

## API Endpoints

### Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/logout` - Logout user
- `GET /api/users/me` - Get current user

### Weather

- `GET /api/weather/:city` - Get weather forecast by city name
- `POST /api/weather/favorites` - Add city to favorites
- `DELETE /api/weather/favorites/:id` - Remove city from favorites

### User

- `GET /api/users/cities` - Get user's favorite cities
- `PUT /api/users/profile` - Update user profile

### Admin

- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get single user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/cities` - Get all cities
- `DELETE /api/admin/cities/:id` - Delete city

## Deployment

### Heroku Deployment

1. Create a Heroku account and install the Heroku CLI
2. Login to Heroku CLI: `heroku login`
3. Create a new Heroku app: `heroku create weather-forecast-app`
4. Add the MongoDB URI as a config var: `heroku config:set MONGO_URI=your_mongodb_uri`
5. Add other environment variables: 
   \`\`\`
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set JWT_EXPIRE=30d
   heroku config:set JWT_COOKIE_EXPIRE=30
   \`\`\`
6. Push to Heroku: `git push heroku main`

## License

This project is licensed under the MIT License.
\`\`\`

Let's create a .gitignore file:

```text file="server/.gitignore"
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
