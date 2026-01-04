import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1a237e' }}>
      <Toolbar>
        <FitnessCenterIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Bro Workout
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/"
          >
            Início
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/users"
          >
            Usuários
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/exercises"
          >
            Exercícios
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/active-workout"
          >
            Treino Ativo
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 