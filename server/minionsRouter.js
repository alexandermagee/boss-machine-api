const express = require('express');
const minionsRouter = express.Router();
const db = require('./db')

minionsRouter.get('/',(req,res,next)=>{
    const allMinions = db.getAllFromDatabase('minions')
    res.send(allMinions)
})

minionsRouter.post('/',(req,res,next)=>{
    const newMinion = req.query
    if(newMinion){
        db.addToDatabase('minions',newMinion)
        res.status(201).send();
    } else {
        res.status(404).send('No minion found');
    }
})

minionsRouter.get('/:minionId',(req,res,next)=>{
    const requestedMinionId = req.params.minionId;
    const retrievedMinion = db.getFromDatabaseById('minions',requestedMinionId)
    if(retrievedMinion){
        res.send(retrievedMinion)
    } else {
        res.status(404).send();
    }
})

minionsRouter.put('/:minionId',(req,res,next)=> {
    const minionToUpdate = req.query;
    if(minionToUpdate){
    minionToUpdate.id = req.params.minionId 
    db.updateInstanceInDatabase('minions',minionToUpdate);
    res.status(201).send();
    } else {
        res.status(404).send();
    }
})


module.exports = minionsRouter;