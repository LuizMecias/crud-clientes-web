import axios from 'axios';
import { Dependent } from '../types/Dependent/Dependent';

const API_URL = 'http://10.0.0.7:3000/dependents';

const listDependents = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/list/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const registerDependent = async (data: Dependent) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateDependent = async (id: number, data: Dependent) => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteDependent = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/delete/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const searchDependent = async (id: number, searchInput: string) => {
  try {
    const response = await axios.get(`${API_URL}/search/${id}`, {
      params: {
        searchInput,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  listDependents,
  registerDependent,
  updateDependent,
  deleteDependent,
  searchDependent,
};
