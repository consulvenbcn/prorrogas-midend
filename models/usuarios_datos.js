'use strict';
module.exports = function(sequelize, DataTypes) {
  var Usuarios_Datos = sequelize.define('Usuarios_Datos', {
    nombre1: DataTypes.STRING(25),
    nombre2: DataTypes.STRING(30),
    apellido1: DataTypes.STRING(25),
    apellido2: DataTypes.STRING(30),
    estado_civil: DataTypes.INTEGER,
    genero: DataTypes.STRING(1),
    fecha_nacimiento: DataTypes.DATEONLY,
    lugar_nacimiento: DataTypes.STRING(70),
    foto: DataTypes.BLOB,
    tipo_usuario: DataTypes.STRING(1)
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Usuarios_Datos.belongsTo(models.Tipo_Estados_Civiles,{foreignKey:'estado_civil'});
        Usuarios_Datos.hasMany(models.Usuarios_Cuentas,{foreignKey:'usuario_id'});
        Usuarios_Datos.hasMany(models.Usuarios_Documentos,{foreignKey:'usuario_id'});
        Usuarios_Datos.hasMany(models.Usuarios_Local_Direcciones,{foreignKey:'usuario_id'});
        Usuarios_Datos.hasMany(models.Usuarios_Telefonos,{foreignKey:'usuario_id'});
        Usuarios_Datos.hasMany(models.Usuarios_Parentescos,{foreignKey:'usuario_id'});
        Usuarios_Datos.hasMany(models.Usuarios_Parentescos,{foreignKey:'usuario_id'});
      }
    }
  });
  return Usuarios_Datos;
};
