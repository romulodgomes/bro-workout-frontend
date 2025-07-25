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
  Chip
} from '@mui/material';
import { usersAPI } from '../services/api';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import WorkoutForm from './WorkoutForm';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newUser, setNewUser] = useState({ nome: '', email: '', password: '' });
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [workoutFormOpen, setWorkoutFormOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const handleCreateUser = async () => {
    try {
      await usersAPI.create(newUser);
      setOpenDialog(false);
      setNewUser({ nome: '', email: '', password: '' });
      fetchUsers();
    } catch (err) {
      setError('Falha ao criar usuário');
      console.error('Error creating user:', err);
    }
  };

  const handleAddWorkout = (userId) => {
    setSelectedUserId(userId);
    setWorkoutFormOpen(true);
  };

  const handleWorkoutAdded = () => {
    fetchUsers();
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
          Usuários
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ backgroundColor: '#1a237e' }}
        >
          Adicionar Usuário
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} md={6} lg={4} key={user._id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <PersonIcon sx={{ mr: 1, color: '#1a237e' }} />
                  <Typography variant="h6" component="h2">
                    {user.nome}
                  </Typography>
                </Box>
                <Typography color="text.secondary" gutterBottom>
                  {user.email}
                </Typography>
                <Box mt={2}>
                  <Typography variant="body2" color="text.secondary">
                    Treinos: {user.treinos?.length || 0}
                  </Typography>
                  {user.treinos && user.treinos.length > 0 && (
                    <Box mt={1}>
                      {user.treinos.slice(0, 3).map((treino, index) => (
                        <Chip
                          key={index}
                          label={treino.nome}
                          size="small"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                      {user.treinos.length > 3 && (
                        <Chip
                          label={`+${user.treinos.length - 3} mais`}
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Box>
                  )}
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleAddWorkout(user._id)}
                    sx={{ mt: 1 }}
                  >
                    Adicionar Treino
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Adicionar Novo Usuário</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome"
            fullWidth
            variant="outlined"
            value={newUser.nome}
            onChange={(e) => setNewUser({ ...newUser, nome: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Senha"
            type="password"
            fullWidth
            variant="outlined"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleCreateUser} variant="contained" sx={{ backgroundColor: '#1a237e' }}>
            Criar
          </Button>
        </DialogActions>
      </Dialog>

      <WorkoutForm
        open={workoutFormOpen}
        onClose={() => setWorkoutFormOpen(false)}
        userId={selectedUserId}
        onWorkoutAdded={handleWorkoutAdded}
      />
    </Container>
  );
};

export default UsersList; 