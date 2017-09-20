'use strict';
module.exports = function(sequelize, DataTypes) {
  var Usuarios_Documentos = sequelize.define('Usuarios_Documentos', {
    usuario_id: DataTypes.INTEGER,
    tipo_documento: DataTypes.INTEGER,
    numero_documento: DataTypes.STRING(50),
    fecha_emision: DataTypes.DATEONLY,
    fecha_vencimiento: DataTypes.DATEONLY,
    lugar_emision: DataTypes.STRING(30),
    archivo: DataTypes.BLOB,
    verificado:DataTypes.INTEGER(1)
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Usuarios_Documentos.belongsTo(models.Usuarios_Datos,{foreignKey:'usuario_id'});
        Usuarios_Documentos.belongsTo(models.Tipo_Documentos,{foreignKey:'tipo_documento'});
        Usuarios_Documentos.hasOne(models.Tramites_Prorrogas,{foreignKey:'documento_id'});
      }
    }
  });
  return Usuarios_Documentos;
};
