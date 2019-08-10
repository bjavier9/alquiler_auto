'user strict';
var sql = require('../config/db');

var Usuario = function (usuario) {
    this.usuario_nombre = usuario.nombre;
    this.usuario_cedula = usuario.cedula;
    this.usuario_telefono = usuario.telefono;
    this.usuario_ubicacion = usuario.ubicacion;
    this.usuario_movil = usuario.movil;
    this.usuario_imagen = usuario.imagen;
    this.usuario_correo = usuario.correo;
    this.usuario_password = usuario.password;
};
Usuario.Verifica_correo = function (correo, result) {
    sql.query("select usuario_nombre FROM usuarios WHERE usuario_correo = ? ", correo, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{                
                result(null, res);
          
            }
        });   
};
Usuario.login_usuario = function (correo, password, result) {
    sql.query("select * FROM usuarios WHERE usuario_correo = ? and usuario_password = ?",  [correo,password], function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{                
                result(null, res);
          
            }
        });   
};
Usuario.crearUsuario = function (nuevoUsuario, result) {
    sql.query("INSERT INTO usuarios set ?", nuevoUsuario, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Usuario.perfil = function (id_usuario, result) {
    sql.query("select * FROM usuarios WHERE usuario_id = ? ", [id_usuario], function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{                
                result(null, res);
          
            }
        });   
};
module.exports = Usuario;