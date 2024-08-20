import axios from 'axios';
import { Phone } from '../types/Phone/Phone';

const API_URL = 'http://10.0.0.7:3000/phones';

const listPhones = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/list/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const registerPhone = async (data: Phone) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updatePhone = async (id: number, data: Phone) => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deletePhone = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/delete/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const searchPhone = async (id: number, searchInput: string) => {
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

export { listPhones, registerPhone, updatePhone, deletePhone, searchPhone };
