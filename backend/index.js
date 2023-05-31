const express = require('express');
const app = express();
const cors = require('cors')
const port = 8090;

const corsOptions = {
  origin: 'http://localhost:"3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/', (req, res) => {
    res.send("GET");
});

app.get('/users', (req, res) => {
    res.send("Usuários");
});

app.post('/', cors(corsOptions), (req, res) => {
    res.send('POST')
})

app.post('/login', cors(corsOptions), (req, res) => {
    res.send('Usuário enviado')
})

app.put('/user', (req, res) => {
    res.send('PUT')
})

app.delete('/user', (req, res) => {
    res.send('DELETE')
})

app.listen(port, () => {
    console.log(`Listening app on port ${port}`)
})