'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meet_greets extends Model {
    static associate({ Band, Event }) {
      //band
      meet_greets.belongsTo(Band, {
        foreignKey: "band_id",
        as: "band"
      })
      //event
      meet_greets.belongsTo(Event, {
        foreignKey: 'event_id',
        as: 'event'
      })
    }
  }
  meet_greets.init({
    meet_greet_id: {
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    event_id: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    band_id: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    meet_start_time: {
      type:DataTypes.DATE,
      allowNull:false
    },
    meet_end_time: {
      type:DataTypes.DATE,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'meet_greets',
    tableName: 'meet_greets',
    timestamps: false
  });
  return meet_greets;
};