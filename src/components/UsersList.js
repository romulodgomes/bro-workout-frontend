import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  Alert,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { usersAPI } from '../services/api';
import AddIcon from '@mui/icons-material/Add';
import WorkoutForm from './WorkoutForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TreinosCell = ({ treinos, userId, userName, isCompact, isMobile, isTightCompact, onEdit, onDelete, onViewAll }) => {
  if (treinos.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        Nenhum treino
      </Typography>
    );
  }

  const maxVisible = isMobile ? 2 : isTightCompact ? 1 : isCompact ? 2 : 3;
  const chipMaxWidth = isTightCompact ? 100 : isCompact ? 120 : 160;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 0.5,
        py: 0.5,
        width: '100%',
      }}
    >
      {treinos.slice(0, maxVisible).map((treino, index) => (
        <Box
          key={treino._id || index}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            minWidth: 0,
            maxWidth: '100%',
          }}
        >
          <Chip
            label={treino.nome}
            size="small"
            sx={{
              minWidth: 0,
              maxWidth: chipMaxWidth,
              '& .MuiChip-label': {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              },
            }}
          />
          <IconButton
            size="small"
            onClick={() => onEdit(userId, treino)}
            aria-label="Editar Treino"
            sx={{ flexShrink: 0, ml: 0.25 }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => onDelete(userId, treino)}
            aria-label="Excluir Treino"
            sx={{ flexShrink: 0 }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
      {treinos.length > maxVisible && (
        <Chip
          label={`+${treinos.length - maxVisible} mais`}
          size="small"
          variant="outlined"
          clickable
          onClick={() => onViewAll(userId, userName)}
          aria-label="Ver todos os treinos"
        />
      )}
    </Box>
  );
};

const UsersList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isCompact = useMediaQuery(theme.breakpoints.down('lg'));
  const isTightCompact = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newUser, setNewUser] = useState({ nome: '', email: '', password: '' });
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [workoutFormOpen, setWorkoutFormOpen] = useState(false);
  const [editWorkoutDialog, setEditWorkoutDialog] = useState({ open: false, userId: null, treinoId: null, initialData: null });
  const [deleteWorkoutDialog, setDeleteWorkoutDialog] = useState({ open: false, userId: null, treino: null });
  const [deleting, setDeleting] = useState(false);
  const [allWorkoutsDialog, setAllWorkoutsDialog] = useState({ open: false, userId: null, userName: '' });

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

  const handleEditWorkout = useCallback((userId, treino) => {
    setEditWorkoutDialog({ open: true, userId, treinoId: treino._id, initialData: treino });
  }, []);

  const handleDeleteWorkoutClick = useCallback((userId, treino) => {
    setDeleteWorkoutDialog({ open: true, userId, treino });
  }, []);

  const handleViewAllWorkouts = useCallback((userId, userName) => {
    setAllWorkoutsDialog({ open: true, userId, userName: userName || '' });
  }, []);

  const allWorkoutsDialogTreinos = useMemo(() => {
    if (!allWorkoutsDialog.userId) return [];
    const user = users.find((u) => u._id === allWorkoutsDialog.userId);
    return user?.treinos || [];
  }, [users, allWorkoutsDialog.userId]);

  const handleConfirmDeleteWorkout = async () => {
    const { userId, treino } = deleteWorkoutDialog;
    if (!userId || !treino?._id) return;

    try {
      setDeleting(true);
      await usersAPI.deleteWorkout(userId, treino._id);
      setDeleteWorkoutDialog({ open: false, userId: null, treino: null });
      setError('');
      fetchUsers();
    } catch (err) {
      setError('Falha ao excluir treino');
      console.error('Error deleting workout:', err);
    } finally {
      setDeleting(false);
    }
  };

  const rows = useMemo(
    () => users.map((user) => ({ ...user, id: user._id })),
    [users]
  );

  const columns = useMemo(() => {
    if (isMobile) {
      return [
        {
          field: 'usuario',
          headerName: 'Usuário',
          flex: 1,
          minWidth: 0,
          sortable: true,
          valueGetter: (value, row) => row.nome,
          renderCell: (params) => (
            <Box sx={{ py: 0.5, minWidth: 0, width: '100%' }}>
              <Typography variant="body2" fontWeight={500} sx={{ wordBreak: 'break-word' }}>
                {params.row.nome}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', wordBreak: 'break-all', mb: 0.75 }}
              >
                {params.row.email}
              </Typography>
              <TreinosCell
                treinos={params.row.treinos || []}
                userId={params.row.id}
                userName={params.row.nome}
                isCompact
                isMobile
                isTightCompact={false}
                onEdit={handleEditWorkout}
                onDelete={handleDeleteWorkoutClick}
                onViewAll={handleViewAllWorkouts}
              />
            </Box>
          ),
        },
        {
          field: 'acoes',
          headerName: 'Ações',
          width: 56,
          sortable: false,
          filterable: false,
          align: 'center',
          headerAlign: 'center',
          renderCell: (params) => (
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleAddWorkout(params.row.id)}
              aria-label="Adicionar Treino"
            >
              <AddIcon fontSize="small" />
            </IconButton>
          ),
        },
      ];
    }

    return [
      {
        field: 'nome',
        headerName: 'Nome',
        flex: 1,
        minWidth: isTightCompact ? 130 : 140,
        renderCell: isCompact
          ? (params) => (
              <Box sx={{ py: 0.5, minWidth: 0 }}>
                <Typography variant="body2" fontWeight={500} sx={{ wordBreak: 'break-word' }}>
                  {params.row.nome}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block', wordBreak: 'break-all' }}
                >
                  {params.row.email}
                </Typography>
              </Box>
            )
          : undefined,
      },
      {
        field: 'email',
        headerName: 'Email',
        flex: 1,
        minWidth: 180,
      },
      {
        field: 'treinos',
        headerName: 'Treinos',
        flex: 2,
        minWidth: isTightCompact ? 150 : 180,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <TreinosCell
            treinos={params.row.treinos || []}
            userId={params.row.id}
            userName={params.row.nome}
            isCompact={isCompact}
            isMobile={false}
            isTightCompact={isTightCompact}
            onEdit={handleEditWorkout}
            onDelete={handleDeleteWorkoutClick}
            onViewAll={handleViewAllWorkouts}
          />
        ),
      },
      {
        field: 'acoes',
        headerName: 'Ações',
        width: 56,
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleAddWorkout(params.row.id)}
            aria-label="Adicionar Treino"
          >
            <AddIcon fontSize="small" />
          </IconButton>
        ),
      },
    ];
  }, [isMobile, isCompact, isTightCompact, handleEditWorkout, handleDeleteWorkoutClick, handleViewAllWorkouts]);

  const columnVisibilityModel = useMemo(
    () => ({
      email: !isCompact,
      nome: !isMobile,
      treinos: !isMobile,
    }),
    [isCompact, isMobile]
  );

  const getRowHeight = useCallback(
    (params) => {
      if (!isCompact) return 52;

      const treinos = params.model.treinos?.length ?? 0;
      const maxVisible = isMobile ? 2 : isTightCompact ? 1 : 2;
      const visibleTreinos = Math.min(treinos, maxVisible);
      const extraChip = treinos > maxVisible ? 1 : 0;
      const treinosRows = treinos === 0 ? 0 : Math.ceil((visibleTreinos + extraChip) / 2);
      const treinosHeight = treinos === 0 ? 20 : treinosRows * 36;

      if (isMobile) {
        return 88 + treinosHeight;
      }

      return Math.max(72, 52 + treinosHeight);
    },
    [isCompact, isMobile, isTightCompact]
  );

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 4 }, mb: 4, px: { xs: 2, sm: 3 } }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={isCompact ? 'flex-start' : 'center'}
        flexDirection={isCompact ? 'column' : 'row'}
        gap={isCompact ? 2 : 0}
        mb={4}
      >
        <Typography variant="h4" component="h1" sx={{ color: '#1a237e' }}>
          Usuários
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ backgroundColor: '#1a237e', alignSelf: isCompact ? 'stretch' : 'auto' }}
        >
          Adicionar Usuário
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ width: '100%', minHeight: 400 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          columnVisibilityModel={columnVisibilityModel}
          loading={loading}
          autoHeight
          getRowHeight={getRowHeight}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-cell': {
              alignItems: 'flex-start',
              py: 1,
              whiteSpace: 'normal',
              lineHeight: 'normal',
            },
            '& .MuiDataGrid-columnHeader': {
              py: 1,
            },
          }}
        />
      </Box>

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

      <Dialog
        open={deleteWorkoutDialog.open}
        onClose={() => !deleting && setDeleteWorkoutDialog({ open: false, userId: null, treino: null })}
      >
        <DialogTitle>Excluir Treino</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir o treino{' '}
            <strong>{deleteWorkoutDialog.treino?.nome}</strong>? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteWorkoutDialog({ open: false, userId: null, treino: null })}
            disabled={deleting}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDeleteWorkout}
            color="error"
            variant="contained"
            disabled={deleting}
          >
            {deleting ? 'Excluindo...' : 'Excluir'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={allWorkoutsDialog.open}
        onClose={() => setAllWorkoutsDialog({ open: false, userId: null, userName: '' })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Treinos{allWorkoutsDialog.userName ? ` — ${allWorkoutsDialog.userName}` : ''}
        </DialogTitle>
        <DialogContent dividers>
          {allWorkoutsDialogTreinos.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Nenhum treino
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {allWorkoutsDialogTreinos.map((treino) => (
                <Box
                  key={treino._id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1,
                    py: 0.5,
                  }}
                >
                  <Typography variant="body2" sx={{ minWidth: 0, wordBreak: 'break-word' }}>
                    {treino.nome}
                  </Typography>
                  <Box sx={{ display: 'flex', flexShrink: 0 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleEditWorkout(allWorkoutsDialog.userId, treino)}
                      aria-label="Editar Treino"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteWorkoutClick(allWorkoutsDialog.userId, treino)}
                      aria-label="Excluir Treino"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAllWorkoutsDialog({ open: false, userId: null, userName: '' })}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

      <WorkoutForm
        open={workoutFormOpen}
        onClose={() => setWorkoutFormOpen(false)}
        userId={selectedUserId}
        onWorkoutAdded={handleWorkoutAdded}
      />
      <WorkoutForm
        open={editWorkoutDialog.open}
        onClose={() => setEditWorkoutDialog({ open: false, userId: null, treinoId: null, initialData: null })}
        userId={editWorkoutDialog.userId}
        treinoId={editWorkoutDialog.treinoId}
        initialData={editWorkoutDialog.initialData}
        isEdit={true}
        onWorkoutAdded={() => {
          setEditWorkoutDialog({ open: false, userId: null, treinoId: null, initialData: null });
          fetchUsers();
        }}
      />
    </Container>
  );
};

export default UsersList;
