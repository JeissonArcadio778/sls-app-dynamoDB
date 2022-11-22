// Selecciona una Sim Card que estan en estado CREATED ordenada por la fecha minima Virgin Mobile.

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
    //Tabla completa
    const results = await SimCardModel.scan().exec();
    console.log(results);

    //Tabla solo esTraking = true y estado = CREATED
    Cat.query("name").eq("Will").sort("ascending");


    // const sim = SimCardModel.scan() // 1. scan the whole table
    //   .descending() // 2. sort by descending by a date
    //   .limit(100) // 3. limit the results to 100
    //   .exec(function (error, data) {
    //     // return error or data
    //   });

    //Obtener la SIM más antigua

    //Actualizar SIM: estado = 'SELECTED'

    //GUARDAR

    return {
      status: true,
      data: results,
      sim: sim,
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
