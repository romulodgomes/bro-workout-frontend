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
    <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 4 }, mb: 4, px: { xs: 2, sm: 3 } }}>
      <Box textAlign="center" mb={{ xs: 4, sm: 6 }}>
        <FitnessCenterIcon sx={{ fontSize: { xs: 56, sm: 80 }, color: 'primary.main', mb: 2 }} />
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            color: 'primary.main',
            fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
            px: { xs: 1, sm: 0 },
          }}
        >
          Bem-vindo ao Bro Workout
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          paragraph
          sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}
        >
          Seu companheiro fitness definitivo para acompanhar treinos e gerenciar exercícios
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent>
              <PeopleIcon sx={{ fontSize: { xs: 48, sm: 60 }, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                Gerenciar Usuários
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Crie e gerencie perfis de usuários, acompanhe seu progresso e atribua treinos personalizados.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/users"
                fullWidth
                sx={{ maxWidth: 240 }}
              >
                Ver Usuários
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent>
              <DirectionsRunIcon sx={{ fontSize: { xs: 48, sm: 60 }, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                Biblioteca de Exercícios
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Navegue e gerencie exercícios com vídeos e imagens para ajudar os usuários a executar corretamente.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/exercises"
                fullWidth
                sx={{ maxWidth: 240 }}
              >
                Ver Exercícios
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent>
              <FitnessCenterIcon sx={{ fontSize: { xs: 48, sm: 60 }, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                Acompanhamento de Treinos
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Crie treinos personalizados com séries, repetições e pesos para acompanhar o progresso dos usuários ao longo do tempo.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/users"
                fullWidth
                sx={{ maxWidth: 240 }}
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