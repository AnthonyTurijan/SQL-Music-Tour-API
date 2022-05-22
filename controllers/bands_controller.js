//DEPENDENCIES
const bands = require('express').Router()
const db = require('../models')
const band = require('../models/band')
const { Band } = db

//GET
bands.get('/', async (req,res) =>{
    try{
        const foundBands = await Band.findAll()
        res.status(200).json(foundBands)
    } catch(err){   
        res.status(500).json(err)
    }
})

//FIND BAND BY ID
bands.get('/:id', async(req,res)=>{
    try{
        const foundBand = await Band.findOne({
            where: {band_id: req.params.id}
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
