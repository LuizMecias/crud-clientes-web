import axios from 'axios';
import { Adress } from '../types/Adress';

const API_URL = 'http://10.0.0.7:3000/addresses';

const getAdresses = async (clienteCpf: string) => {
  try {
    const response = await axios.get(`${API_URL}/listar/${clienteCpf}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addAdress = async (data: Adress) => {
  try {
    const response = await axios.post(`${API_URL}/cadastrar`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateAdress = async (id: number, data: Adress) => {
  try {
    const response = await axios.put(`${API_URL}/atualizar/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteAdress = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/deletar/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const searchAdress = async (clienteCpf: string, searchInput: string) => {
  try {
    const response = await axios.get(`${API_URL}/buscar/${clienteCpf}`, {
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

export { getAdresses, addAdress, updateAdress, deleteAdress, searchAdress };
