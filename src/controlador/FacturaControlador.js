
'use strict';

var Factura = require('../modelo/FacturaModelo');
const CONFIG = require('../config/config');
const jwt = require('jsonwebtoken');

exports.generar_factura = function (req, res) {
  jwt.verify(req.params.token, CONFIG.jwt_encryption, function (err, decoded) {
    if (err) {
      res.status(400).send({ error: true, message: 'Error de token' })
    } else {
      Factura.generar_factura(req.params.fecha, req.params.auto, decoded.id_usuario, function (err, resp) {
        if (err)
          res.send(err);
        if (resp.length == 0) res.status(400).send({ error: true, message: 'Error de token' });
        res.json(resp[0][0]);
      })

    }
  });
}
exports.generar_costo = function (req, res) {
  Factura.generar_costos(req.params.fecha, req.params.auto, function (err, costo) {
    if (err)
      res.send(err);
    res.json(costo[0][0]);
  });
};

exports.mis_facturas = function (req, res) {
   jwt.verify(req.params.token, CONFIG.jwt_encryption, function (err, decoded) {
    if (err) {
      res.status(400).send({ error: true, message: 'Error de token' })
    } else {
      Factura.mis_facturas(decoded.id_usuario, function (err, resp) {
        if (err)
          res.send(err);
        if (resp.length == 0) res.status(400).send({ error: true, message: 'Error de token' });
        res.json(resp);
      })

    }
  });

}