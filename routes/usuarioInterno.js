var express = require('express');
var models = require('../models');
var moment = require('moment');
var router = express.Router();
/*===============================================================

                          GET

=================================================================*/

/*===============================================================

                          POST

=================================================================*/
router.post('/registrar', function(req, res, next) {
  models.Usuarios_Cuentas.findAndCountAll({
    attributes: ['usuario_id'],
    where:{
      nombre_usuario: req.body.username,
    }
  }).then(function(result){
    if(result.count>=1){
      res.status(400);
      res.json({
        mensaje: 'El nombre de usuario existe con el numero de id de usuario'+result.usuario_id
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
      if (result.count>=1) {
        res.status(400);
        res.json({
          mensaje: 'los datos del usuario existe con el numero de id de usuario'+result.id
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
          tipo_usuario: 'I',
          Usuarios_Cuentas:{
            email: req.body.email,
            nombre_usuario: req.body.username,
            contrasena: '123456',
            nivel_acceso: req.body.nivelAcceso
          },
          Usuarios_Local_Direcciones:{
      			nombre_via: req.body.nombreVia,
      			numero_via: req.body.numeroVia,
            tipo_via: req.body.tipoVia,
            portal: req.body.portal,
            escalera:req.body.escalera,
            piso: req.body.piso,
            puerta: req.body.puerta,
            codigo_postal: req.body.codigoPostal,
            localidad: req.body.localidad
          },
          Usuarios_Telefonos:{
            tipo_telefono: req.body.tipoTelefono,
            numero_telefono: req.body.numeroTelefono
          }
        },
        {
          include:[
            {
              model: models.Usuarios_Cuentas
            },
            {
              model: models.Usuarios_Local_Direcciones
            },
            {
              model: models.Usuarios_Telefonos
            }
          ]
        }).then(function(result){
          res.status(200);
          res.json({
            mensaje: 'El usuario se registro con exito',
            nombre_usuario: req.body.username,
            contrasena: '123456',
            id:result.id
          });
        });
        }
      });
    }
  });
});
router.post('/list', function(req, res, next) {
  switch (req.body.opciones) {
    case 'nombre':
      models.Usuarios_Datos.findAll({
        where:{
          nombre1:{
            $like: '%'+req.body.buscar+'%'
          },
          tipo_usuario:'I'
        },
        attributes:['id','nombre1','nombre2','apellido1','apellido2'],
        include:[
          {
            model: models.Usuarios_Cuentas,
            attributes:['nombre_usuario']
          },
        ]
      }).then(function(result){
        res.status(200);
        res.json({
          result: result
        });
      });
      break;
    case 'apellido':
      models.Usuarios_Datos.findAll({
        where:{
          apellido1:{
            $like: '%'+req.body.buscar+'%'
          },
          tipo_usuario:'I'
        },
        attributes:['id','nombre1','nombre2','apellido1','apellido2'],
        include:[
          {
            model: models.Usuarios_Cuentas,
            attributes:['nombre_usuario']
          },
        ]
      }).then(function(result){
        res.status(200);
        res.json({
          result: result
        });
      });
      break;
    case 'nombreUsuario':
      models.Usuarios_Datos.findAll({
        where:{
          tipo_usuario:'I'
        },
        attributes:['id','nombre1','nombre2','apellido1','apellido2'],
        include:[
          {
            model: models.Usuarios_Cuentas,
            attributes:['nombre_usuario'],
            where:{
              email:{
                $like: '%'+req.body.buscar+'%'
              }
            }
          }
        ]
      }).then(function(result){
        res.status(200);
        res.json({
          result: result
        });
      });
      break;
    default:
      res.status(404);
      res.json({
        result: []
      });
  }
});
/*===============================================================

                          PUT

=================================================================*/
router.put('/block/:usuario_id',function(req,res,next) {
  models.Usuarios_Cuentas.update({
    nivel_acceso: '0000000'
  },
  {
    where:{
      usuario_id:req.params.usuario_id
    }
  }).then(function(result) {
    res.json({
      result:result
    });
  });
});
/*===============================================================

                          DELETE

=================================================================*/

module.exports = router;
