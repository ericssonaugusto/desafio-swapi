const cors = require('cors');
const express = require('express');
const app = express();
const axios = require('axios');
const apicache = require('apicache');
let cache = apicache.middleware;

const port = 9009;

app.use(cache('7 day'));
app.use(cors());

const swapi = 'https://swapi.dev/api/people/';

app.get('/ifaugusto/api', async (req, res) => {
    try {
        console.log('Tentando acessar a API Star Wars');
        const { data } = await axios(swapi);
        console.log('Dados recebidos com sucesso');
        return res.json(data);
    } catch (error) {
        console.error('Erro ao acessar a API Star Wars:', error);
        return res.status(500).json({ mensagem: 'Ocorreu um erro no servidor' });
    }
});

app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`);
});
