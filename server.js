const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, este es el back netu')
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el url hhtp;//localhost:${port}`);
});


