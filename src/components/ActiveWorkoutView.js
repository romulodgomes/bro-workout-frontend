import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
  CircularProgress,
  Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { usersAPI } from '../services/api';

const ActiveWorkoutView = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingWorkouts, setLoadingWorkouts] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      fetchWorkouts(selectedUserId);
    } else {
      setWorkouts([]);
    }
  }, [selectedUserId]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await usersAPI.getAll();
      setUsers(response.data);
      setError('');
    } catch (err) {
      setError('Falha ao carregar usuários');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWorkouts = async (userId) => {
    try {
      setLoadingWorkouts(true);
      const response = await usersAPI.getWorkouts(userId);
      setWorkouts(response.data);
      setError('');
    } catch (err) {
      setError('Falha ao carregar treinos do usuário');
      console.error('Error fetching workouts:', err);
    } finally {
      setLoadingWorkouts(false);
    }
  };

  const handleUserChange = (event) => {
    setSelectedUserId(event.target.value);
  };

  const selectedUser = users.find(user => user._id === selectedUserId);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" sx={{ color: '#1a237e', mb: 3 }}>
          Visualização de Treino Ativo
        </Typography>
        
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="user-select-label">Selecione o Usuário</InputLabel>
          <Select
            labelId="user-select-label"
            id="user-select"
            value={selectedUserId}
            label="Selecione o Usuário"
            onChange={handleUserChange}
          >
            <MenuItem value="">
              <em>Nenhum usuário selecionado</em>
            </MenuItem>
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.nome} ({user.email})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {selectedUserId && (
          <Box>
            {loadingWorkouts ? (
              <Box display="flex" justifyContent="center" my={4}>
                <CircularProgress />
              </Box>
            ) : workouts.length === 0 ? (
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  {selectedUser?.nome} não possui treinos cadastrados.
                </Typography>
              </Paper>
            ) : (
              <Box>
                <Typography variant="h6" sx={{ mb: 2, color: '#1a237e' }}>
                  Treinos de {selectedUser?.nome}
                </Typography>
                {workouts.map((treino, index) => (
                  <Accordion key={treino._id || index} sx={{ mb: 2 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index}-content`}
                      id={`panel${index}-header`}
                    >
                      <Box display="flex" alignItems="center" width="100%">
                        <FitnessCenterIcon sx={{ mr: 2, color: '#1a237e' }} />
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                          {treino.nome}
                        </Typography>
                        <Chip 
                          label={`${treino.series?.length || 0} série(s)`} 
                          size="small" 
                          sx={{ mr: 2 }}
                        />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      {treino.series && treino.series.length > 0 ? (
                        <Grid container spacing={2}>
                          {treino.series.map((serie, serieIndex) => (
                            <Grid item xs={12} sm={6} md={4} key={serieIndex}>
                              <Card variant="outlined">
                                <CardContent>
                                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                    {serie.exercicio?.nome || 'Exercício não encontrado'}
                                  </Typography>
                                  <Box mt={1}>
                                    {serie.repeticoes && (
                                      <Chip 
                                        label={`Repetições: ${serie.repeticoes}`} 
                                        size="small" 
                                        sx={{ mr: 0.5, mb: 0.5 }}
                                      />
                                    )}
                                    {serie.execucoes && (
                                      <Chip 
                                        label={`Execuções: ${serie.execucoes}`} 
                                        size="small" 
                                        sx={{ mr: 0.5, mb: 0.5 }}
                                      />
                                    )}
                                    {serie.carga && (
                                      <Chip 
                                        label={`Carga: ${serie.carga} kg`} 
                                        size="small" 
                                        sx={{ mr: 0.5, mb: 0.5 }}
                                      />
                                    )}
                                  </Box>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          Este treino não possui séries cadastradas.
                        </Typography>
                      )}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ActiveWorkoutView;

