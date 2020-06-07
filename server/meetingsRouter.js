const express = require('express');
const meetingsRouter = express.Router();
const db = require('./db');

meetingsRouter.get('/',(req,res,next) => {
    const allMeetings = db.getAllFromDatabase(req.modelName)
    res.send(allMeetings)
})

meetingsRouter.post('/',(req,res,next)=>{
    const newMeeting = db.createMeeting();
    if(newMeeting){
        db.addToDatabase(req.modelName,newMeeting)
        res.status(201).send();
    } else {
        res.status(404).send('No meeting added');
    }
})

meetingsRouter.delete('/',(req,res,next) => {
    try {
        db.deleteAllFromDatabase(req.modelName);
        res.status(204).send();
    } catch(err) {
        let undefinedError = new Error('Something went wrong!');
        next(undefinedError)
    }
})


meetingsRouter.use((err,req,res,next) => {
    const status = err.status || 500;
    res.status(status).send(err.message);
})


module.exports = meetingsRouter;