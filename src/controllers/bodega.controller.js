const { request } = require('express');
const SimCardModel = require('../models/sim-card');
const { saveSimCard } = require('../services/register-sim-card.service');
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
            data: responseSelectSim.simCard
        }) 
    } else {
        res.status(400).json({
            success: false, 
            data: responseSelectSim.message
        }) 
    }
    
}

// Inicio save {"estraking":false,"iccid":"8957123400913302116","msisdn":"3195862514","puk":"57656441","serial":"8957123400913302116"}
const saveSimCardController  = async (req = request, res) => {

    const responseSaveSimCard = await saveSimCard(req.body); 

    if (responseSaveSimCard.success) {
        res.status(200).json({
            success: true, 
            data: responseSaveSimCard.simCard
        }) 
    } else {
        res.status(400).json({
            success: false, 
            data: responseSaveSimCard.message
        }) 
    }

}

module.exports = {
    testDB, 
    selectSimCardController, 
    saveSimCardController
}