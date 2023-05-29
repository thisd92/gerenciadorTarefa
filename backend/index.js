const express = require('express');
const app = express();
const port = 8090;

app.get('/', (req, res) => {
    res.send("GET");
});

app.post('/', (req, res) => {
    res.send('POST')
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