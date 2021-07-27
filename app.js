const express = require('express');
const app = express();
const competitionRouter = require('./server/routes/competitionRouter');

app.use(express.json());

app.use('/api/competition', competitionRouter);

app.use(express.static(__dirname + '/client'));

app.use((req, res) => res.status(404).send('Not found'));

app.listen(3000, () => console.log('Server started on port 3000...'));
