import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import { usersAPI, exercisesAPI } from '../services/api';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const WorkoutForm = ({ open, onClose, userId, onWorkoutAdded, treinoId = null, initialData = null, isEdit = false }) => {
  const [exercises, setExercises] = useState([]);
  const [workoutName, setWorkoutName] = useState('');
  const [series, setSeries] = useState([{ exercicio: '', repeticoes: '', execucoes: '', carga: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      fetchExercises();
      if (isEdit && initialData) {
        setWorkoutName(initialData.nome || '');
        setSeries(
          initialData.series && initialData.series.length > 0
            ? initialData.series.map(s => ({
                exercicio: s.exercicio?._id || s.exercicio || '',
                repeticoes: s.repeticoes || '',
                execucoes: s.execucoes || '',
                carga: s.carga || ''
              }))
            : [{ exercicio: '', repeticoes: '', execucoes: '', carga: '' }]
        );
      } else {
        setWorkoutName('');
        setSeries([{ exercicio: '', repeticoes: '', execucoes: '', carga: '' }]);
      }
    }
  }, [open, isEdit, initialData]);

  const fetchExercises = async () => {
    try {
      const response = await exercisesAPI.getAll();
      setExercises(response.data);
    } catch (err) {
      console.error('Error fetching exercises:', err);
    }
  };

  const handleAddSeries = () => {
    setSeries([...series, { exercicio: '', repeticoes: '', execucoes: '', carga: '' }]);
  };

  const handleRemoveSeries = (index) => {
    const newSeries = series.filter((_, i) => i !== index);
    setSeries(newSeries);
  };

  const handleSeriesChange = (index, field, value) => {
    const newSeries = [...series];
    newSeries[index][field] = value;
    setSeries(newSeries);
  };

  const handleSubmit = async () => {
    if (!workoutName.trim()) {
      setError('Nome do treino é obrigatório');
      return;
    }

    const validSeries = series.filter(s => s.exercicio && s.repeticoes && s.execucoes);
    if (validSeries.length === 0) {
      setError('Pelo menos uma série de exercício é obrigatória');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const workoutData = {
        nome: workoutName,
        series: validSeries.map(s => ({
          exercicio: s.exercicio,
          repeticoes: parseInt(s.repeticoes),
          execucoes: parseInt(s.execucoes),
          carga: s.carga ? parseInt(s.carga) : 0
        }))
      };
      if (isEdit && treinoId) {
        await usersAPI.editWorkout(userId, treinoId, workoutData);
      } else {
        await usersAPI.addWorkout(userId, workoutData);
      }
      onWorkoutAdded();
      onClose();
      setWorkoutName('');
      setSeries([{ exercicio: '', repeticoes: '', execucoes: '', carga: '' }]);
    } catch (err) {
      setError(isEdit ? 'Falha ao editar treino' : 'Falha ao adicionar treino');
      console.error('Error adding/editing workout:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{isEdit ? 'Editar Treino' : 'Adicionar Novo Treino'}</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <TextField
          autoFocus
          margin="dense"
          label="Nome do Treino"
          fullWidth
          variant="outlined"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Typography variant="h6" gutterBottom>
          Séries de Exercícios
        </Typography>

        {series.map((serie, index) => (
          <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="subtitle1">Série {index + 1}</Typography>
              {series.length > 1 && (
                <IconButton
                  size="small"
                  onClick={() => handleRemoveSeries(index)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Exercício</InputLabel>
                  <Select
                    value={serie.exercicio}
                    label="Exercício"
                    onChange={(e) => handleSeriesChange(index, 'exercicio', e.target.value)}
                  >
                    {exercises.map((exercise) => (
                      <MenuItem key={exercise._id} value={exercise._id}>
                        {exercise.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  label="Repetições"
                  type="number"
                  fullWidth
                  value={serie.repeticoes}
                  onChange={(e) => handleSeriesChange(index, 'repeticoes', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  label="Séries"
                  type="number"
                  fullWidth
                  value={serie.execucoes}
                  onChange={(e) => handleSeriesChange(index, 'execucoes', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  label="Peso (kg)"
                  type="number"
                  fullWidth
                  value={serie.carga}
                  onChange={(e) => handleSeriesChange(index, 'carga', e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        ))}

        <Button
          startIcon={<AddIcon />}
          onClick={handleAddSeries}
          variant="outlined"
          sx={{ mt: 1 }}
        >
          Adicionar Série
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading}
          sx={{ backgroundColor: '#1a237e' }}
        >
          {loading ? (isEdit ? 'Salvando...' : 'Adicionando...') : (isEdit ? 'Salvar Alterações' : 'Adicionar Treino')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkoutForm; 