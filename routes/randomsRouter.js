const express = require('express');
const router = express.Router();
const Random = require('../js/randoms');
const random = new Random();
const {fork} = require('child_process');


router.get('/',(req, res) => {
    if(!isNaN(req.query.cant) || !req.query.cant){
        // const forked = fork('../js/randoms.js');
        // forked.on('message',msg => {
        //     if(msg == 'listo'){
        //         forked.send(req.query.cant);
        //         forked.on('mensaje',(data) => {
        //             res.send({"Numeros Random" : data});
        //         });
        //     }
        // });
        const data = random.generarRandom(req.query.cant);
        res.send({'Numeros Aleatorios' : data})
    }else{
        res.send({Error: 'por favor ingresar un numero'});
    }
});

module.exports = router;