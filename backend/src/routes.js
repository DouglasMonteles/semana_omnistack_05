const express = require('express');

const routes = express.Router();

// routes.get
routes.get('/', (req, res) => {
    res.send('Hellow Word');
});

module.exports = routes;