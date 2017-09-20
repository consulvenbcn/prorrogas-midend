'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tramites_Prorrogas = sequelize.define('Tramites_Prorrogas', {
    tramite_id: DataTypes.INTEGER,
    documento_id: DataTypes.INTEGER,
    unico_id: DataTypes.INTEGER,
    estatus: DataTypes.INTEGER,
    fecha_emision: DataTypes.DATEONLY,
    fecha_vencimiento: DataTypes.DATEONLY
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Tramites_Prorrogas.belongsTo(models.Usuarios_Tramites, {foreignKey:'tramite_id'});
        Tramites_Prorrogas.belongsTo(models.Usuarios_Documentos, {foreignKey:'documento_id'});
      }
    }
  });
  return Tramites_Prorrogas;
};
