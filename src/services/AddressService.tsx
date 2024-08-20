import axios from 'axios';
import { Address } from '../types/Address/Address';

const API_URL = 'http://10.0.0.7:3000/addresses';

const listAddresses = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/list/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const registerAddress = async (data: Address) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateAddress = async (id: number, data: Address) => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteAddress = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/delete/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const searchAddress = async (id: number, searchInput: string) => {
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
  listAddresses,
  registerAddress,
  updateAddress,
  deleteAddress,
  searchAddress,
};
