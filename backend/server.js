// Importa as bibliotecas necessárias
const cors = require('cors'); // Biblioteca para lidar com CORS
const express = require('express'); // Biblioteca para criar o servidor
const app = express();
const axios = require('axios'); // Biblioteca para fazer requisições HTTP
const apicache = require('apicache'); // Biblioteca para fazer cache
let cache = apicache.middleware;

const port = 9009; // Porta em que o servidor vai rodar

// Configura o tempo de cache para 7 dias
// Isso significa que os dados ficarão em cache por 7 dias antes de uma nova requisição ser feita à API
app.use(cache('7 days'));

// Ativa o CORS para todas as rotas
app.use(cors());

// Função assíncrona para buscar todas as páginas da API Star Wars
async function buscarTodasAsPaginas(urlInicial) {
  let url = urlInicial;
  const resultados = []; // Array para armazenar todos os resultados

  // Enquanto houver uma URL para buscar, faça uma requisição
  while (url) {
    const { data } = await axios(url);
    resultados.push(...data.results); // Adiciona os resultados no array
    url = data.next; // Pega a próxima URL
  }

  return resultados; // Retorna todos os resultados quando terminar
}

// Rota para acessar os dados
app.get('/ifaugusto/api', async (req, res) => {
  try {
    // Busca todos os dados usando a função buscarTodasAsPaginas
    const todasAsPaginas = await buscarTodasAsPaginas('https://swapi.dev/api/people/');

    // Envia os dados como resposta
    res.json(todasAsPaginas);
  } catch (error) {
    // Em caso de erro, mostra o erro no console e envia uma resposta de erro
    console.error('Erro ao acessar a API Star Wars:', error);
    res.status(500).json({ mensagem: 'Ocorreu um erro no servidor' });
  }
});

// Inicializa o servidor na porta definida
app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});
