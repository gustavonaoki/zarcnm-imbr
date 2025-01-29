import api from '../api'; // Importa a instância configurada do Axios
import { generateAuthToken } from '../auth/generateAuthToken'; // Função para gerar o token de atutenticação

export const createToken = async (data) => {
  //console.log(data);
  
  try {
    const token = await generateAuthToken(); // Obtém o token de autenticação
    console.log(token);//exibe o token
    
    const response = await api.post('/api/v1/glebas', data, {
      headers: {
        Authorization: `Bearer ${token}`, // Adiciona o token de atutenticação ao cabeçalho
        
      },
    });
    
    return response.data; // Retorna a resposta da API, token da propriedade
  } catch (error) {
    console.error('Erro ao criar o token:', error);
    throw error;
  }
};
