const express = require('express');
const apiRouter = express.Router();

const minionsRouter = require('./minionsRouter');
const ideasRouter = require('./ideasRouter');

const morgan = require('morgan');

apiRouter.use(morgan('dev'));

apiRouter.use('/:modelName',(req,res,next) => {
    const requestedModel = req.params.modelName;
    req.modelName = requestedModel;
    next();
})

apiRouter.use('/minions',minionsRouter);

apiRouter.use('/ideas',ideasRouter);


module.exports = apiRouter;
