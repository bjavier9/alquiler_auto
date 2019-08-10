'user strict';
var sql = require('../config/db');
var Factura = function (factura) {
    
  };

Factura.generar_factura = function (fecha, auto, usuario, result) {
    sql.query("call genera_factura(?,?,?)",  [fecha,auto,usuario], function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{                
                result(null, res);
          
            }
        });   
};

Factura.generar_costos = function(fecha, auto, result){
    sql.query("call genera_costo(?,?)",[fecha,auto], function(err,res){
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{                
            result(null, res);
      
        }
    })
}
Factura.mis_facturas = function(id, result){
    sql.query("SELECT f.factura_id,  f.tiempo_inicial, f.tiempo_final, f.factura_costo, a.auto_modelo, a.auto_marca FROM factura f inner join autos a on a.auto_id = f.auto_id where usuario_id=?",id, function(err,res){
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{                
            result(null, res);
      
        }
    })
}
module.exports = Factura;