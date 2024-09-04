import axios from 'axios';
import { Order } from '../types/order_product/order/Order';

const API_URL = 'http://10.0.0.7:3000/orders';

const listOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const registerOrder = async (data: Order) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateOrder = async (id: number, data: Order) => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteOrder = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/delete/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const searchOrder = async (searchInput: string) => {
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

export { listOrders, registerOrder, updateOrder, deleteOrder, searchOrder };
