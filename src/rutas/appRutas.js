'use strict';

module.exports = function (app) {
    const passport      	= require('passport');

    const CONFIG = require('../config/config');
const jwt = require('jsonwebtoken');

    var usuarios = require('../controlador/UsuarioControlador');
    var auto = require('../controlador/AutoControlador');
    var factura = require('../controlador/FacturaControlador');
/* 
    frank sinatra-i love you baby
    @I love you baby
    And if it's quite all right
    I need you baby
    To warm the lonely nights
    I love you baby
    Trust in me when I say
*/
  
   
        // rutas sin proteccion        
    app.route('/login')
        .post(usuarios.login_usuario)
    app.route('/autos')
        .get(auto.todos_autos)    
    app.route('/autos/:autoId')
        .get(auto.un_auto)
    
        //  rutas protegidas   
    app.route('/test')
            .get(passport.authenticate('jwt', {session:false}), usuarios.test)
    
    //autos       
    app.route('/autos')
        .post(passport.authenticate('jwt', {session:false}),auto.crear_auto)
    app.route('/alquiler')
        .get(passport.authenticate('jwt', {session:false}),auto.alquiler_auto)
    app.route('/autos/all/:autoId')
        .get(passport.authenticate('jwt', {session:false}),auto.alquiler_un_auto)
        //usuario
    app.route('/usuario')
            .post(usuarios.crear_usuario)
    app.route('/usuario/:token')
        .get(usuarios.perfil_usuario)
    // factura
    app.route('/alquilar/:fecha/:auto/:token')
            .get(factura.generar_factura)
    // costos antes de alquilar
    app.route('/alquilar/:fecha/:auto')
            .get(passport.authenticate('jwt', {session:false}),factura.generar_costo)
    app.route('/alquilar/:token')
            .get(factura.mis_facturas) 
    app.route('/valido/:token')
            .get(function(req, res) {
                jwt.verify(req.params.token, CONFIG.jwt_encryption, function (err, decoded) {if (err) {
                    res.status(400).send({ valido: false, })
                }else{
                    res.status(200).send({ valido: true, })
                }  })})
                
                   
                    
}
