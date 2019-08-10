'use strict';

var Usuario = require('../modelo/UsuarioModelo');
const CONFIG = require('../config/config'); 
const jwt = require('jsonwebtoken');

/** 
 * Lenny Kravitz - Again
 * I been searching for you
I heard a cry within my soul
I never had a yearning quite like this before
Now that you are walking right through my door
 * */
exports.login_usuario = function(req, res) {
  const {correo,password} = req.body;
  Usuario.login_usuario(correo, password, function(err, resp) {
    if (err)
      res.send(err);
      if(resp.length == 0){
        res.status(401).send({ error: true, message: 'Usuario o Correo incorrectos.' });
      }else{
       let user; 
       let rol; 
       let id_usuario; 
       let correo; 
       let cedula;
       user = resp[0];
       id_usuario = user.usuario_id;
       correo = user.usuario_correo;
       cedula = user.usuario_cedula;
       rol = user.usuario_rol;
      let payload = { id_usuario, correo, cedula, rol };
      let token = jwt.sign(payload, CONFIG.jwt_encryption,{ expiresIn: '1h' });
      var decoded = jwt.verify(token, CONFIG.jwt_encryption);

        console.log(decoded)
        res.json({ msg: 'ok', token: token, rol:decoded.rol });
      }
    
  });
};

exports.perfil_usuario = function(req,res){
  jwt.verify(req.params.token, CONFIG.jwt_encryption, function(err, decoded) {
    if (err) {
      res.status(400).send({ error: true, message: 'Error de token' });
    }else{
Usuario.perfil(decoded.id_usuario,  function(err, resp) {
    if (err)
      res.send(err);
      // verificamo el correo papu
      if(resp.length == 0)res.status(400).send({ error: true, message: 'Error de token' });
      res.json(resp[0]);
  })
    }
  });
  

}


exports.crear_usuario = function (req, res) {
  var Nuevo_usuario = new Usuario(req.body);
  Usuario.Verifica_correo(Nuevo_usuario.usuario_correo, function(err, resp) {
    if (err)
      res.send(err);
      // verificamo el correo papu
      if(resp.length == 0){
        if (!Nuevo_usuario.usuario_nombre || !Nuevo_usuario.usuario_cedula || !Nuevo_usuario.usuario_telefono || !Nuevo_usuario.usuario_movil || !Nuevo_usuario.usuario_imagen||!Nuevo_usuario.usuario_password||!Nuevo_usuario.usuario_correo) {

          res.status(400).send({ error: Nuevo_usuario, message: 'Faltan datos' });
      
        }
        else {
      
          Usuario.crearUsuario(Nuevo_usuario, function (err, usuario) {
      
            if (err)
              res.send(err);
            res.json(usuario);
          });
        }
      }else{
        // retornomos el mensaje de que ya existe este correo
        res.status(401).send({ error: true, message: 'Este correo ya existe.' });
      }
 
  });
  

};
exports.test = function (req, res) {
    res.status(200).send({message: 'bien perro.' });
  }
