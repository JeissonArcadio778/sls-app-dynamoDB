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
    
    // Tabla completa: 

    // const results = await SimCardModel.scan().exec();
    // console.log(results);

    //Tabla solo estraking = true y estado = CREATED
    // const simCards = await SimCardModel.scan("estado").eq("CREATED").and().where("estraking").eq(true).exec();
    // console.log(simCards);

    const result = await SimCardModel.query({
      TableName: "ms_leads_simcardsv2",
      IndexName: "createdAt",
      KeyConditionExpression: "#status = :status and #createdAt > :createdAt",
      Limit: 5,
      ExpressionAttributeValues: {
        ":status": {
          "S": "active"
        },
        ":createdAt": {
          "S": "2020-12-10T15:00:00.000Z"
        }
      },
      ExpressionAttributeNames: {
        "#status": "status",
        "#createdAt": "createdAt"
      },
    }).promise();

    // console.log(result);


    //Obtener la SIM más antigua: 



    //Actualizar SIM: estado = 'SELECTED'

    //GUARDAR

    return {
      status: true,
      // data: simCards,
      // sim: sim,
      result : result
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
