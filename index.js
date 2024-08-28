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

// Generic function to insert data into a table
async function insertIntoTable(table, fields, values) {
    const query = `INSERT INTO ${table} (${fields.join(', ')}) VALUES (${fields.map(() => '?').join(', ')})`;
    const [results] = await pool.execute(query, values);
    return results;
}

// Generic function to select data from a table
async function selectFromTable(table, conditions = {}, orderBy = '') {
    let query = `SELECT * FROM ${table}`;
    const values = [];

    if (Object.keys(conditions).length) {
        const whereClauses = Object.keys(conditions).map(field => {
            values.push(conditions[field]);
            return `${field} = ?`;
        });
        query += ` WHERE ${whereClauses.join(' AND ')}`;
    }

    if (orderBy) {
        query += ` ORDER BY ${orderBy}`;
    }

    const [results] = await pool.execute(query, values);
    return results;
}

// POST endpoints for various entities
app.post('/:entity', async (req, res) => {
    try {
        const entity = req.params.entity;
        const data = req.body;
        const fields = Object.keys(data);
        const values = Object.values(data);

        const results = await insertIntoTable(entity, fields, values);

        res.status(201).json({ message: `${entity.charAt(0).toUpperCase() + entity.slice(1)} created successfully`, id: results.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Failed to create ${req.params.entity}` });
    }
});

// GET endpoints to retrieve all records for a user ID
app.get('/:entity/:userID', async (req, res) => {
    try {
        const { entity, userID } = req.params;
        const results = await selectFromTable(entity, { usuario: userID });

        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Failed to fetch ${entity}` });
    }
});

// GET endpoints to retrieve a specific record based on its name and user ID
app.get('/:entity', async (req, res) => {
    try {
        const { entity } = req.params;
        const { nome, userID } = req.query;
        const results = await selectFromTable(entity, { nome, usuario: userID });

        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Failed to fetch ${entity}` });
    }
});

// GET endpoint to retrieve the closest event
app.get('/evento/closest', async (req, res) => {
    try {
        const results = await selectFromTable('evento', {}, 'inicio ASC LIMIT 1');
        res.status(200).json(results[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch closest event' });
    }
});

// GET endpoint to retrieve all events, ordered by closest date first
app.get('/eventos', async (req, res) => {
    try {
        const results = await selectFromTable('evento', {}, 'inicio ASC');
        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
