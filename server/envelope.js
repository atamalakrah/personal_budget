const envelopesRouter = require('express').Router();

module.exports = envelopesRouter;

let envelopesDb = []

envelopesRouter.post('/', (req, res, next) => {
    const id = req.query.id;
    const budget = req.query.budget;
    const title = req.query.title;
    const envelope = {id: id, budget: budget, title: title};
    envelopesDb.push(envelope);
    res.status(201).send(envelope);
});

envelopesRouter.get('/', (req, res, next) => {
    res.send(envelopesDb);
});
