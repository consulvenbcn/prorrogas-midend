'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tipo_Tramites = sequelize.define('Tipo_Tramites', {
    descripcion: DataTypes.STRING(25)
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Tipo_Tramites.hasOne(models.Usuarios_Tramites,{foreignKey:'tipo_tramite'});
      }
    }
  });
  return Tipo_Tramites;
};
