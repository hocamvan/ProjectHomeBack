const express = require('express');
const connection = require('../helper/db.js')
const Router = express.Router();

Router.get ('/', (req,res) => {
    connection.query('SELECT * from user', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des employés');
        } else {
            res.json(results);
        }
    });
})

module.exports = Router;