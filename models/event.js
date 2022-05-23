'use strict';
const {
  Model
} = require('sequelize');
const meet_greets = require('./meet_greets');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate({ Stage, stage_events, meet_greets, set_time}) {
      //stages
      Event.belongsToMany(Stage, {
        foreignKey: 'event_id',
        as: 'stages',
        through: stage_events
      })
      //meet and greets
      Event.hasMany(meet_greets,{
        foreignKey: 'event_id',
        as: 'meet_greets'
      })
      //set times
      Event.hasMany(set_time,{
        foreignKey: 'event_id',
        as: 'set_times'
      })
    }
  }
  Event.init({
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull:false
    },
    start_time:{
      type: DataTypes.DATE,
      allowNull:false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: false
  });
  return Event;
};