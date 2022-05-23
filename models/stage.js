'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stage extends Model {
    static associate({Event, stage_events, set_times}) {
      stage.belongsToMany(Event,{
        foreignKey: 'stage_id',
        as: 'events',
        through: stage_events
      })
      //set times
      stage.hasMany(set_times,{
        foreignKey: 'stage_id',
        as: 'set_times'
      })
    }
  }
  stage.init({
    stage_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    stage_name: {
      type: DataTypes.STRING,
    allowNull: false}
  }, {
    sequelize,
    modelName: 'Stage',
    tableName: 'stages',
    timestamps: false
  });
  return stage;
};