// Selecciona una Sim Card que estan en estado CREATED ordenada por la fecha minima Virgin Mobile.
const SimCardModel = require("../models/sim-card");
const inew = require('../services/inew.service');

const selectSimCard = async () => {
  
try {

          console.log('Select Sim Card: ');
    
          //Lista solo estraking = true y estado = CREATED
          const simCardList = await SimCardModel.scan("estado").eq("CREATED").and().where("estraking").eq(true).exec(); 

          //Organizar en orden de creación: 
          let awsList = [], data; 
          
          for (let i = 0; i < simCardList.length; i++) { 
                data = simCardList[i].fechaCreacion;
                awsList.push(data);
          }
    
        let responseSimCard = false, count = 0, lastSimCard;
        while (!responseSimCard && awsList.length > (count + 1)) {
          
              //Ordenar por fecha máxima
              let minimumDate = awsList[0];
              awsList.forEach((f,i) => {
                if (f > minimumDate) {
                  minimumDate = f; 
                }
              })
              
              //Scan de la simCard con Fecha más antigua: 
              lastSimCard = await SimCardModel.scan('fechaCreacion').eq(new Date(minimumDate).valueOf()).exec(); 
      
              const result = await inew.getSimDetailsByICCID(lastSimCard[0].iccid); 

              console.log(result.data.return);

              if ( result.data.return != null && result.data.return.state != null && result.data.return.health != null ) {

                  if ( result.data.return != null && result.data.return.state == 'INSTALLED' && result.data.return.health == 'OK') {

                        responseSimCard = true

                  }else if ( result.data.return != null && result.data.return.state == 'INSTALLED' && result.data.return.health != 'OK' ) {
                     
                        await SimCardModel.update({'id': lastSimCard[0].id, 'estado' : 'ERROR'});
                        awsList.pop(); 
                        count++
                  
                  } else {
                        //TODO: ¿Por qué se actualiza este estado aqui? Porque ya ha sido usado por alguien. 
                        await SimCardModel.update({'id': lastSimCard[0].id, 'estado' : 'ACTIVATED'});
                        awsList.pop();
                        count++
                  
                    } 

              } else {

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
