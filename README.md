# Desafio Star Wars API

## Descrição do Projeto

Este projeto é uma aplicação web que permite aos usuários pesquisar personagens do universo Star Wars e marcá-los como favoritos. A aplicação foi construída usando React para o frontend e Express para o backend.

## Funcionalidades

- Pesquisa de personagens pelo nome ou parte do nome
- Marcar e desmarcar personagens como favoritos
- Listar personagens marcados como favoritos

## Tecnologias Utilizadas

### Frontend
- React
- Vite
- Ant Design
- Firebase
- React Router Dom

### Backend
- Node.js
- Express
- Axios
- Apicache
- Nodemon

## Configuração para Instalação

1. Clone o repositório para sua máquina.
2. Em cada aplicação instale as dependências usando `npm install` ou `yarn install`.
3. Em localhost no frontend use `npm run dev` e backend `npm start`

## Utilização

### Endereços do Projeto

- API Backend: [https://desafioswapi.onrender.com/ifaugusto/api/](https://desafioswapi.onrender.com/ifaugusto/api/)
- Frontend: [https://desafio-swapi-ten.vercel.app/](https://desafio-swapi-ten.vercel.app/)  

### Como Usar

1. Abra seu navegador e acesse o endereço do frontend.
2. Use a barra de pesquisa para encontrar personagens pelo nome.
3. Clique no ícone de estrela para marcar ou desmarcar personagens como favoritos.
4. Visualize seus personagens favoritos na seção "Favoritos".

### Backup e Cache

Como uma medida para melhorar a disponibilidade e a confiabilidade, o projeto possui uma rota de backup(swapi.py4e.com) que é acionada caso a API principal da Star Wars (SWAPI.dev) fique indisponível. Se em 10 segundos não houver sucesso na conexão e segue pro backup, durante o desenvovimento do projeto notei indisponibilidade na principal diversas vezes. 
<br/>
Além disso, é utilizado `apicache` para melhorar o desempenho da aplicação, como essa Api está estática, configurei o cache em 1 dia, os dados ficam salvos in momory no servidor de backend.

```javascript
app.get('/ifaugusto/api', async (req, res) => {
 try { 
    const todasAsPaginas = await buscarTodasAsPaginas('https://swapi.dev/api/people/', 10000); 
    res.json(todasAsPaginas); 
  } catch (error) {
    console.error('Erro ao acessar a primeira API Star Wars:', error); 
    try {
      const todasAsPaginasBackup = await buscarTodasAsPaginas('https://swapi.py4e.com/api/people/', 10000);
      res.json(todasAsPaginasBackup); 
    } catch (errorBackup) { 
      console.error('Erro ao acessar a segunda API Star Wars:', errorBackup);
      res.status(500).json({ mensagem: 'Ocorreu um erro no servidor' });
    }
  }
}); ````



