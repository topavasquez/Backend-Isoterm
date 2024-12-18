const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db');
const emailRoutes = require('./emailRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const PORT = 4000;

app.get('/', (req, res) => {
    res.send('API funcionando');
});

app.post('/api/create', async (req, res) => {
    const { name, lastname, email, title, description, number } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO contactos (name, lastname, email, title, description, number) VALUES (?, ?, ?, ?, ?, ?)',
            [name, lastname, email, title, description, number]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        console.error('Error al crear el registro:', error);
        res.status(500).json({ error: `Error al crear el registro: ${error.message}` });
    }

});

app.get('/api/read', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM contactos');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los registros' });
    }
});

app.use('/api', emailRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});