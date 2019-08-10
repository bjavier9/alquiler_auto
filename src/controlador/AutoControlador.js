'use strict';

var Auto = require('../modelo/AutoModelo');


/** 
 * The Beatles - Yesterday
 
All my troubles seemed so far away
Now it looks as though they're here to stay
Oh, I believe in yesterday
 * */


exports.crear_auto = function (req, res) {
  var nuevoAuto = new Auto(req.body);
  Auto.Verifica_modelo(nuevoAuto.auto_modelo, nuevoAuto.auto_year, function(err, resp) {
    if (err)
      res.send(err);
      // verificamo el correo papu
      if(resp.length == 0){
        if (!nuevoAuto.auto_descripcion||!nuevoAuto.auto_marca||!nuevoAuto.auto_year||!nuevoAuto.auto_categoria||!nuevoAuto.auto_modelo||!nuevoAuto.auto_imagen||!nuevoAuto.auto_precio) {

          res.status(400).send({ error: true, message: 'Faltan datos' });
      
        }
        else {
      
          Auto.crearAuto(nuevoAuto, function (err, auto) {
      
            if (err)
              res.send(err);
            res.json(auto);
          });
        }
      }else{
        // retornomos el mensaje de que ya existe este correo
        res.status(401).send({ error: true, message: 'Este modelo ya existe' });
      }
 
  });
  

};

exports.un_auto = function(req, res) {
    Auto.un_auto(req.params.autoId, function(err, auto) {
      if (err)
        res.send(err);
      res.json(auto);
    });
  };

  exports.todos_autos= function(req, res) {
    Auto.todos_autos(function(err, auto) {
  
      console.log('controller')
      if (err)
        res.send(err);
        console.log('res', auto);
      res.send(auto);
    });
  };

  exports.alquiler_un_auto = function(req, res) {
    Auto.alquiler_un_auto(req.params.autoId, function(err, auto) {
      if (err)
        res.send(err);
      res.json(auto);
    });
  };
  
  exports.alquiler_auto= function(req,res) {
    Auto.alquiler_auto(function(err, auto) { 
      console.log(auto);      
      if (err)
        res.send(err);
        
      res.send(auto);
    });
  };

  