var express = require('express');
var models = require('../models');
var moment = require('moment');
var router = express.Router();
/*===============================================================

                          FUNCTION

=================================================================*/

/*===============================================================

                          GET

=================================================================*/
router.get('/pendientes',function(req,res,next){
  models.Usuarios_Tramites.findAll({
    attributes:['created_at','id'],
    include:[
      {
        model:models.Tipo_Tramites,
        attributes:['descripcion']
      },
      {
        model:models.Usuarios_Datos,
        attributes:['nombre1','nombre2','apellido1','apellido2']
      }
    ],
    where:{
      status:1
    }
  }).then(function(result){
    res.json({
      result:result
    });
  });
});
router.get('/aprobados',function(req,res,next){
  models.Usuarios_Tramites.findAll({
    include:[
      {
        model:models.Usuarios_Datos,
        attributes:['nombre1','nombre2','apellido1','apellido2']
      },
      {
        model:models.Tipo_Tramites,
        attributes:['descripcion']
      }
    ],
    where:{
      status:2
    },
    attributes:['id','created_at','updated_at']
  }).then(function(result){
    res.json({
      result:result
    });
  });
});
router.get('/finalizados',function(req,res,next){
  models.Usuarios_Tramites.findAll({
    attributes:['id','created_at','updated_at'],
    include:[
      {
        model:models.Tipo_Tramites,
        attributes:['descripcion']
      },
      {
        model:models.Usuarios_Datos,
        attributes:['nombre1','nombre2','apellido1','apellido2']
      }
    ],
    where:{
      status:3
    }
  }).then(function(result){
    res.json({
      result:result
    });
  });
});
router.get('/entregados',function(req,res,next){
  models.Usuarios_Tramites.findAll({
    attributes:['id','created_at','updated_at','nota','archivo'],
    include:[
      {
        model:models.Tipo_Tramites,
        attributes:['descripcion']
      },
      {
        model:models.Usuarios_Datos,
        attributes:['nombre1','nombre2','apellido1','apellido2']
      }
    ],
    where:{
      status:4
    }
  }).then(function(result){
    res.json({
      result:result
    });
  });
});
router.get('/:tramite_id',function(req,res,next){
  models.Usuarios_Tramites.findOne({
    attributes:['id','tipo_tramite'],
    where:{
      id:req.params.tramite_id
    }
  }).then(function(result){
    switch (result.tipo_tramite) {
      case 1:
        models.Tramites_Prorrogas.findOne({
          attributes:['id','unico_id','fecha_emision','fecha_vencimiento'],
          include:[
            {
              include:[
                {
                  model:models.Tipo_Documentos,
                  attributes:['descripcion']
                }
              ],
              model:models.Usuarios_Documentos,
              attributes:['numero_documento','fecha_emision','fecha_vencimiento']
            },
            {
              model:models.Usuarios_Tramites,
              attributes:['nota','archivo','created_at','updated_at'],
              include:[
                {
                  model:models.Tipo_Tramites,
                  attributes:['descripcion']
                },
                {
                  model:models.Tipo_Statuses,
                  attributes:['descripcion']
                },
                {
                  model:models.Usuarios_Datos,
                  attributes:['nombre1','nombre2','apellido1','apellido2']
                },
              ],
            }
          ],
          where:{
            tramite_id:result.id
          }
        }).then(function(result) {
          res.json({
            result:result
          });
        });
        break;
      default:
      res.json({
        result:{}
      });
    }
  });
});
/*===============================================================

                          POST

=================================================================*/
router.post('/entregar/:tramite_id',function(req,res,next) {
  models.Usuarios_Tramites.update({
    status:4,
    nota: 'Entregado a '+req.body.nombreEntrega+' en fecha '+moment().format('DD-MM-YYYY')
  },
  {
    where:{
      id:req.params.tramite_id
    }
  }).then(function(result) {
    res.json({
      result:result
    });
  });
});
/*===============================================================

                          PUT

=================================================================*/

/*===============================================================

                          DELETE

=================================================================*/


module.exports = router;
