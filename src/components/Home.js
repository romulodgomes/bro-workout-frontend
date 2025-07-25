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
          Bem-vindo ao Bro Workout
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Seu companheiro fitness definitivo para acompanhar treinos e gerenciar exercícios
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent>
              <PeopleIcon sx={{ fontSize: 60, color: '#1a237e', mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Gerenciar Usuários
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Crie e gerencie perfis de usuários, acompanhe seu progresso e atribua treinos personalizados.
              </Typography>
              <Button 
                variant="contained" 
                component={RouterLink} 
                to="/users"
                sx={{ backgroundColor: '#1a237e' }}
              >
                Ver Usuários
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent>
              <DirectionsRunIcon sx={{ fontSize: 60, color: '#1a237e', mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Biblioteca de Exercícios
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Navegue e gerencie exercícios com vídeos e imagens para ajudar os usuários a executar corretamente.
              </Typography>
              <Button 
                variant="contained" 
                component={RouterLink} 
                to="/exercises"
                sx={{ backgroundColor: '#1a237e' }}
              >
                Ver Exercícios
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent>
              <FitnessCenterIcon sx={{ fontSize: 60, color: '#1a237e', mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Acompanhamento de Treinos
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Crie treinos personalizados com séries, repetições e pesos para acompanhar o progresso dos usuários ao longo do tempo.
              </Typography>
              <Button 
                variant="contained" 
                component={RouterLink} 
                to="/users"
                sx={{ backgroundColor: '#1a237e' }}
              >
                Começar Acompanhamento
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home; 