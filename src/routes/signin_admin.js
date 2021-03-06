const express = require('express');
const connection = require('../helper/conf.js');
const jwt = require('jsonwebtoken');

const Router = express.Router();
const jwtSecret = require('../../jwtSecret');

Router.post('/', (req, res) => {
    connection.query('select password,id from user where email = ?', req.body.email, (err, results) => {
        if (results.length !== 0) {
            if (results[0].password === req.body.password) {
                const tokenInfo = {
                    email: req.body.email,
                    role: "admin"
                }
                if (tokenInfo) {
                    const token = jwt.sign(tokenInfo, jwtSecret)
                    console.log(token);
                    res.header("Access-Control-Expose-Headers", "x-access-token")
                    res.set('x-access-token', token)
                }
                res.status(200).send({
                    info: 'user connected',
                });
            }
            if (results[0].password !== req.body.password) {
                res.status(204)
            }
        }
        else {
            res.status(403)
        }

    })
})

module.exports = Router;