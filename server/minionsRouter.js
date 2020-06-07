const express = require('express');
const minionsRouter = express.Router();
const db = require('./db')

minionsRouter.param('minionId',(req,res,next,minionId) => {
    req.requestedMinionId = minionId;
    next();
})

minionsRouter.get('/',(req,res,next)=>{
    const allMinions = db.getAllFromDatabase(req.modelName)
    res.send(allMinions)
})

minionsRouter.post('/',(req,res,next)=>{
    const newMinion = req.query
    if(newMinion){
        db.addToDatabase(req.modelName,newMinion)
        res.status(201).send();
    } else {
        res.status(404).send('No minion found');
    }
})

minionsRouter.get('/:minionId',(req,res,next)=>{
    const retrievedMinion = db.getFromDatabaseById(req.modelName,req.requestedMinionId)
    if(retrievedMinion){
        res.send(retrievedMinion)
    } else {
        res.status(404).send();
    }
})

minionsRouter.put('/:minionId',(req,res,next)=> {
    const minionToUpdate = req.query;
    if(minionToUpdate){
    minionToUpdate.id = req.requestedMinionId
    db.updateInstanceInDatabase(req.modelName,minionToUpdate);
    res.status(201).send();
    } else {
        res.status(404).send();
    }
})

minionsRouter.delete('/:minionId',(req,res,next)=>{
    if(req.requestedMinionId){
        db.deleteFromDatabasebyId(req.modelName,req.requestedMinionId);
        res.status(204).send()
    } else {
        res.status(404).send()
    }
})


module.exports = minionsRouter;