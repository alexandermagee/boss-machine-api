const checkMillionDollarIdea = (req,res,next) => {
    const totalMoney = (Number(req.query.numWeeks)*Number(req.query.weeklyRevenue));
    console.log(totalMoney);
    if(!totalMoney || totalMoney < 1000000){
        res.status(400).send('Not a million dollar idea!')
    } else {
    next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
