const express = require('express');
const router = express.Router();
const path = require('path');

const route = __dirname.slice(0,28);
console.log(route)

router.get('/', (req, res) => {
    res.render(path.join(route,'views/index.html'));
});

router.get('/iniciar', (req, res) => {
    res.render(path.join(route,'views/iniciar.html'));
});

router.get('/registrar', (req, res) => {
    res.render(path.join(route,'views/registrar.html'));
});

router.get('/scripts', (req, res) => {
    res.sendFile(path.join(route,'scripts.js'));
});

router.get('/verificar', (req, res) => {
    res.sendFile(path.join(route,'verificar.js'));
});

router.get('/barrasinse', (req, res) => {
    res.sendFile(path.join(route,'views/barrasinse.html'));
});

router.get('/barraini', (req, res) => {
    res.render(path.join(route,'views/barraini.html'),{nombre : "nombrea"});
});

router.get('/format', (req, res) => {
    res.sendFile(path.join(route,'views/format.css'),);
});

router.get('/bootstrap', (req, res) => {
    res.sendFile(path.join(route,'views/bootstrap.css'),);
});

router.get('/bootstrap.min', (req, res) => {
    res.sendFile(path.join(route,'views/bootstrap.min.css'),);
});

router.post()



module.exports = router;

