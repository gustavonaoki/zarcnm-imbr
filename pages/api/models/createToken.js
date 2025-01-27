import api from '../api'; // Importa a instância configurada do Axios
import { generateAuthToken } from '../auth/generateAuthToken'; // Função para gerar o token

export const createToken = async (data) => {
  try {
    const token = await generateAuthToken(); // Obtém o token de autenticação

    const response = await api.post('/api/v1/glebas', data, {
      headers: {
        Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
        
      },
    });
    
    return response.data; // Retorna a resposta da API
  } catch (error) {
    console.error('Erro ao criar o token:', error);
    throw error;
  }
};
