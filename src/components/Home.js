import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Grid,
  Button 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box textAlign="center" mb={6}>
        <FitnessCenterIcon sx={{ fontSize: 80, color: '#1a237e', mb: 2 }} />
        <Typography variant="h2" component="h1" gutterBottom sx={{ color: '#1a237e' }}>
          Welcome to Bro Workout
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Your ultimate fitness companion for tracking workouts and managing exercises
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent>
              <PeopleIcon sx={{ fontSize: 60, color: '#1a237e', mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Manage Users
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Create and manage user profiles, track their progress, and assign personalized workouts.
              </Typography>
              <Button 
                variant="contained" 
                component={RouterLink} 
                to="/users"
                sx={{ backgroundColor: '#1a237e' }}
              >
                View Users
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent>
              <DirectionsRunIcon sx={{ fontSize: 60, color: '#1a237e', mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Exercise Library
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Browse and manage exercises with videos and images to help users perform correctly.
              </Typography>
              <Button 
                variant="contained" 
                component={RouterLink} 
                to="/exercises"
                sx={{ backgroundColor: '#1a237e' }}
              >
                View Exercises
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent>
              <FitnessCenterIcon sx={{ fontSize: 60, color: '#1a237e', mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Workout Tracking
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Create custom workouts with sets, reps, and weights to track user progress over time.
              </Typography>
              <Button 
                variant="contained" 
                component={RouterLink} 
                to="/users"
                sx={{ backgroundColor: '#1a237e' }}
              >
                Start Tracking
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home; 