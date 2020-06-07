const express = require('express');
const ideasRouter = express.Router();
const db = require('./db');


ideasRouter.param('ideaId',(req,res,next,ideaId) => {
    req.requestedIdeaId = ideaId;
    next();
})

ideasRouter.get('/',(req,res,next) => {
    const allIdeas = db.getAllFromDatabase(req.modelName)
    res.send(allIdeas)
})

ideasRouter.post('/',(req,res,next)=>{
    const newIdea = req.query
    if(newIdea){
        db.addToDatabase(req.modelName,newIdea)
        res.status(201).send();
    } else {
        res.status(404).send('No idea added');
    }
})

ideasRouter.get('/:ideaId',(req,res,next)=>{
    const retrievedIdea = db.getFromDatabaseById(req.modelName,req.requestedIdeaId)
    if(retrievedIdea){
        res.send(retrievedIdea)
    } else {
        res.status(404).send();
    }
})

ideasRouter.put('/:ideaId',(req,res,next)=> {
    const ideaToUpdate = req.query;
    if(ideaToUpdate){
        ideaToUpdate.id = req.requestedIdeaId
    db.updateInstanceInDatabase(req.modelName,ideaToUpdate);
    res.status(201).send();
    } else {
        res.status(404).send();
    }
})

ideasRouter.delete('/:ideaId',(req,res,next)=>{
    if(req.requestedIdeaId){
        db.deleteFromDatabasebyId(req.modelName,req.requestedIdeaId);
        res.status(204).send()
    } else {
        res.status(404).send()
    }
})

module.exports = ideasRouter;