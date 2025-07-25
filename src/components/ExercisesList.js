import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  CardMedia
} from '@mui/material';
import { exercisesAPI } from '../services/api';
import AddIcon from '@mui/icons-material/Add';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newExercise, setNewExercise] = useState({ nome: '', video: '', imagem: '' });

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      setLoading(true);
      const response = await exercisesAPI.getAll();
      setExercises(response.data);
      setError('');
    } catch (err) {
      setError('Falha ao carregar exercícios');
      console.error('Error fetching exercises:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateExercise = async () => {
    try {
      await exercisesAPI.create(newExercise);
      setOpenDialog(false);
      setNewExercise({ nome: '', video: '', imagem: '' });
      fetchExercises();
    } catch (err) {
      setError('Falha ao criar exercício');
      console.error('Error creating exercise:', err);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1" sx={{ color: '#1a237e' }}>
          Exercícios
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ backgroundColor: '#1a237e' }}
        >
          Adicionar Exercício
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {exercises.map((exercise) => (
          <Grid item xs={12} md={6} lg={4} key={exercise._id}>
            <Card sx={{ height: '100%' }}>
              {exercise.imagem && (
                <CardMedia
                  component="img"
                  height="200"
                  image={exercise.imagem}
                  alt={exercise.nome}
                  sx={{ objectFit: 'cover' }}
                />
              )}
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <DirectionsRunIcon sx={{ mr: 1, color: '#1a237e' }} />
                  <Typography variant="h6" component="h2">
                    {exercise.nome}
                  </Typography>
                </Box>
                {exercise.video && (
                  <Button
                    variant="outlined"
                    size="small"
                    href={exercise.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ mt: 1 }}
                  >
                    Assistir Vídeo
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Adicionar Novo Exercício</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome do Exercício"
            fullWidth
            variant="outlined"
            value={newExercise.nome}
            onChange={(e) => setNewExercise({ ...newExercise, nome: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="URL do Vídeo (opcional)"
            fullWidth
            variant="outlined"
            value={newExercise.video}
            onChange={(e) => setNewExercise({ ...newExercise, video: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="URL da Imagem (opcional)"
            fullWidth
            variant="outlined"
            value={newExercise.imagem}
            onChange={(e) => setNewExercise({ ...newExercise, imagem: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleCreateExercise} variant="contained" sx={{ backgroundColor: '#1a237e' }}>
            Criar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ExercisesList; 