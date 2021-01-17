const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('./dist/UI'));

app.get('*', (req, res) => {
    res.sendFile(`./UI/documentation/index.html`);
});

app.listen(process.env.PORT || 8080);
