const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = app;

const PORT = process.env.PORT || 3000;

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api.js');
app.use('/api', apiRouter);

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middware for parsing request bodies here:
app.use(bodyParser.json());



// Add your code to start the server listening at PORT below:
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});

/*app.get('/', (req, res, next) => {
    res.send('Hello, world');
}); */