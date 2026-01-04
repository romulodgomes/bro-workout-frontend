import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Home from './components/Home';
import UsersList from './components/UsersList';
import ExercisesList from './components/ExercisesList';
import ActiveWorkoutView from './components/ActiveWorkoutView';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/exercises" element={<ExercisesList />} />
            <Route path="/active-workout" element={<ActiveWorkoutView />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
