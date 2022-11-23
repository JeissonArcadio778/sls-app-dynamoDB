// Selecciona una Sim Card que estan en estado CREATED ordenada por la fecha minima Virgin Mobile.
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
    
    // Tabla completa: 

    // const results = await SimCardModel.scan().exec();
    // console.log(results);

    //Tabla solo estraking = true y estado = CREATED
    const simCard = await SimCardModel.scan("estado").eq("CREATED").and().where("estraking").eq(true).exec();
    // console.log(simCard);

    // const simCardQuery = await SimCardModel.query('estado').eq('CREATED').and().where('estraking').eq(true).exec(); 
    // console.log(simCardQuery);
    // const {} = simCard; 

    //Uso de sort:

    //Obtener la SIM más antigua:

    //Actualizar SIM: estado = 'SELECTED': 

    const simCardSelected = await SimCardModel.update({'id': simCard[0].id, 'estado' : 'SELECTED'});

    console.log(simCardSelected);

    return {
      status: true,
      data: simCardSelected,
      // sim: sim,
      // result : results
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
