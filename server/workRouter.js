const express = require('express');
const workRouter = express.Router();
const db = require('./db');

workRouter.get('/',(req,res,next)=>{
    let requestedMinion = req.requestedMinionId;
    const requestedMinionWork = db.getFromDatabaseById('work',requestedMinion)
    res.send(requestedMinionWork);
})

/*
workRouter.post('/',(req,res,next)=>{
    let newWork = req.query;
    newWork.hours = Number(req.query.hours);
    if(newWork){
        db.addToDatabase('work',newWork)
        res.status(201).send();
    } else {
        res.status(404).send('No work added');
    }
})

workRouter.put('/',(req,res,next)=>{
    let requestedMinion = req.requestedMinionId;
    let updatedWork = req.query;
    updatedWork.hours = Number(req.query.hours);
    if(updatedWork){
        updatedWork.id = requestedMinion;
        db.updateInstanceInDatabase('work',updatedWork);
        res.status(201).send();
    } else{
        res.status(404).send();
    }
})
*/

module.exports = workRouter;