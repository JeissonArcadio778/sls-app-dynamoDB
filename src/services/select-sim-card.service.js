// Selecciona una Sim Card que estan en estado CREATED ordenada por la fecha minima Virgin Mobile.
const { aws } = require("dynamoose");
const {SortOrder} = require("dynamoose/dist/General");
const SimCardModel = require("../models/sim-card");

//Busqueda en la DB buscando por estado y Estraking: lista

// variables:

// count, found (boolean), entidad (simCard)

//validacion de que sí encuentre algo {

//Método sort para organizar la lista (sort):

//Se recorre la lista para sacar las entidades:

//Se obtienen los detalles de la sim por ICCID.

//Validación de respuesta de los detalles, si no es nulo {

//Si el estado es igual a INSTALLED:
// found = true

// si hay algun error:
// cambio de estado a ERROR

//Cambia el estado a true
//Aumentar el contador

//

// } si no{

//Error!

// }

// }

//Traer datos de la DB, listar por fecha, tomar la fecha minima y enviar esa sim

//Traer los datos

//RESUMEN: SIMPLEMENTE LISTA TODO POR LA FECHA MINIMA Y SELECCIONA ESE ESA SIM: SELECCIONA ESA SIM Y LUEGO LA MUESTRA

const selectSimCard = async () => {
  
try {

  console.log('Select Sim Card: ');
  
    // const results = await SimCardModel.scan().exec();
    // console.log(results);

    //Tabla solo estraking = true y estado = CREATED
    const simCardList = await SimCardModel.scan("estado").eq("CREATED").and().where("estraking").eq(true).exec();
    // console.log(Array.isArray(simCardList));


    //Organizar en orden de creación: 

    let awsList = []
    
    for (let i = 0; i < simCardList.length; i++) { 
      awsList +=  simCardList[i].fechaCreacion;
      // console.log(awsList);
      
    }
    // Array.isArray(aws)
    // console.log({awsList});

    //Sacar el último registro.
    lastSimCard = simCardList[simCardList.length - 1].id

    SimCardModel.scan('fechaCreacion').gt(1669237170066).exec((err, customers) => {

        if (err) {
            console.log(err);
        }
        console.log({customers});
    });

    //TODO: Obtener la SIM más antigua: ¿cómo puedo saber en cómo está construida la tabla de DynamoDB? Es que necesito saber cómo está construida para saber cómo trabajo la manipulación de la SIM con fecha más antigua.

    //Actualizar SIM: estado = 'SELECTED': 
    const simCardSelected = await SimCardModel.update({'id': lastSimCard, 'estado' : 'SELECTED'});
    
    console.log('Sim Card seleccionada: ');
    console.log(simCardSelected);
    //SEGUNDO INTENTO: sacar Query con fecha más reciente. 

    // const simCardQuery = await SimCardModel.query('estado').eq('CREATED').where('estraking').eq(true).where('fechaCreacion').sort('ascending').exec(); 
    // console.log(simCardQuery);    



    return {
      status: true,
      data: simCardList, simCardSelected

    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      error: JSON.stringify(error),
    };
  }
};

module.exports = {
  selectSimCard,
};
