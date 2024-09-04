import axios from 'axios';

const API_URL = 'http://10.0.0.7:3000/clients';

const listClients = async () => {
  try {
    const response = await axios.get(`${API_URL}/report`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { listClients };
