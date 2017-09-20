var express = require('express');
var models = require('../models');
var moment = require('moment');
var router = express.Router();
/*===============================================================

                          GET

=================================================================*/
router.get('/modificar/:usuario_id',function(req,res,next) {
  if(!req.session)
  models.Usuarios_Datos.findAll({
      attributes:['nombre1','nombre2','apellido1','apellido2','genero','fecha_nacimiento','lugar_nacimiento'],
      where:{
        id:req.params.usuario_id
      },
      include:[
        {
          model: models.Usuarios_Documentos,
          attributes:['numero_documento','fecha_emision','fecha_vencimiento','lugar_emision','verificado'],
          include:[
            {
              model: models.Tipo_Documentos,
            }
          ]
        },
        {
          model: models.Tipo_Estados_Civiles
        },
        {
          model: models.Usuarios_Cuentas,
          attributes:['email'],
        },
        {
          model: models.Usuarios_Local_Direcciones,
          attributes:['nombre_via','numero_via','portal','escalera','piso','puerta','codigo_postal'],
          include:[
            {
              model: models.Tipo_Vias
            },
            {
              model: models.Tipo_Localidades,
              include:[
                {
                model: models. Tipo_Provincias
                }
              ]
            }
          ]
        },
        {
          model: models.Usuarios_Telefonos,
          attributes:['numero_telefono'],
          include:[
            {
              model: models.Tipo_Telefonos
            }
          ]
        }
      ]
    }).then(function(result) {
    res.status(200);
    res.json({
      result: result
    });
  });
});
router.get('/foto/:usuario_id', function(req,res,next) {
  models.Usuarios_Datos.findAll({
    attributes:['foto'],
    where:{
      id:req.params.usuario_id
    }
  }).then(function(result) {
      res.status(200);
    res.json({
      result:result
    });
  });
});
router.get('/verificarDocumento/:usuario_id', function(req,res,next) {
  models.Usuarios_Documentos.findAll({
    attributes:['id','numero_documento','fecha_emision','fecha_vencimiento','lugar_emision','verificado','archivo'],
    where:{
      usuario_id:req.params.usuario_id
    },
    include:[
      {
        model:models.Tipo_Documentos,
        attributes:['descripcion']
      }
    ]
  }).then(function(result) {
      res.status(200);
    res.json({
      result:result
    });
  });
});
/*===============================================================

                          POST

=================================================================*/
router.post('/registrar', function(req, res, next) {
  models.Usuarios_Documentos.findAndCountAll({
    attributes: ['usuario_id'],
    where: {
      tipo_documento : 1,
      numero_documento: req.body.numeroDocumento,
    }
  }).then(function(result){
    if(result.count>=1){
      res.status(400);
      res.json({
        mensaje: 'documento existe con el numero de id de usuario'+result.usuario_id
      });
    }else{
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
              tipo_usuario: 'E',
              Usuarios_Documentos:{
                tipo_documento: 1,
                numero_documento:req.body.numeroDocumento,
                fecha_emision: moment(req.body.fechaEmision,'DD/MM/YYYY').format('YYYY-MM-DD'),
                fecha_vencimiento: moment(req.body.fechaEmision,'DD/MM/YYYY').add(10,'y').format('YYYY-MM-DD'),
                archivo: req.body.archivo,
                verificado:1,
                lugar_emision: 'Venezuela'
              },
              Usuarios_Cuentas:{
                email: req.body.email,
                nombre_usuario: req.body.email,
                contrasena: 'a1b2c3d4',
                nivel_acceso: '10000000'
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
                  model: models.Usuarios_Documentos
                },
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
                contrasena: '1a2b3c4d',
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
router.post('/list', function(req, res, next) {
  switch (req.body.opciones) {
    case 'nombre':
      models.Usuarios_Datos.findAll({
        where:{
          nombre1:{
            $like: '%'+req.body.buscar+'%'
          },
          tipo_usuario:{
            $or:['E','M']
          }
        },
        attributes:['id','nombre1','nombre2','apellido1','apellido2'],
        include:[
          {
            model: models.Usuarios_Cuentas,
            attributes:['email']
          },
          {
            model: models.Usuarios_Documentos,
            attributes:['numero_documento'],
            where:{
              $or:[
                {
                  tipo_documento: '1'
                },
                {
                  tipo_documento: '5'
                },
                {
                  tipo_documento: '2'
                },
              ]
            }
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
        tipo_usuario:{
          $or:['E','M']
        }
      },
      attributes:['id','nombre1','nombre2','apellido1','apellido2'],
      include:[
        {
          model: models.Usuarios_Cuentas,
          attributes:['email']
        },
        {
          model: models.Usuarios_Documentos,
          attributes:['numero_documento'],
          where:{
            $or:[
              {
                tipo_documento: '1'
              },
              {
                tipo_documento: '5'
              },
              {
                tipo_documento: '2'
              },
            ]
          }
        },
      ]
    }).then(function(result){
      res.status(200);
      res.json({
        result: result
      });
    });
      break;
    case 'numeroDocumento':
    models.Usuarios_Datos.findAll({
      where:{
        tipo_usuario:{
          $or:['E','M']
        }
      },
      attributes:['id','nombre1','nombre2','apellido1','apellido2'],
      include:[
        {
          model: models.Usuarios_Cuentas,
          attributes:['email']
        },
        {
          model: models.Usuarios_Documentos,
          attributes:['numero_documento'],
          where:{
            $or:[
              {
                tipo_documento: '1'
              },
              {
                tipo_documento: '5'
              },
              {
                tipo_documento: '2'
              },
            ],
            numero_documento:{
              $like: '%'+req.body.buscar+'%'
            }
          }
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
        tipo_usuario:{
          $or:['E','M']
        }
      },
      attributes:['id','nombre1','nombre2','apellido1','apellido2'],
      include:[
        {
          model: models.Usuarios_Cuentas,
          attributes:['email'],
          where:{
            email:{
              $like: '%'+req.body.buscar+'%'
            }
          }
        },
        {
          model: models.Usuarios_Documentos,
          attributes:['numero_documento'],
          where:{
            $or:[
              {
                tipo_documento: '1'
              },
              {
                tipo_documento: '5'
              },
              {
                tipo_documento: '2'
              },
            ]
          }
        },
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
router.post('/registrarDocumento/:usuario_id',function(req,res,next) {
  var lugarEmision=null;
  var fechaVencimiento=null;
  switch (req.body.tipoDocumento) {
    case "2":
      lugarEmision="Venezuela";
      fechaVencimiento=moment(req.body.fechaEmision,'DD/MM/YYYY').add(5,'year').subtract(1, 'd').format('YYYY-MM-DD');
      break;
    case "3":
      lugarEmision="Venezuela";
      fechaVencimiento=null;
      break;
    case "4":
      lugarEmision="Venezuela";
      fechaVencimiento=moment(req.body.fechaEmision,'DD/MM/YYYY').add(10,'year').format('YYYY-MM-DD');
      break;
    case "5":
      lugarEmision="España";
      fechaVencimiento=moment(req.body.fechaVencimiento,'DD/MM/YYYY').format('YYYY-MM-DD');
      break;
  }
  models.Usuarios_Documentos.findAndCountAll({
    attributes:['id','usuario_id'],
    where:{
      tipo_documento:req.body.tipoDocumento,
      numero_documento:req.body.numeroDocumento
    },
    include:[{
      model:models.Usuarios_Datos,
      attributes:['nombre1','apellido1']
    }]
  }).then(function(result){
    if(result.count>=1){
      res.status(500);
      res.json({
        mensaje:'El Documento Nro. '+ req.body.numeroDocumento + 'se encuentra registrado en nuestro sistema a nombre de: '+ result.rows[0].Usuarios_Dato.nombre1 +' ' +result.rows[0].Usuarios_Dato.apellido1,
        id: result.rows.id,
        result: result.rows
      });
    }
    else{
      models.Usuarios_Documentos.create({
        usuario_id: req.params.usuario_id,
        tipo_documento: req.body.tipoDocumento,
        numero_documento:req.body.numeroDocumento,
        fecha_emision: moment(req.body.fechaEmision,'DD/MM/YYYY').format('YYYY-MM-DD'),
        fecha_vencimiento:fechaVencimiento,
        archivo: req.body.archivo,
        verificado:0,
        lugar_emision: lugarEmision
      }).then(function(result) {
        res.status(200);
        res.json({
          mensaje:'Ok',
          result:result
        });
      });
    }
  });
});
router.post('/vincularMenor/:usuario_id',function(req,res,next) {
  models.Usuarios_Datos.findAndCountAll({
    attributes:['id'],
    where:{
      nombre1:req.body.nombre1,
      nombre2:req.body.nombre2,
      apellido1:req.body.apellido1,
      apellido2:req.body.apellido2,
      fecha_nacimiento:moment(req.body.fechaNacimiento,'DD/MM/YYYY').format('YYYY-MM-DD'),
      tipo_usuario:'M'
    }
  }).then(function(result) {
    if(result.count>=1){
      models.Usuarios_Parentescos.create({
        usuario_id:req.params.usuario_id,
        tipo_parentesco:req.body.tipoVinculo,
        hijo_id:result.rows[0].id
      }).then(function(result){
        res.json({
          result:result
        });
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
        tipo_usuario: 'M'
      }).then(function(result){
        models.Usuarios_Parentescos.create({
          usuario_id:req.params.usuario_id,
          tipo_parentesco:req.body.tipoVinculo,
          hijo_id:result.id
        }).then(function(result){
          res.json({
            result:result
          });
        });
      });
    }
  });
});
/*===============================================================

                          PUT

=================================================================*/
router.put('/modificar/documento/:usuario_id/:documento_id',function(req, res, next){
  models.Usuarios_Documentos.update(
    {
      tipo_documento:req.body.tipoDocumento,
      numero_documento:req.body.numeroDocumento,
      fecha_emision:req.body.fechaEmision,
      fecha_vencimiento:req.body.fechaVencimiento,
      lugar_emision:req.body.lugarEmision,
      archivo: req.body.archivo,
      verificado:0
    },
    {
      where:{
        id:req.params.documento_id,
        usuario_id: req.params.usuario_id
      }
    }
  ).then(function(result){
    res.status(200);
    res.json({
      mensaje:'Ok'
    });
  });
});
router.put('/modificar/cuenta/:usuario_id',function(req, res, next){
  models.Usuarios_Cuentas.update(
    {
      email:req.body.email,
      nombre_usuario:req.body.email,
      nivel_acceso:req.body.nivelAcceso
    },
    {
      where:{
        usuario_id: req.params.usuario_id
      }
    }
  ).then(function(result){
    res.status(200);
    res.json({
      mensaje:'Ok'
    });
  });
});
router.put('/modificar/telefono/:usuario_id',function(req, res, next){
  models.Usuarios_Telefonos.update(
    {
      tipo_telefono:req.body.tipoTelefono,
      numero_telefono:req.body.numeroTelefono
    },
    {
      where:{
        usuario_id: req.params.usuario_id
      }
    }
  ).then(function(result){
    res.status(200);
    res.json({
      mensaje:'Ok'
    });
  });
});
router.put('/modificar/direccionLocal/:usuario_id/',function(req, res, next){
  models.Usuarios_Local_Direcciones.update(
    {
      tipo_via:req.body.tipoVia,
      nombre_via:req.body.nombreVia,
      numero_via:req.body.numeroVia,
      portal:req.body.portal,
      escalera:req.body.escalera,
      piso:req.body.piso,
      puerta:req.body.puerta,
      codigo_postal:req.body.codigoPostal,
      localidad:req.body.localidad
    },
    {
      where:{
        usuario_id: req.params.usuario_id
      }
    }
  ).then(function(result){
    res.status(200);
    res.json({
      mensaje:'Ok'
    });
  });
});
router.put('/modificar/datos/:usuario_id',function(req, res, next){
  models.Usuarios_Datos.update(
    {
      nombre1:req.body.nombre1,
      nombre2:req.body.nombre2,
      apellido1:req.body.apellido1,
      apellido2:req.body.apellido2,
      estado_civil:req.body.estadoCivil,
      genero:req.body.genero,
      fecha_nacimiento:req.body.fechaNacimiento,
      lugar_nacimiento:req.body.lugarNacimiento
    },
    {
      where:{
        id: req.params.usuario_id
      }
    }
  ).then(function(result){
    res.status(200);
    res.json({
      mensaje:'Ok'
    });
  });
});
router.put('/cambiarContrasena/:usuario_id',function(req, res, next){
  models.Usuarios_Cuentas.update({
    contrasena:req.body.password
  },
  {
    where:{
      usuario_id:req.params.usuario_id
    }
  }).then(function(result){
    res.status(200);
    res.json({
      result:result
    });
  });
});
router.put('/foto/:usuario_id',function(req,res,next) {
  if(!req.files){
    res.status(400);
    res.json({
      mensaje:"No ahi archivo",
    });
  }else{
    models.Usuarios_Datos.update({
      foto:req.files.foto.data
    },
    {
      where:{
        id:req.params.usuario_id
      }
    }).then(function(result) {
      res.status(200);
      res.json({
        mensaje:"ok"
      });
    });
  }
});
router.put('/verificarDocumento/:usuario_id/:documento_id',function(req,res,next) {
  models.Usuarios_Documentos.update({
      tipo_documento:req.body.tipoDocumento,
      numero_documento:req.body.numeroDocumento,
      fecha_emision: moment(req.body.fechaEmision,'DD/MM/YYYY').format('YYYY-MM-DD'),
      fecha_vencimiento: moment(req.body.fechaVencimiento,'DD/MM/YYYY').format('YYYY-MM-DD'),
      lugar_emision:req.body.lugarEmision,
      verificado:req.body.verificado
    },
    {
      where:{
        id:req.params.documento_id,
        usuario_id:req.params.usuario_id
      }
    }).then(function(result){
    res.status(200);
    res.json({
      mensaje:"ok",
    });
  });
});
/*===============================================================

                          DELETE

=================================================================*/

module.exports = router;
