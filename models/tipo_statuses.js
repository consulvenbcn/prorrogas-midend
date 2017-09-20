'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tipo_Statuses = sequelize.define('Tipo_Statuses', {
    descripcion: DataTypes.STRING(20)
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Tipo_Statuses.hasOne(models.Usuarios_Tramites,{foreignKey:'status'});
      }
    }
  });
  return Tipo_Statuses;
};
