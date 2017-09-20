var express = require('express');
var models = require('../models');
var moment = require('moment');
var router = express.Router();
/*===============================================================

                          USUARIOS GET

=================================================================*/
/* GET usuariosDatos listing. */
router.get('/:usuario_id', function(req, res, next) {
  models.Usuarios_Datos.findAll(
    {
      where:{
        id:req.params.usuario_id
      },
      include:[
        {
          model: models.Usuarios_Documentos,
          include:[
            {
              model: models.Tipo_Documentos
            }
          ]
        },
        {
          model: models.Tipo_Estados_Civiles
        },
        {
          model: models.Usuarios_Cuentas
        },
        {
          model: models.Usuarios_Local_Direcciones,
          include:[
            {
              model: models.Tipo_Vias
            },
            {
              model: models.Tipo_Localidades,
              include:[{
                model: models. Tipo_Provincias
              }]
            }
          ]
        },
        {
          model: models.Usuarios_Telefonos,
          include:[
            {
              model: models.Tipo_Telefonos
            }
          ]
        }
      ]
    }).then(function(result) {
    res.json({
      result: result
    });
  });
});
/*===============================================================

                          USUARIOS POST

=================================================================*/
/*POST usuariosDatos create */
router.post('/registrar', function(req, res, next) {
  models.Usuarios_Documentos.findAndCountAll({
    attributes: ['id'],
    where: {
      tipo_documento : 1,
      numero_documento: req.body.numeroDocumento,
    }
  }).then(function(result){
    if(result.count===1){
      res.status(500);
      res.json({
        mensaje: 'documento existe',
        body:req.body,
        result: result
      });
    }else{
      models.Usuarios_Cuentas.findAndCountAll({
        attributes: ['id'],
        where:{
          email: req.body.email,
        }
      }).then(function(result){
        if(result.count===1){
          res.status(500);
          res.json({
            mensaje: 'cuenta existe',
            body:req.body,
            result: result
          });
        }else{
          models.Usuarios_Datos.findAndCountAll({
            attributes: ['id'],
            where:{
              nombre1: req.body.nombre1,
              apellido1: req.body.apellido1,
              apellido2: req.body.apellido2,
              fecha_nacimiento: moment(req.body.fechaNacimiento,'DD/MM/YYYY').format('YYYY-MM-DD'),
            }
          }).then(function(result){
            if (result.count===1) {
              res.status(500);
              res.json({
                mensaje: 'datos existe',
                body:req.body,
                result: result
              });
            }else{
              models.Usuarios_Datos.create({
                nombre1: req.body.nombre1,
                nombre2: req.body.nombre2,
                apellido1: req.body.apellido1,
                apellido2: req.body.apellido2,
                genero: req.body.genero,
                estado_civil: req.body.estadoCivil,
                fecha_nacimiento: moment(req.body.fechaNacimiento,'DD/MM/YYYY').format('YYYY-MM-DD'),
                lugar_nacimiento: req.body.lugarNacimiento,
                tipo_usuario: 'E',
                Usuarios_Documentos:{
                  tipo_documento:1,
                  numero_documento:req.body.numeroDocumento,
                  fecha_emision: moment(req.body.fechaEmision,'DD/MM/YYYY').format('YYYY-MM-DD'),
                  fecha_vencimiento: moment(req.body.fechaVencimiento,'DD/MM/YYYY').format('YYYY-MM-DD'),
                  lugar_emision: 'Venezuela'
                },
                Usuarios_Cuentas:{
                  email: req.body.email,
                  nombre_usuario: req.body.email,
                  contrasena: req.body.password,
                  nivel_acceso: '100000000'
                }
              },
              {
                include:[
                  {
                    model: models.Usuarios_Documentos
                  },
                  {
                    model: models.Usuarios_Cuentas
                  },
                ]
              }).then(function(result){
                res.status(200);
                res.json({
                  mensaje: 'Ok',
                  id:result.id
                });
              });
            }
          });
        }
      });
    }
  });
});
/*POST usuariosLocalDirecciones create */
router.post('/registrarDireccion/:usuario_id',function(req, res, next) {
  models.Usuarios_Local_Direcciones.findAndCountAll({
    attributes: ['id'],
    where: {
      usuario_id : req.params.usuario_id,
    }
  }).then(function(result){
    if (result.count===1) {
      res.status(500);
      res.json({
        mensaje: 'direccion existe',
        body:req.body,
        result: result
      });
    }else{
      models.Usuarios_Local_Direcciones.create({
        usuario_id: req.params.usuario_id,
        nombre_via: req.body.nombreVia,
        numero_via: req.body.numeroVia,
        tipo_via: req.body.tipoVia,
        portal: req.body.portal,
        escalera: req.body.escalera,
        piso: req.body.piso,
        puerta: req.body.puerta,
        codigo_postal: req.body.codigoPostal,
        localidad: req.body.localidad
      }).then(function(result){
        res.status(200);
        res.json({
          mensaje: 'Ok',
          id:result.id
        });
      });
    }
  });
});
/*POST usuariosTelefonos create */
router.post('/registrarTelefono/:usuario_id',function(req, res, next) {
  models.Usuarios_Telefonos.findAndCountAll({
    attributes: ['id'],
    where: {
      usuario_id : req.params.usuario_id,
      numero_telefono:req.body.numeroTelefono
    }
  }).then(function(result){
    if (result.count>=1) {
      res.status(500);
      res.json({
        mensaje: 'telefono existe',
        body:req.body,
        result: result
      });
    }else{
      models.Usuarios_Telefonos.create({
        usuario_id: req.params.usuario_id,
        tipo_telefono: req.body.tipoTelefono,
        numero_telefono: req.body.numeroTelefono
      }).then(function(result){
        res.status(200);
        res.json({
          mensaje: 'Ok',
          id:result.id
        });
      });
    }
  });
});
/*POST usuariosDocumentos create */
router.post('/registrarDocumento/:usuario_id',function(req, res, next) {
  models.Usuarios_Telefonos.findAndCountAll({
    attributes: ['id'],
    where: {
      usuario_id : req.params.usuario_id,
      tipo_documento:req.body.tipodocumento,
      numero_documento:req.body.numeroDocumento
    }
  }).then(function(result){
    if (result.count>=1) {
      res.status(500);
      res.json({
        mensaje: 'documento existe',
        body:req.body,
        result: result
      });
    }else{
      models.Usuarios_Documentos.create({
        usuario_id: req.params.usuario_id,
        tipo_documento: req.body.tipoDocumento,
        numero_docuemento: req.body.numeroDocumento,
        fecha_emision: moment(req.body.fechaEmision,'DD/MM/YYYY').format('YYYY-MM-DD'),
        fecha_vencimiento: moment(req.body.fechaVencimineto,'DD/MM/YYYY').format('YYYY-MM-DD'),
        lugar_emision: req.body.numeroTelefono,
        archivo: null
      }).then(function(result){
        res.status(200);
        res.json({
          mensaje: 'Ok',
          id:result.id
        });
      });
    }
  });
});
/*===============================================================

                          USUARIOS PUT

=================================================================*/
/*PUT usuariosLocalDirecciones create */
router.put('/registrarDireccion/:usuario_id',function(req, res, next) {
  models.Usuarios_Local_Direcciones.findAndCountAll({
    attributes: ['id'],
    where: {
      usuario_id : req.params.usuario_id,
    }
  }).then(function(result){
    if (result.count===0) {
      models.Usuarios_Local_Direcciones.create({
        usuario_id: req.params.usuario_id,
        nombre_via: req.body.nombreVia,
        numero_via: req.body.numeroVia,
        tipo_via: req.body.tipoVia,
        portal: req.body.portal,
        escalera: req.body.escalera,
        piso: req.body.piso,
        puerta: req.body.puerta,
        codigo_postal: req.body.codigoPostal,
        localidad: req.body.localidad
      }).then(function(result){
        res.status(200);
        res.json({
          mensaje: 'Ok',
          id:result.id
        });
      });
    }else{
      models.Usuarios_Local_Direcciones.update({
        nombre_via: req.body.nombreVia,
        numero_via: req.body.numeroVia,
        tipo_via: req.body.tipoVia,
        portal: req.body.portal,
        escalera: req.body.escalera,
        piso: req.body.piso,
        puerta: req.body.puerta,
        codigo_postal: req.body.codigoPostal,
        localidad: req.body.localidad
      },
      {
        where:{
          usuario_id: req.params.usuario_id,
        }
      }).then(function(result){
        res.status(200);
        res.json({
        mensaje: 'Ok',
        id:result.id
        });
      });
    }
  });
});
/* PUT updateTelefonos */
router.put('/registrarTelefono/:usuario_id/:telefono_id',function(req, res, next){
  models.Usuarios_Telefonos.findAndCountAll({
    where:{
      id:{
        $notIn: [req.params.telefono_id]
      },
      usuario_id: req.params.usuario_id,
      tipo_telefono: req.body.tipoTelefono,
      numero_telefono:req.body.numeroTelefono
    }
  }).then(function(result){
    if(result.count===1){
      res.status(500);
      res.json({
        mensaje: 'telefono existe',
        body:req.body,
        result: result
      });
    }else{
      models.Usuarios_Telefonos.update({
        tipo_telefono:req.body.tipoTelefono,
        numero_telefono:req.body.numeroTelefono,
      },
      {
        where:{
          id: req.params.telefono_id
        }
      }).then(function(result){
        res.status(200);
        res.json({
          mensaje: 'Ok',
          body: req.body,
          id: result
        });
      });
    }
  });
});
/*PUT usuariosDatos create */
// router.put('/registrarDatos/:usuario_id',function(req, res, next) {
//   models.Usuarios_Datos.findAndCountAll({
//     attributes: ['id'],
//     where: {
//       id : req.params.usuario_id,
//     }
//   }).then(function(result){
//     if(result.count!=1){
//       res.status(500);
//       res.json({
//         mensaje: 'usuario no existe',
//         body:req.body,
//         result: result
//       });
//     }else{
//       models.Usuarios_Local_Direcciones.update({
//         nombre_via: req.body.nombreVia,
//         numero_via: req.body.numeroVia,
//         tipo_via: req.body.tipoVia,
//         portal: req.body.portal,
//         escalera: req.body.escalera,
//         piso: req.body.piso,
//         puerta: req.body.puerta,
//         codigo_postal: req.body.codigoPostal,
//         localidad: req.body.localidad
//       },
//       {
//         where:{
//           usuario_id: req.params.usuario_id,
//         }
//       }).then(function(result){
//         res.status(200);
//         res.json({
//         mensaje: 'Ok',
//         id:result.id
//         });
//       });
//     }
//   });
// });
module.exports = router;
