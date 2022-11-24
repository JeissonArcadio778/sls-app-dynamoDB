// Selecciona una Sim Card que estan en estado CREATED ordenada por la fecha minima Virgin Mobile.
const SimCardModel = require("../models/sim-card");
const inew = require('../services/inew.service');

//RESUMEN: SIMPLEMENTE LISTA TODO POR LA FECHA MINIMA Y SELECCIONA ESE ESA SIM: SELECCIONA ESA SIM Y LUEGO LA MUESTRA

const selectSimCard = async () => {
  
try {

          console.log('Select Sim Card: ');
    
          //Tabla solo estraking = true y estado = CREATED
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
              
              //Transformar fecha a UNIX timestamp:
              // let unixMinimumDate = new Date(minimumDate).valueOf();
              // console.log({unixMinimumDate});
          
              //Scan de la simCard con Fecha más antigua: 
              lastSimCard = await SimCardModel.scan('fechaCreacion').eq(new Date(minimumDate).valueOf()).exec(); 
      
              const result = inew.getSimDetailsByMSISDN(lastSimCard[0].msisdn); 

              if ( result != null && result.state != null && result.health != null ) {

                  if (result != null && result.state == 'INSTALLED' && result.health == 'OK') {

                        selectSimCard = true

                  }else if ( result != null && result.state == 'INSTALLED' && result.health != 'OK' ) {
                     
                        await SimCardModel.update({'id': lastSimCard[0].id, 'estado' : 'ERROR'});
                        awsList.pop(); 
                        count++
                  
                  } else {
                      
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
              simCardSelected = await SimCardModel.update({'id': lastSimCard[0].id, 'estado' : 'SELECTED'});
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

  } catch (error) {


    console.log(error);
    return {
      success: false,
      error: JSON.stringify(error),
      message: 'Error en selectSimCard'
    };
  }
};

module.exports = {
  selectSimCard,
};
