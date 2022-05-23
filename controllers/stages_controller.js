//DEPENDENCIES
const stages = require('express').Router()
const db = require("../models")
const {Stage} = db
const {Op} = require('sequelize')

//EXPORT
module.exports = stages