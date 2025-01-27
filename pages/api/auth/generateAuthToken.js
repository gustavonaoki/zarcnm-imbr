import axios from 'axios';

// Configuração de autenticação
const AUTH_URL = process.env.AUTH_URL
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD

// Função para gerar o token de autenticação
export const generateAuthToken = async () => {
  try {
    // Montando os parâmetros no formato correto
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);
    params.append('username', USERNAME);
    params.append('password', PASSWORD);

    // Enviando a requisição
    const response = await axios.post(AUTH_URL, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('Token gerado com sucesso:', response.data.access_token); // Log opcional
    return response.data.access_token; // Retorna o token de acesso
  } catch (error) {
    if (error.response) {
      // Erros retornados pelo servidor
      console.error('Erro na resposta da API:', error.response.data);
    } else if (error.request) {
      // Nenhuma resposta foi recebida
      console.error('Nenhuma resposta da API:', error.request);
    } else {
      // Erro na configuração da requisição
      console.error('Erro ao configurar a requisição:', error.message);
    }
    throw error; // Relança o erro para que ele possa ser tratado na chamada
  }
};
