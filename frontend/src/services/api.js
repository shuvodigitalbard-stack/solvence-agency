import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const login = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');
export const registerUser = (data) => API.post('/auth/register', data);
export const getUsers = () => API.get('/auth/users');

// Services
export const getServices = (category) => API.get('/services' + (category ? `?category=${category}` : ''));
export const getService = (slug) => API.get(`/services/slug/${slug}`);
export const getAllServices = () => API.get('/services/admin/all');
export const createService = (data) => API.post('/services', data);
export const updateService = (id, data) => API.put(`/services/${id}`, data);
export const deleteService = (id) => API.delete(`/services/${id}`);

// Clients
export const getClients = () => API.get('/clients');
export const getAllClients = () => API.get('/clients/admin/all');
export const createClient = (data) => API.post('/clients', data);
export const updateClient = (id, data) => API.put(`/clients/${id}`, data);
export const deleteClient = (id) => API.delete(`/clients/${id}`);

// Messages
export const sendMessage = (data) => API.post('/messages', data);
export const getMessages = (status) => API.get('/messages' + (status ? `?status=${status}` : ''));
export const updateMessage = (id, data) => API.put(`/messages/${id}`, data);
export const deleteMessage = (id) => API.delete(`/messages/${id}`);
export const getMessageStats = () => API.get('/messages/stats/count');

// Team
export const getTeam = () => API.get('/team');
export const getAllTeam = () => API.get('/team/admin/all');
export const createTeamMember = (data) => API.post('/team', data);
export const updateTeamMember = (id, data) => API.put(`/team/${id}`, data);
export const deleteTeamMember = (id) => API.delete(`/team/${id}`);

export default API;
