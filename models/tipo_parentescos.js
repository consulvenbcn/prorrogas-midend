'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tipo_Parentescos = sequelize.define('Tipo_Parentescos', {
    descripcion: DataTypes.STRING(20)
  }, {
    underscored: true,
    timestamps:false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Tipo_Parentescos.hasOne(models.Usuarios_Parentescos,{foreignKey:'tipo_parentesco'});
      }
    }
  });
  return Tipo_Parentescos;
};
