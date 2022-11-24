const { v4: uuidv4 } = require("uuid");
const { response, request } = require("express");

const SimCardModel = require("../models/sim-card");

const generateSimCard = async (req = request, res = response) => {

  //Dates: id, estraking = true, fechas, iccid, msisdn, puk = null, serial, estado = SELECT, descError.
      try {
      
        const id = uuidv4(),
          estado = "CREATED", 
       estraking = true; 
        

       let msisdn = '', //TODO: solicitar data
        // let msisdn = (Math.floor(Math.random() * 100000000)).toString(),
             iccid = (Math.floor(Math.random() * 100000000)).toString(),
               puk = 'null', 
            serial = (Math.floor(Math.random() * 100000000)).toString(),
         descError = '';  

        const simCard = new SimCardModel ({id, estado, msisdn, iccid, puk, serial, descError, estraking})

        await simCard.save(); 

        console.log(simCard);

        res.status(200).json({
            status: true, 
            message: 'Save: ' + JSON.stringify(simCard)
        })

      } catch (error) {
        console.log(error);
        console.error("Error al guardar en la DB");
        res.status(400).json({
          status: false,
          message: "Guardado failed",
        });
      }
    };


module.exports = {
    generateSimCard
}