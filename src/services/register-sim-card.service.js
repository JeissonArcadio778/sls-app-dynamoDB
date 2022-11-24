// Registra una Sim Card en Virgin Mobile


//Entra una SimCard vía request.

    //Validaciones de la SimCard

    //Hago una busqueda en la DB por Msisdn. (para verificar que no exista)

    // Si no existe: a la entidad se le cambia el estado dependiendo del esTraking que tenga: (V o f): created o SELECTED
        //se guarda
    
    //Si existe: enviar un mensaje de existencia. 
    

const SimCardModel = require("../models/sim-card");


const saveSimCard = async (simCard) => {

        try {
                    //Validaciones de Sim Card
                    if ( simCard == null || simCard.msisdn == null || simCard.iccid == null || simCard.serial == null ) {
                        console.log('Error saveSimCard. Revisar datos de simCard: ');
                        console.log({simCard});
                    }
            
                    //Realizar consulta: 
                    const simCardDB = await SimCardModel.scan('msisdn').eq(simCard.msisdn).exec(); 
            
                    if ( simCardDB == null ) {
                        
                        const newState = (simCard.estraking)? 'CREATED' : 'SELECTED'; 
                        const newSimCard = await SimCardModel.update({'id': simCard.id, 'estado' : newState});

                        console.log('SimCard guardada en base de datos: ');
                        console.log(newSimCard);

                        return {
                            success: true, 
                            data: newSimCard
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