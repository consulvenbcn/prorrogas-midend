var express = require('express');
var models = require('../models');
var moment = require('moment');
var router = express.Router();
/*===============================================================

                          GET

=================================================================*/
router.get('/prorroga/aprobar',function(req,res,next){
  models.Usuarios_Tramites.findAndCountAll({
    where:{
      tipo_tramite:1,
      status:1
    },
    include:[
      {
        model:models.Usuarios_Datos,
        attributes:['nombre1','nombre2','apellido1','apellido2'],
        where:{
          tipo_usuario:{
            $or:['E','M']
          }
        }
      },
      {
        model:models.Tramites_Prorrogas,
        attributes:['documento_id'],
        include:[
          {
            model:models.Usuarios_Documentos,
            attributes:['numero_documento']
          }
        ]
      }
    ]
  }).then(function(result){
    res.json({
      result:result
    });
  });
});
/*===============================================================

                          POST

=================================================================*/
router.post('/prorroga/buscarPasaporte',function(req, res, next) {
  models.Usuarios_Documentos.findOne({
    include:[
      {
        model:models.Usuarios_Datos,
        attributes:['nombre1','nombre2','apellido1','apellido2','genero','fecha_nacimiento','lugar_nacimiento']
      }
    ],
    where:{
      tipo_documento: 2,
      numero_documento: req.body.numeroDocumento,
    },
    order: [
      ['fecha_vencimiento', 'DESC'],
    ]
  }).then(function(result) {
    res.json({
      result:result
    });
  });
});
router.post('/prorroga/generar/:usuario_id/:documento_id',function(req, res, next) {
  models.Usuarios_Tramites.findAndCountAll({
    include:[
      {
        model:models.Tramites_Prorrogas,
        where:{
          documento_id:req.params.documento_id
        }
      }
    ],
    where:{
      usuario_id:req.params.usuario_id,
      tipo_tramite:2
    },
  }).then(function(result){
    if(result.count>=1){
      res.status(400);
      res.json({
        status:"Error",
        code:"",
        mensaje:"Este pasaporte ya se encuentra prorrogado"
      });
    }else {
      models.Usuarios_Tramites.create({
        usuario_id: req.params.usuario_id,
        tipo_tramite: 1,
        status: 1,
        Tramites_Prorrogas:{
          documento_id: req.params.documento_id,
          estatus: 0
        },
      },
      {
        include:[
          {
            model:models.Tramites_Prorrogas
          }
        ]
      }).then(function(result) {
        res.status(200);
        res.json({
          mensaje:"Ok",
          result:result
        });
      });
    }
  });
});
/*===============================================================

                          PUT

=================================================================*/
router.put('/prorroga/adjuntarExpediente/:tramite_id',function(req,res,next){
  models.Usuarios_Tramites.update({
    archivo:req.files.archivo.data,
    nota:req.body.nota
  },
  {
    where:{
      id: req.params.tramite_id
    }
  }).then(function(result){
    res.json({
      result:result
    });
  });
});
router.put('/prorroga/aprobar/:tramite_id',function(req,res,next){
  models.Usuarios_Tramites.update({
    status:2
  },
  {
    where:{
      id: req.params.tramite_id
    },
  }).then(function(result){
    if(result===0){
      res.status(400);
      res.json({
        status:'ERROR',
        code:'',
        mensaje:'Este proceso no efectuo correctamente'
      });
    }
  });
  next();
},function(req,res){
  models.Tramites_Prorrogas.update({
    fecha_emision: moment().format('YYYY-MM-DD'),
    fecha_vencimiento: moment().add(1,'y').format('YYYY-MM-DD')
  },
  {
    where:{
      tramite_id: req.params.tramite_id
    }
  }).then(function(result){
    if(result===0){
      res.status(400);
      res.json({
        status:'ERROR',
        code:'',
        mensaje:'Este proceso no efectuo correctamente'
      });
    }else{
      res.json({
        mensaje:'Ok'
      });
    }
  });
});
/*===============================================================

                          DELETE

=================================================================*/

module.exports = router;
