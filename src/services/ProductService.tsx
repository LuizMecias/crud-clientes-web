import axios from 'axios';
import { Product } from '../types/order_product/product/Product';

const API_URL = 'http://10.0.0.7:3000/products';

const listProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const registerProduct = async (data: Product) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateProduct = async (id: number, data: Product) => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteProduct = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/delete/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const searchProduct = async (searchInput: string) => {
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
  listProducts,
  registerProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};
