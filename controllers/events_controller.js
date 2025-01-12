//DEPENDENCIES 
const events = require('express').Router()
const db = require('../models')
const { Event, MeetGreet, SetTime, Stage, Band } = db
const { Op } = require('sequelize')

//GET
events.get('/', async(req,res)=>{
    try{
        const foundEvents = await Event.findAll({
            order: [['date', 'ASC']],
            where: {
                name: {
                    [Op.like]: `%${req.query.name ? req.query.name : '' }%`
                }
            }
        })
        res.status(200).json(foundEvents)
    }catch(err){
        res.status(500).json(err)
    }
})

//FIND EVENT BY ID
events.get('/:name', async(req,res)=>{
    try{
        const foundEvent = await Event.findOne({
            where: {stage_id: Number(req.params.id)},
            include:[
                {
                    model: MeetGreet,
                    as: 'meet_greets',
                    include:{
                        model: Band,
                        as: 'bands'
                    }
                },
                {
                    model: SetTime,
                    as: 'set_times',
                    include: [
                        {model: Band, as: 'bands'},
                        {model: Stage, as: 'stages'}
                    ]
                },
                {
                    model: Stage,
                    as: 'stages',
                    through:{ attributes: []}
                }
            ]
        })
        res.status(200).json(foundEvent)
    }catch(err){
        res.status(500).json(err)
    }
})

//CREATE EVENT
events.post('/', async(req,res)=>{
    try{
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted new event',
            data: newEvent
        })
    }catch(err){
        res.status(500).json(err)
    }
})

//UPDATE EVENT
events.put('/:id',async(req,res)=>{
    try{
        const updatedEvent = await Event.update(req.body,{
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvent} event(s)`
        })
    }catch(err){
        res.status(500).json(err)
    }
})

//DELETE AN EVENT
events.delete('/:id', async(req,res)=>{
    try{
        const deleteEvents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deleteEvents}`
        })
    }catch(err){
        res.status(500).json(err)
    }
})

//EXPORT

module.exports = events