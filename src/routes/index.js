const express = require('express');
const router = express.Router();
const path = require('path');
const conectado = require('../database/db')
const session = require('express-session')

const route = __dirname.slice(0,28);
console.log(route)

router.get('/', (req, res) => {
    if( typeof req.session.loggedin != "undefined"){
        if(req.session.loggedin){
            res.render(path.join(route,'views/barraini.html'), {nombre: req.session.name});
        }
        else{
            res.sendFile(path.join(route,'views/barrasinse.html'));
        }
    }
    else{
        res.sendFile(path.join(route,'views/barrasinse.html'));
    }
});

router.get('/iniciar', (req, res) => {
    res.render(path.join(route,'views/iniciar.html'));
});

router.get('/registrar', (req, res) => {
    res.render(path.join(route,'views/registrar.html'));
});

router.get('/rutas', (req, res) => {
    conectado.query('SELECT * FROM rutas',async (error, results)=>{
        if(results.length >0){
            res.render(path.join(route,'views/rutas.html'),{
                nombre:req.session.name,
                array:results
            })
        }else{

        }
    })
});

router.get('/scripts', (req, res) => {
    res.sendFile(path.join(route,'scripts.js'));
});

router.get('/crearrutas', (req, res) => {
    res.sendFile(path.join(route,'scripts/crearrutas.js'));
});

router.get('/verrutas', (req, res) => {
    res.sendFile(path.join(route,'scripts/verrutas.js'));
});

router.get('/dropdownmenu', (req, res) => {
    res.sendFile(path.join(route,'scripts/dropdownmenu.js'));
});

router.get('/agregarruta', (req, res) => {
    if(req.session.loggedin){
        res.render(path.join(route,'views/agregarruta.html'),{nombre: req.session.name});
    }
    else{
        res.redirect("/")
    }
});

router.get('/verificar', (req, res) => {
    res.sendFile(path.join(route,'verificar.js'));
});

router.get('/barrasinse', (req, res) => {
    req.session.loggedin = false;
    req.session.name = "";
    req.session.user = "";
    res.sendFile(path.join(route,'views/barrasinse.html'));
});

router.get('/barraini', (req, res) => {
    if( typeof req.session.loggedin != "undefined"){
        if(req.session.loggedin){
            res.render(path.join(route,'views/barraini.html'), {nombre: req.session.name});
        }
        else{
            res.sendFile(path.join(route,'views/barrasinse.html'));
        }
    }
    else{
        res.sendFile(path.join(route,'views/barrasinse.html'));
    }
});

router.get('/format', (req, res) => {
    res.sendFile(path.join(route,'views/format.css'),);
});

router.post('/register',async(req, res)=>{
    const user = req.body.user;
    const name = req.body.name;
    const pass = req.body.pass;
    if(user!="" || name!="" || pass!=""){
        conectado.query('SELECT * FROM users WHERE user = ?', [user], async (error, results)=>{
            if(results.length == 0){
                conectado.query('INSERT INTO users SET ?', {user:user, name:name , pass:pass}, async(error,result)=>{
                    if(error){
                        console.log(error)
                        res.render(path.join(route,'views/registrar.html'),{
                            alert:true,
                                alertTitle:"Error",
                                alertMessage: "ocurrio un error inesperado",
                                alertIcon: "error",
                                showConfirmButton: true,
                                timer:false
                        });
                    }
                    else{
                        res.redirect("iniciar");
                    }
                })
            }
            else{
                res.render(path.join(route,'views/registrar.html'),{
                    alert:true,
                        alertTitle:"Error",
                        alertMessage: "User ya ocupado",
                        alertIcon: "error",
                        showConfirmButton: true,
                        timer:false
                });
            }
        })
    }
    else{
        res.render(path.join(route,'views/registrar.html'),{
            alert:true,
                alertTitle:"Error",
                alertMessage: "Espacios vacios",
                alertIcon: "error",
                showConfirmButton: true,
                timer:false
        });
    }
})

router.post('/auth',(req, res)=>{
    const user = req.body.user;
    const pass = req.body.pass;
    if(user != "" && pass != ""){
        conectado.query('SELECT * FROM users WHERE user = ?', [user], async (error, results)=>{
            if(results.length == 0 || pass!=results[0].pass || error){
                res.render(path.join(route,'views/iniciar.html'),{
                    alert:true,
                    alertTitle:"Error",
                    alertMessage: "Usuario y/o password incorrecta",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer:false
                });
            }
            else{
                req.session.loggedin = true;
                req.session.name = results[0].name;
                req.session.user = results[0].user;
                res.render(path.join(route,'views/barraini.html'), {nombre: req.session.name});
            }
        })
    }
    else{
        res.render(path.join(route,'views/iniciar.html'),{
            alert:true,
            alertTitle:"Error",
            alertMessage: "Campos vacios",
            alertIcon: "error",
            showConfirmButton: true,
            timer:false
        });
    }
    
})

router.post('/nuevaruta',(req, res)=>{
    const de = req.body.salida;
    const hasta = req.body.llegada;
    const parada = req.body.parada;
    const carro = req.body.carro;
    const fecha = req.body.hora;
    console.log(typeof parada);
    var ruta = JSON.stringify([de,parada,hasta]);
    conectado.query('INSERT INTO rutas SET ?', {ruta:ruta, fecha:fecha, conduc:carro}, async(error,result)=>{
        if(error){
            console.log(error)
            res.render(path.join(route,'views/agregarruta.html'),{
                nombre: req.session.name,
                alert:true,
                    alertTitle:"Error",
                    alertMessage: "ocurrio un error inesperado",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer:false
            });
        }
        else{
            res.render(path.join(route,'views/agregarruta.html'),{
                nombre: req.session.name,
                alert:true,
                    alertTitle:"Success",
                    alertMessage: "Se agrego la nueva ruta correctamente",
                    alertIcon: "success",
                    showConfirmButton: true,
                    timer:false
            });
        }
    })

    //res.redirect("/")
})



module.exports = router;

