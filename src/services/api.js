import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Users API
export const usersAPI = {
  getAll: () => api.get('/users'),
  create: (userData) => api.post('/users', userData),
  addWorkout: (userId, workoutData) => api.patch(`/users/${userId}/treinos`, workoutData),
};

// Exercises API
export const exercisesAPI = {
  getAll: () => api.get('/exercicios'),
  create: (exerciseData) => api.post('/exercicios', exerciseData),
};

export default api; 