const envelopesRouter = require('express').Router();

module.exports = envelopesRouter;

let envelopesDb = [];
let idCounter = 0;

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

function deleteEnvelopeById(id){
    const index = envelopesDb.findIndex(envelope => envelope.id === id);
    if(index !== -1){
        envelopesDb = envelopesDb.filter(envelope => envelope.id !== index);
        return true;
    }
    else{
        return false;
    }
}

envelopesRouter.param('id', (req, res, next, id) => {
    const envelope = envelopesDb.find(envelope => envelope.id === parseInt(id));
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
    const envelope = {id: idCounter, budget: budget, title: title};
    idCounter += 1;
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
    if(updateEnvelopeById(req.envelope.id, envelopeUpdate)){
        res.status(200).send(envelopeUpdate);
    }
    else{
        res.status(404).send('Envelope update unsuccessful')
    }
});

envelopesRouter.delete('/:id', (req, res, next) => {
    if(deleteEnvelopeById(req.envelope.id)){
        res.status(204).send();
    }
    else{
        res.status(404).send('Envelope Id not found');
    }
})