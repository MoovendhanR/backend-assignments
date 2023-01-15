const express=require('express');
const Notes = require('../models/notes.models');

const router=express.Router()


router.get('/', async(req, res) => {
    try{
        const notes=await Notes.find().lean().exec();
        res.status(200).send({notes: notes});
    }catch(err){
        res.status(500).send({message:err.message})
    }
})


router.post('/create', async(req, res) => {
    try{
        const note=await Notes.create(req.body);
        res.status(200).send(note);
    }catch(err){
        res.status(500).send({message:err.message})
    }
})

router.patch('/edit/:id', async(req, res) => {
    try{
        const note=await Notes.findByIdAndUpdate(req.params.id, req.body, {new:true}).lean().exec();
        res.status(200).send(note);
    }catch(err){
        res.status(500).send({message:err.message})
    }
})
router.delete('/delete/:id', async(req, res) => {
    try{
        const note=await Notes.findByIdAndDelete(req.params.id).lean().exec();
        res.status(200).send(note);
    }catch(err){
        res.status(500).send({message:err.message})
    }
})


module.exports=router;



