var express = require('express');
var models = require('../models');
var router = express.Router();

/* GET tipoDocumentos listing. */
router.get('/documentos', function(req, res, next) {
  models.Tipo_Documentos.findAll({
    order: ['descripcion']
  }).then(function(result) {
    res.send({
      result: result
    });
  });
});
/* GET tipoTelefonos listing. */
router.get('/telefonos', function(req, res, next) {
  models.Tipo_Telefonos.findAll({
    order: ['descripcion']
  }).then(function(result) {
    res.send({
      result: result
    });
  });
});
/* GET tipoParentescos listing. */
router.get('/parentescos', function(req, res, next) {
  models.Tipo_Parentescos.findAll({
    order: ['descripcion']
  }).then(function(result) {
    res.send({
      result: result
    });
  });
});
/* GET tipoProvincias listing. */
router.get('/provincias', function(req, res, next) {
  models.Tipo_Provincias.findAll({
    order: ['descripcion']
  }).then(function(result) {
    res.send({
      result: result
    });
  });
});
/* GET tipoLocalidades listing. */
router.get('/localidades/:provincias_id', function(req, res, next) {
  models.Tipo_Localidades.findAll({
    attributes: ['id', 'descripcion'],
    where: {
      provincia_id: req.params.provincias_id
    },
    order: ['descripcion']
  }).then(function(result) {
    res.send({
      result: result
    });
  });
});
/* GET tipoVias listing. */
router.get('/vias', function(req, res, next) {
    models.Tipo_Vias.findAll({
      order: ['descripcion']
    }).then(function(result) {
    res.send({
      result: result
    });
  });
});
/* GET tipoEstadosCiviles listing. */
router.get('/estadosCiviles', function(req, res, next) {
  models.Tipo_Estados_Civiles.findAll({
    order: ['descripcion']
  }).then(function(result) {
    res.send({
      result: result
    });
  });
});
module.exports = router;
