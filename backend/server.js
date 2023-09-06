const cors = require('cors'); 
const express = require('express'); 
const axios = require('axios'); 
const apicache = require('apicache'); 

const app = express(); 
const port = 9009; 
let cache = apicache.middleware;

app.use(cache('1 day')); 
app.use(cors()); 

async function buscarTodasAsPaginas(urlInicial, tempoLimite) { 
  let url = urlInicial;
  const resultados = [];

  while (url) {
    const { data } = await axios.get(url, { timeout: tempoLimite });
    resultados.push(...data.results); 
    url = data.next; 
  }

  return resultados; 
}

app.get('/ifaugusto/api', async (req, res) => { 
  try { 
    const todasAsPaginas = await buscarTodasAsPaginas('https://swapi.dev/api/people/', 10000); // 10 segundos
    res.json(todasAsPaginas); 
  } catch (error) {
    console.error('Erro ao acessar a primeira API Star Wars:', error); 
    try {
      const todasAsPaginasBackup = await buscarTodasAsPaginas('https://swapi.py4e.com/api/people/', 10000); // 10 segundos como plano B
      res.json(todasAsPaginasBackup); 
    } catch (errorBackup) { 
      console.error('Erro ao acessar a segunda API Star Wars:', errorBackup);
      res.status(500).json({ mensagem: 'Ocorreu um erro no servidor' });
    }
  }
}); 

app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});
