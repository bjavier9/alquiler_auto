'user strict';
var sql = require('../config/db');

/*
Extreme - More Than Words 
How easy
It would be to
Show me how you feel
More than words
Is all you have to do
To make it real
Then you wouldn't
Have to say
That you love me
Cause I'd already know
*/

var Auto = function (auto) {
 
  this.auto_marca = auto.marca;
  this.auto_year = auto.year;
  this.auto_categoria  = auto.categoria;
  this.auto_modelo = auto.modelo;
  this.auto_imagen = auto.imagen;
  this.auto_precio = auto.precio;
  this.auto_descripcion = auto.descripcion;
  
};
Auto.Verifica_modelo = function (modelo,year, result) {
    sql.query("SELECT auto_modelo FROM autos WHERE auto_modelo = ? and  auto_year = ? ", [modelo, year], function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{                
                result(null, res);
          
            }
        });   
};
Auto.crearAuto = function (newCar, result) {
    sql.query("INSERT INTO autos set ?", newCar, function (err, res) {

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
Auto.todos_autos = function (result) {
    sql.query("Select auto_descripcion, auto_id, auto_marca, auto_year, auto_categoria, auto_modelo, auto_imagen, auto_precio from autos limit 10", function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
              console.log('autos : ', res);  

             result(null, res);
            }
        });   
};
Auto.un_auto = function (autos_id, result) {
    sql.query("select auto_descripcion, auto_id, auto_marca, auto_year, auto_categoria, auto_modelo, auto_imagen, auto_precio from autos where auto_id = ? ", autos_id, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};

Auto.alquiler_auto = function(result){
    sql.query("select a.auto_descripcion, a.auto_id, a.auto_marca, a.auto_modelo, a.auto_year, a.auto_categoria, a.auto_imagen, a.auto_precio, d.disponible_cantidad from autos a inner join disponibles d on a.auto_id = d.auto_id", function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
          console.log('autos: ', res);  

         result(null, res);
        }
    });  
}
Auto.alquiler_un_auto = function (autos_id, result) {
    sql.query("select a.auto_descripcion, a.auto_modelo, a.auto_id, a.auto_marca, a.auto_year, a.auto_categoria, a.auto_imagen, a.auto_precio, d.disponible_cantidad from autos a inner join disponibles d on a.auto_id = d.auto_id where a.auto_id = ? ", autos_id, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};


module.exports = Auto;