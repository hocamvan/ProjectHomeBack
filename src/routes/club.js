const express = require('express');
const connection = require('../helper/conf.js');
const jwt = require('jsonwebtoken');

const Router = express.Router();
const jwtSecret = require('../../jwtSecret');

Router.get('/', (req, res) => {
    connection.query('SELECT * from club', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des employés');
        } else {
            res.json(results);
        }
    });
})

module.exports = Router;