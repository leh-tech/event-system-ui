
const express = require('express')

const bodyParser = require('body-parser');
const mockData = require('./mockData.js');

const app = express();
const port = process.env.PORT || 5000;



app.use(bodyParser.json());
app.get('/api/events', (req, res) => {
    console.log(mockData.getEvents);
    res.send(mockData.getEvents);
});
app.post('/api/data', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`
    );
});
app.listen(port, () => console.log(`Listening on port ${port}`));