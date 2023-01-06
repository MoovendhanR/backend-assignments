const express=require('express');
const Hero = require('../models/hero.model');
const app = express();


app.get('/', async (req, res) => {
    
    try{
        const heros=await Hero.find().lean().exec();
        res.status(200).send({heros:heros});

    }catch(err){
        res.status(500).send({message: err.message});
    }

})


app.post('/', async (req, res) => {
    
    try{
        const hero=await Hero.create(req.body)
        res.status(201).send(hero);

    }catch(err){
        res.status(500).send({message: err.message});
    }

})

app.get('/:id', async (req, res) => {
    
    try{
        const hero=await Hero.findById(req.params.id).lean().exec();
        res.status(200).send(hero);

    }catch(err){
        res.status(500).send({message: err.message});
    }

})


app.patch('/:id', async (req, res) => {
    
    try{
        const hero=await Hero.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
        res.status(200).send(hero);

    }catch(err){
        res.status(500).send({message: err.message});
    }

})


app.delete('/:id', async (req, res) => {
    
    try{
        const hero=await Hero.findByIdAndDelete(req.params.id).lean().exec()
        res.status(200).send(hero);

    }catch(err){
        res.status(500).send({message: err.message});
    }

})



module.exports=app;