const express = require('express');
const apiRouter = express.Router();
const minionsRouter = require('./minionsRouter');
const morgan = require('morgan');

apiRouter.use(morgan('dev'));
apiRouter.use('/minions',minionsRouter);


module.exports = apiRouter;
