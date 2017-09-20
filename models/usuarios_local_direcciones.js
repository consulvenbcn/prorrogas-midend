'use strict';
module.exports = function(sequelize, DataTypes) {
  var Usuarios_Local_Direcciones = sequelize.define('Usuarios_Local_Direcciones', {
    usuario_id: DataTypes.INTEGER,
    nombre_via: DataTypes.STRING(50),
    numero_via: DataTypes.STRING(5),
    tipo_via: DataTypes.INTEGER,
    portal: DataTypes.STRING(5),
    escalera: DataTypes.STRING(2),
    piso: DataTypes.STRING(5),
    puerta: DataTypes.STRING(4),
    codigo_postal: DataTypes.STRING(8),
    localidad: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Usuarios_Local_Direcciones.belongsTo(models.Usuarios_Datos,{foreignKey:'usuario_id'});
        Usuarios_Local_Direcciones.belongsTo(models.Tipo_Localidades,{foreignKey:'localidad'});
        Usuarios_Local_Direcciones.belongsTo(models.Tipo_Vias,{foreignKey:'tipo_via'});
      }
    }
  });
  return Usuarios_Local_Direcciones;
};
