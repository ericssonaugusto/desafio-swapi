const cors = require('cors') /* permite frontend e banckend */
const express = require('express')
const app = express()
const axios = require('axios')

app.use(cors())

app.get('/ifaugusto/api', async(requisicao, resposta) => {

    try {
    //response é o padrão más {data} já é produto direto
    const { data } = await axios ('https://swapi.dev/api/people/')
    return resposta.json(data)
        
    } catch (error) {
        console.error(error)
    }
})
app.listen('9009')/* define a porta 9009 */ 