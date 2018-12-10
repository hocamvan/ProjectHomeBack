const express = require('express');
const connection = require('../helper/conf')
const router = express.Router();
const tables = ['club', 'order', 'project_has_sponsor','project','sponsor'];
const isTableNotAuthorized = (table) => {
    return !tables.includes(table.toLowerCase());
};
router.get('/:table', (req, res) => {
    if (isTableNotAuthorized(req.params.table)) {
        res.send(400);
        return;
    }
    connection.query('SELECT * from ' + req.params.table, (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des' + req.params.table);
        } else {
            res.json(results);
        }
    });
})

router.get('/:table/:id', (req, res) => {
    if (isTableNotAuthorized(req.params.table)) {
        res.send(400);
        return;
    }
    console.log({ r: req.params });
    connection.query('SELECT * from ' + req.params.table + ' where id=?', req.params.id, (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des' + req.params.table);
        } else {
            res.json(results);
        }
    });
})
router.post('/:table', (req, res) => {
    if (isTableNotAuthorized(req.params.table)) {
        res.send(400);
        return;
    }
    connection.query('INSERT into ' + req.params.table + ' SET ?', req.body, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la sauvegarde d'un " + req.params.table);
        }
        else {
            const insertId = results.insertId;
            res.sendStatus(200).send({ insertId });
        }
    })
});
router.put('/:table/:id', (req, res) => {
    const idEmployee = req.params.id;
    const formData = req.body;
    console.log({ formData });
    formData.updated_at = new Date();
    console.log({ formData });
    if (isTableNotAuthorized(req.params.table)) {
        res.send(400);
        return;
    }
    connection.query('UPDATE ' + req.params.table + ' SET ? WHERE id = ?', [formData, idEmployee], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la modification d'un " + req.params.table);
        } else {
            const affectedRows = results.affectedRows;
            res.sendStatus(200).send({ affectedRows });
        }

    })
})
router.delete('/:table/:id', (req, res) => {
    if (isTableNotAuthorized(req.params.table)) {
        res.send(400);
        return;
    }
    connection.query('DELETE FROM ' + req.params.table + ' WHERE id =?', req.params.id, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la modification d'un " + req.params.table);
        } else {
            const affectedRows = results.affectedRows;
            res.sendStatus(200).send({ affectedRows });
        }

    })
})

module.exports = router;