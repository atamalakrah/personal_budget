const envelopesRouter = require('express').Router();

module.exports = envelopesRouter;

let envelopesDb = []

function updateEnvelopeById(id, updatedEnvelope){
    const index = envelopesDb.findIndex(envelope => envelope.id === id);
    if(index !== -1){
        envelopesDb[index] = {id: envelopesDb[index].id, budget: updatedEnvelope.budget, title: updatedEnvelope.title};
        return true;
    }
    else{
        return false;
    }
}

envelopesRouter.param('id', (req, res, next, id) => {
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

envelopesRouter.put('/:id', (req, res, next) => {
    
    let envelopeUpdate = {id: req.envelope.id, title: req.query.title, budget: req.query.budget};
    console.log('Put test:');
    console.log(envelopeUpdate);
    if(updateEnvelopeById(req.envelope.id, envelopeUpdate)){
        res.status(200).send(envelopeUpdate);
    }
    else{
        res.status(404).send('Envelope update unsuccessful')
    }
    
});