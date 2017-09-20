'use strict';
module.exports = function(sequelize, DataTypes) {
  var Usuarios_Parentescos = sequelize.define('Usuarios_Parentescos', {
    usuario_id: DataTypes.INTEGER,
    tipo_parentesco: DataTypes.INTEGER,
    hijo_id: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Usuarios_Parentescos.belongsTo(models.Usuarios_Datos,{foreignKey:'usuario_id'});
        Usuarios_Parentescos.belongsTo(models.Tipo_Parentescos,{foreignKey:'tipo_parentesco'});
      }
    }
  });
  return Usuarios_Parentescos;
};
