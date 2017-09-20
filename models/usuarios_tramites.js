'use strict';
module.exports = function(sequelize, DataTypes) {
  var Usuarios_Tramites = sequelize.define('Usuarios_Tramites', {
    usuario_id: DataTypes.INTEGER,
    tipo_tramite: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    nota: DataTypes.TEXT,
    archivo: DataTypes.BLOB
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Usuarios_Tramites.belongsTo(models.Usuarios_Datos,{foreignKey:'usuario_id'});
        Usuarios_Tramites.belongsTo(models.Tipo_Tramites,{foreignKey:'tipo_tramite'});
        Usuarios_Tramites.belongsTo(models.Tipo_Statuses,{foreignKey:'status'});
        Usuarios_Tramites.hasMany(models.Tramites_Prorrogas, {foreignKey:'tramite_id'});
      }
    }
  });
  return Usuarios_Tramites;
};
