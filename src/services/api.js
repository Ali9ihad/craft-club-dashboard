// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getMembers = () => axios.get(`${API_URL}/members`);
export const addMember = (member) => axios.post(`${API_URL}/members`, member);
export const deleteMember = (id) => axios.delete(`${API_URL}/members/${id}`);

export const getTeams = () => axios.get(`${API_URL}/teams`);
export const addTeam = (team) => axios.post(`${API_URL}/teams`, team);
export const markTeamAsFinished = (id) => axios.put(`${API_URL}/teams/${id}`);
export const deleteTeam = (id) => axios.delete(`${API_URL}/teams/${id}`);

export const getStatus = () => axios.get(`${API_URL}/status`);
export const addStatus = (status) => axios.post(`${API_URL}/status`, status);
