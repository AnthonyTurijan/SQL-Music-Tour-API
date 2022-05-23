//DEPENDENCIES
const bands = require('express').Router()
const db = require('../models')
const { Band, MeetGreet, Event, SetTime } = db
const { Op } = require('sequelize')

//GET
bands.get('/', async (req,res) =>{
    try{
        const foundBands = await Band.findAll({
            order: [['available_start_time','ASC']],
            where: {
                name: {
                    [Op.like]: `%${req.query.name ? req.query.name : ''}%`
                }
            }
        })
        res.status(200).json(foundBands)
    } catch(err){   
        res.status(500).json(err)
    }
})

//FIND BAND BY NAME
bands.get('/:name', async(req,res)=>{
    try{
        const foundBand = await Band.findOne({
            where: {name: req.params.name},
            include: [{
                model: MeetGreet,
                as: "meet_greets",
                include: {
                    model: Event, 
                    as: 'events',
                    where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } }
                }
            },{
                model: SetTime,
                as: "set_times",
                include: {
                    model: Event, 
                    as: 'events',
                    where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } }
                }
            }]
        })
        res.status(200).json(foundBand)
    }catch(err){
        res.status(500).json(err)
    }
})

//CREATE BAND
bands.post('/', async(req,res)=>{
    try{
        const newBand = await Band.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted new band',
            data: newBand
        })
    }catch(err){
        res.status(500).json(err)
    }
})

//UPDATE A BAND
bands.put('/:id', async(req,res)=>{
    try{
        const updatedBands = await Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedBands} band(s)`
        })
    }catch(err){
        res.status(500).json(err)
    }
})

//DELETE A BAND
bands.delete('/:id', async (req,res)=>{
    try{
        const deleteBands = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deleteBands}`
        })
    }catch(err){
        res.status(500).json(err)
    }
})

//EXPORT
module.exports = bands
