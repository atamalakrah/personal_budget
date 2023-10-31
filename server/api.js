const express = require('express');
const apiRouter = express.Router();

const envelopesRouter = require('./envelope');
apiRouter.use('/envelope', envelopesRouter);

module.exports = apiRouter;