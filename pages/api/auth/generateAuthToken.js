import axios from 'axios';

// Configuração de autenticação

const AUTH_URL = process.env.AUTH_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const USERNAME_IMBR = process.env.USERNAME_IMBR
const PASSWORD_IMBR = process.env.PASSWORD_IMBR
const validateEnvVariables = () => {
  if (!AUTH_URL || !CLIENT_ID || !CLIENT_SECRET || !USERNAME || !PASSWORD || !PASSWORD_IMBR || !USERNAME_IMBR ) {
    throw new Error('Erro: Variáveis de ambiente ausentes. Verifique o arquivo .env.local', {
      AUTH_URL: process.env.AUTH_URL,
      CLIENT_ID: process.env.CLIENT_ID,
      CLIENT_SECRET: process.env.CLIENT_SECRET,
      USERNAME: process.env.USERNAME,
      PASSWORD: process.env.PASSWORD,
      USERNAME_IMBR: process.env.USERNAME_IMBR,
      PASSWORD_IMBR: process.env.PASSWORD_IMBR,
    });
  }
};

// Função para gerar o token de autenticação
//função nova
export const generateAuthToken = async () => {
  try {
    validateEnvVariables()
    const response = await axios.post("/api/proxy", {
      username: USERNAME_IMBR,
      password: PASSWORD_IMBR,
    });

    //console.log("Token recebido:", response.data.token);
    return response.data.token;
  } catch (error) {
    console.error("Erro ao obter token:", error);
    return null;
  }
};


// Função para gerar o token de autenticação

// FUNÇÃO ANTIGA
/*export const generateAuthToken = async () => {
  try {
    validateEnvVariables();

    // Montando os parâmetros no formato correto
    const params = new URLSearchParams({
      grant_type: 'password',
      client_id:  CLIENT_ID,
      client_secret: CLIENT_SECRET,
      username: USERNAME,
      password: PASSWORD,
    });

    // Enviando a requisição
    const response = await axios.post(AUTH_URL, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log('Token Gerado com sucessos');
    
    //console.log('Token gerado com sucesso:', response.data.access_token); // Log opcional
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
};*/
