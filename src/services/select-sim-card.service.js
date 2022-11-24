// Selecciona una Sim Card que estan en estado CREATED ordenada por la fecha minima Virgin Mobile.
const SimCardModel = require("../models/sim-card");
const inew = require('../services/inew.service');

const selectSimCard = async () => {
  
  try {

          console.log('Select Sim Card: '); 

          //Lista solo estraking = true y estado = CREATED
          const simCardList = await SimCardModel.scan("estado").eq("CREATED").and().where("estraking").eq(true).exec(); 
        
          if (simCardList.count == 0 ) {
              console.log('Error al listar en la base de datos.');
              return {
                success: false, 
                message: 'Error al listar en la base de datos.'
              }              
            }

          //Organizar en orden de creación: 
          let awsList = [], data; 
          
          for (let i = 0; i < simCardList.length; i++) { 
                data = simCardList[i].fechaCreacion;
                awsList.push(data);
          }

    
        let responseSimCard = false, count = 0, lastSimCard;
        while (!responseSimCard && awsList.length >= (count - 1)) {
          
              //Ordenar por fecha máxima
              let minimumDate = awsList[0];
              awsList.forEach((f,i) => {
                if (f < minimumDate) {
                  minimumDate = f; 
                }
              })
              
              //Scan de la simCard con Fecha más antigua: 
              lastSimCard = await SimCardModel.scan('fechaCreacion').eq(new Date(minimumDate).valueOf()).exec(); 
      
              const result = await inew.getSimDetailsByICCID(lastSimCard[0].iccid); 

              console.log({result});

              if ( result.data ) {

                  if ( result.data.return != null && result.data.return.state == 'INSTALLED' && result.data.return.health == 'OK') {
                        console.log('Encontrada: ' + lastSimCard[0].iccid);
                        responseSimCard = true

                  }else if ( result.data.return != null && result.data.return.state == 'INSTALLED' && result.data.return.health != 'OK' ) {
                     
                        await SimCardModel.update({'id': lastSimCard[0].id, 'estado' : 'ERROR'});
                        awsList.pop(); 
                        count++
                  
                  } else {

                        //¿Por qué se actualiza este estado aqui? Porque ya ha sido usado por alguien. 
                        console.log('Esta sim ya está activa:' + lastSimCard[0].iccid);
                        await SimCardModel.update({'id': lastSimCard[0].id, 'estado' : 'ACTIVATED'});
                        awsList.pop();
                        count++
              
                    } 

              } else {

                  console.log('No hay registro en DB con ese ICCID.');
                  awsList.pop(); 
                  count++
              
                } 
        }

        if ( responseSimCard ) {

              console.log('Sim Card seleccionada: ');
              simCardSelected = await SimCardModel.update({'id': lastSimCard[0].id, 'estado' : 'SELECT'});
              console.log({simCardSelected});
              
              return {
                success: true,
                simCard: simCardSelected
              }

        } else {
                  
              return {
                success: false, 
                message: 'Error en selectSimCard'
              }

        } 

  } catch (err) {

    console.log(err);
    return {
      success: false,
      error: JSON.stringify(err),
      message: 'Error en selectSimCard'
    };

  }
};

module.exports = {
  selectSimCard,
};
