import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.zarcnm.cnptia.embrapa.br', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
