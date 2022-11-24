const SimCardModel = require('../models/sim-card');
const { selectSimCard } = require('../services/select-sim-card.service');

const testDB = async (req, res) => {

    console.log('TestDB');

    let id = '1234567890'
    const simCard =  new SimCardModel({
        id
    })

    await simCard.save(); 

    console.log(simCard);

    res.status(200).json({
        msg: 'good!'
    })
    

}

const selectSimCardController = async (req,res) => {

    const responseSelectSim = await selectSimCard(req,res);
    
    if (responseSelectSim.success) {
        res.status(200).json({
            success: true, 
            data: responseSelectSim.data
        }) 
    } else {
        res.status(400).json({
            success: false, 
            data: responseSelectSim.error
        }) 
    }
    
}

module.exports = {
    testDB, 
    selectSimCardController
}