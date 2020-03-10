'use strict';
module.exports = (sequelize, DataTypes) => {
  const Slot = sequelize.define('Slot', {
    username: DataTypes.STRING,
    endDatetime: DataTypes.DATE,
    startDatetime: DataTypes.DATE,
    activityDate: DataTypes.DATE
  }, {});
  Slot.associate = function(models) {
    // associations can be defined here
  };
  return Slot;
};