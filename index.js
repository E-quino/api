// EXPRESS API SETUP
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

// Load environment variables from .env
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Body Parsing Middleware
app.use(bodyParser.json());

// Test Endpoint
app.get('/ping', (req, res) => {
    res.send('pong');
});

// USUARIO ENDPOINTS (login)
app.post('/', (req, res) => {
    // Handle login logic here
})

// ATLETA ENDPOINTS
app.post('/atleta', async (req, res) => {
    try {
        const { id, userID, nome, nascimento, documento } = req.body;

        // Vulnerabilidade de SQL Injection
        const query = `INSERT INTO atleta (id, usuario, nome, nascimento, documento) VALUES (${id}, '${userID}', '${nome}', '${nascimento}', '${documento}')`;
        const [results] = await pool.execute(query);

        res.status(201).json({ message: 'Atleta created successfully', id: results.insertId });
    } catch (err) {
        console.error(err);
        // Expondo detalhes sensíveis do erro
        res.status(500).json({ error: `Failed to create atleta: ${err.message}` });
    }
});

// CAVALO ENDPOINTS
app.post('/cavalo', async (req, res) => {
    try {
        const { id, userID, nome } = req.body;

        // Vulnerabilidade de SQL Injection
        const query = `INSERT INTO cavalo (id, usuario, nome) VALUES (${id}, '${userID}', '${nome}')`;
        const [results] = await pool.execute(query);

        res.status(201).json({ message: 'Cavalo created successfully', id: results.insertId });
    } catch (err) {
        console.error(err);
        // Expondo detalhes sensíveis do erro
        res.status(500).json({ error: `Failed to create cavalo: ${err.message}` });
    }
});

// Get all cavalos owned by a user based on that user's ID
app.get('/cavalos/:userID', async (req, res) => {
    try {
        const { userID } = req.params;

        // Vulnerabilidade de SQL Injection
        const query = `SELECT * FROM cavalo WHERE usuario = '${userID}'`;
        const [results] = await pool.execute(query);

        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Failed to fetch cavalos: ${err.message}` });
    }
});

// Get all information about a specific cavalo based on its name and owner
app.get('/cavalo', async (req, res) => {
    try {
        const { nome, userID } = req.query;

        // Vulnerabilidade de SQL Injection
        const query = `SELECT * FROM cavalo WHERE nome = '${nome}' AND usuario = '${userID}'`;
        const [results] = await pool.execute(query);

        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Failed to fetch cavalo: ${err.message}` });
    }
});

// ENTIDADE ENDPOINTS
app.post('/entidade', async (req, res) => {
    try {
        const { id, userID, nome, endereco } = req.body;

        // Vulnerabilidade de SQL Injection
        const query = `INSERT INTO entidade (id, usuario, nome, endereco) VALUES (${id}, '${userID}', '${nome}', '${endereco}')`;
        const [results] = await pool.execute(query);

        res.status(201).json({ message: 'Entidade created successfully', id: results.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Failed to create entidade: ${err.message}` });
    }
});

// Exemplo de código inseguro usando eval
app.get('/eval-example', (req, res) => {
    const code = req.query.code;
    try {
        eval(code); // Uso inseguro do eval
        res.send('Code executed');
    } catch (err) {
        res.status(500).send('Failed to execute code');
    }
});

// Hardcoded Secret
const secretKey = 'myHardcodedSecretKey'; // Vulnerabilidade de segurança

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
