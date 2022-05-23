//DEPENDENCIES 
const events = require('express').Router()
const db = require('../models')
const { Event } = db
const { Op } = require('sequelize')

//EXPORT

module.exports = events