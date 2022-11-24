// Registra una Sim Card en Virgin Mobile


//Entra una SimCard vía request.

    //Validaciones de la SimCard

    //Hago una busqueda en la DB por Msisdn. (para verificar que no exista)

    // Si no existe: a la entidad se le cambia el estado dependiendo del esTraking que tenga: (V o f): created o SELECTED
        //se guarda
    
    //Si existe: enviar un mensaje de existencia. 
    

const SimCardModel = require("../models/sim-card");
const { v4: uuidv4 } = require("uuid");

const saveSimCard = async (simCard) => {

        try {

                    console.log('Inicio saveSimCard: ');

                    //Validaciones de Sim Card:
                    if ( simCard == null || simCard.msisdn == null || simCard.iccid == null || simCard.serial == null ) {
                        console.log('Error saveSimCard. Revisar datos de simCard: ');
                        console.log({simCard});
                    }
            
                    //Realizar consulta: 
                    const simCardDB = await SimCardModel.scan('msisdn').eq(simCard.msisdn).exec(); 
                    
                    if ( simCardDB.count == 0 ) {
                        
                        simCard.estado = (simCard.estraking)? 'CREATED' : 'SELECTED'; 

                        const id = uuidv4(); 
                        let estado = simCard.estado, msisdn = simCard.msisdn, iccid = simCard.iccid, puk = simCard.puk, serial = simCard.serial; 
                        const newSimCard = new SimCardModel ({id, iccid, msisdn, puk, estado, serial })
                        await newSimCard.save(); 
            
                        console.log('SimCard guardada en base de datos: ');
                        console.log(newSimCard);

                        return {

                            success: true, 
                            simCard: newSimCard
                        
                        }
            
                    } else {

                        console.log('La Sim Card ya existe en la Base de Datos.');
                        return {
                            success: false, 
                            message: 'La Sim Card ya existe en la Base de Datos'
                        }

                    }

        } catch (err) {
            
            console.log(err);
            return {
                success: false,
                message: 'Error en saveSimCard: ' + JSON.stringify(err)
            }
        
        }


}


module.exports = {
    saveSimCard
}