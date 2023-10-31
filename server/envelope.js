const envelopesRouter = require('express').Router();

module.exports = envelopesRouter;

let envelopesDb = []

envelopesRouter.param('id', (req, res, next, id) => {
    console.log('got here');
    const envelope = envelopesDb.find(envelope => envelope.id === parseInt(id));
    console.log(envelope);
    if(envelope){
        req.envelope = envelope;
        next();
    }
    else{
        res.status(404).send();
    }
});

envelopesRouter.post('/', (req, res, next) => {
    const budget = req.query.budget;
    const title = req.query.title;
    const envelope = {id: envelopesDb.length, budget: budget, title: title};
    envelopesDb.push(envelope);
    res.status(201).send(envelope);
    }
);

envelopesRouter.get('/', (req, res, next) => {
    res.send(envelopesDb);
});

envelopesRouter.get('/:id', (req, res, next) => {
    res.send(req.envelope);
});