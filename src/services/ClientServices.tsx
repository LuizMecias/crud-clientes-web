import axios from 'axios';
import { Client } from '../types/Client';

const API_URL = 'http://10.0.0.7:3000/clientes';

const getClients = async () => {
  try {
    const response = await axios.get(`${API_URL}/listar`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addClient = async (client: Client) => {
  try {
    const response = await axios.post(`${API_URL}/cadastrar`, client);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateClient = async (cpf: string, client: Client) => {
  try {
    const response = await axios.put(`${API_URL}/atualizar/${cpf}`, client);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteClient = async (cpf: string) => {
  try {
    await axios.delete(`${API_URL}/deletar/${cpf}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const searchClient = async (searchText: string) => {
  try {
    const response = await axios.get(`${API_URL}/buscar`, {
      params: {
        searchText,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getClients, addClient, updateClient, deleteClient, searchClient };
