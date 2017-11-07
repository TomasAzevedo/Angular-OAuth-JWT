const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
})

console.log('Servidor rodando na porta 4200.');

app.listen(process.env.PORT || 4200);

