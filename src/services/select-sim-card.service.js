// Selecciona una Sim Card que estan en estado CREATED ordenada por la fecha minima Virgin Mobile.
const SimCardModel = require("../models/sim-card");
const inew = require('../services/inew.service');

//RESUMEN: SIMPLEMENTE LISTA TODO POR LA FECHA MINIMA Y SELECCIONA ESE ESA SIM: SELECCIONA ESA SIM Y LUEGO LA MUESTRA

const selectSimCard = async () => {
  
try {

    console.log('Select Sim Card: ');
  
    // const results = await SimCardModel.scan().exec();
    // console.log(results);

    //Tabla solo estraking = true y estado = CREATED
    const simCardList = await SimCardModel.scan("estado").eq("CREATED").and().where("estraking").eq(true).exec();
    console.log(simCardList);

    //TODO: validación de lista vacia.

    //Organizar en orden de creación: 
    let awsList = [], data; 
    
    for (let i = 0; i < simCardList.length; i++) { 
      data = simCardList[i].fechaCreacion;
      awsList.push(data);
    }

    //Array con las fechas: 
    console.log({awsList});

    //Ordenar por fecha máxima
    let minimumDate = awsList[0];
    awsList.forEach((f,i) => {
      if (f > minimumDate) {
        minimumDate = f; 
      }
    })
    console.log({minimumDate});

    //Transformar fecha a UNIX timestamp:
    let unixMinimumDate = new Date(minimumDate).valueOf();
    console.log({unixMinimumDate});

    //Scan de la simCard con Fecha más antigua: 
    const lastSimCard = await SimCardModel.scan('fechaCreacion').eq(unixMinimumDate).exec();
    console.log({lastSimCard});

    // Actualizar SIM: estado = 'SELECTED' 
    const simCardSelected = await SimCardModel.update({'id': lastSimCard[0].id, 'estado' : 'SELECTED'});
    console.log('Sim Card seleccionada: ');
    console.log(simCardSelected);
    
    const result = inew.getSimDetailsByMSISDN(simCardSelected.msisdn); 
    
    let count = 0; 
    while (awsList.length >= (count + 1)) {
        
    }
    console.log(result);
    if (result.success) {
        console.log(result.message);
        return {
           success: false,
           message: result.message
        }
    }

    //TODO: estudiar respuesta: result de AXIOS.


     
    return {
      success: true,
      data: simCardSelected,

    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: JSON.stringify(error),
      message: 'Error en SelectSimCard'
    };
  }
};

module.exports = {
  selectSimCard,
};
