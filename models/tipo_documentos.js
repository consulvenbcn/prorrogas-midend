'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tipo_Documentos = sequelize.define('Tipo_Documentos', {
    descripcion: DataTypes.STRING(25)
  }, {
    underscored: true,
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Tipo_Documentos.hasOne(models.Usuarios_Documentos, {foreignKey:'tipo_documento'});
      }
    }
  });
  return Tipo_Documentos;
};
