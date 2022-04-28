const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

//dotenv var.entorno
const dotenv = require("dotenv");
dotenv.config({path:path.join(__dirname,'/env/.env')})

//configuracion
app.set('port', 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//var.session
const session = require('express-session')
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized:true
}));

//DB
const conectado = require('./database/db')

//rutas
app.use(require('./routes/index.js'));

//recursos
app.use('/recursos', express.static('recursos'));
app.use('/recursos', express.static(path.join(__dirname,'/recursos')));


//server
app.listen(app.get('port'),()=>{
    console.log("server on :"+app.get('port'));
});


