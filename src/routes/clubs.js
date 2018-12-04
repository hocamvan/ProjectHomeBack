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
Router.post('/signin', (req, res) => {
    connection.query('select password from club where email = ?', req.body.name, (err, results) => {
        console.log("check", results[0].password);
        if (results[0].password === req.body.password) {
            const tokenInfo = {
                name: req.body.name,
                role: "club"
            }
        }
    })
    if(tokenInfo){
        const token = jwt.sign(tokenInfo, jwtSecret)
        console.log(token);
        res.header("Access-Control-Expose-Headers", "x-access-token")
        res.set('x-access-token', token)
        res.status(200).send({ info: 'user connected' })
    }
    // console.log(req.body);
    // if (req.body.name === 'lolo' && req.body.password === 'chloe') {
    //     const tokenInfo = {
    //         name: req.body.name,
    //         role: "club"
    //     }
    //     const token = jwt.sign(tokenInfo, jwtSecret)
    //     console.log(token);
    //     res.header("Access-Control-Expose-Headers", "x-access-token")
    //     res.set('x-access-token', token)
    //     res.status(200).send({ info: 'user connected' })
    // }
    // res.send("hello")
})
const getToken = req => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        return req.headers.authorization.split(" ")[1]
    }
    return null
}
Router.post('/protected', (req, res) => {
    const token = getToken(req)
    console.log(token);
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).send({ message: "non access" })
        }
        return res.status(200).send({ message: "Donne access" })
    })

})
Router.get('/espaceClub', (req, res) => {
    const token = getToken(req)
    console.log(token);
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).send({ message: "non access" })
        }
        return res.status(200).send({ message: "Donne access" })
    })

})

module.exports = Router;