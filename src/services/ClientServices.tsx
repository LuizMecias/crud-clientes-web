import axios from 'axios';
import { Client } from '../types/Client/Client';

const API_URL = 'http://10.0.0.7:3000/clients';

const listClients = async () => {
  try {
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const registerClient = async (data: Client) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateClient = async (id: number, data: Client) => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteClient = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/delete/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const searchClient = async (searchInput: string) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
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
  listClients,
  registerClient,
  updateClient,
  deleteClient,
  searchClient,
};
