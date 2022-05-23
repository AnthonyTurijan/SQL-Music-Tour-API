'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class set_time extends Model {
    static associate({Band, Event, Stage}) {
      //band
      set_time.belongsTo(Band,{
        foreignKey: 'band_id',
        as:'event'
      })

      //event
      set_time.belongsTo(Event, {
        foreignKey: 'event_id',
        as: 'event'
      })

      //stage
      set_time.belongsTo(Stage,{
        foreignKey:"stage_id",
        as: 'stage'
      })
    }
  }
  set_time.init({
    set_time_id: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
      },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stage_id: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    band_id: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    available_start_time: {
      type:DataTypes.DATE,
      allowNull:false
    },
    end_time: {
      type:DataTypes.DATE,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'set_time',
    tableName: 'set_times',
    timestamps:false
  });
  return set_time;
};