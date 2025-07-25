# Bro Workout Frontend

A React.js application that consumes the Bro Workout API to manage users, exercises, and workouts.

## Features

- **User Management**: Create and view users with their workout history
- **Exercise Library**: Browse and manage exercises with videos and images
- **Workout Tracking**: Create custom workouts with sets, reps, and weights for users
- **Modern UI**: Beautiful Material-UI interface with responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- The Bro Workout API running on `http://localhost:3000`

## Installation

1. Navigate to the project directory:
   ```bash
   cd bro-workout-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will open in your browser at `http://localhost:3001`.

## API Endpoints Used

The frontend consumes the following API endpoints:

### Users
- `GET /users` - Get all users with their workouts
- `POST /users` - Create a new user
- `PATCH /users/:userId/treinos` - Add a workout to a user

### Exercises
- `GET /exercicios` - Get all exercises
- `POST /exercicios` - Create a new exercise

## Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation header
│   ├── Home.js            # Home page with overview
│   ├── UsersList.js       # User management component
│   ├── ExercisesList.js   # Exercise library component
│   └── WorkoutForm.js     # Form to add workouts to users
├── services/
│   └── api.js             # API service functions
└── App.js                 # Main app component with routing
```

## Usage

1. **Home Page**: Overview of the application features
2. **Users Page**: 
   - View all users and their workout counts
   - Create new users
   - Add workouts to existing users
3. **Exercises Page**:
   - Browse all exercises
   - Create new exercises with optional video and image URLs
   - View exercise details

## Technologies Used

- React.js
- React Router for navigation
- Material-UI for components and styling
- Axios for API communication

## Development

To start the development server with hot reload:

```bash
npm start
```

To build for production:

```bash
npm run build
```

## API Configuration

The API base URL is configured in `src/services/api.js`. Make sure your Bro Workout API is running on `http://localhost:3000` or update the `API_BASE_URL` constant accordingly.
