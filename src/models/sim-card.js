//LOCAL: 
require("dotenv").config();
const dynamoose = require("dynamoose");

const SERVICES_TABLE = process.env.SERVICES_TABLE;

console.log(SERVICES_TABLE);

const sdk = dynamoose.aws.sdk;

sdk.config.update({
  accessKeyId: "AKID",
  secretAccessKey: "SECRET",
  region: "us-east-1",
});

dynamoose.aws.ddb.local();

const schema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    esTraking: Boolean, 
    msisdn: String,
    iccid: {
      type: String,
    },
    puk: String,
    estado: String, 
  },
  { saveUnknown: ["actions.**"], 
  "timestamps": true }, 
  //Fecha de actualización
);

const SimCardModel = dynamoose.model(SERVICES_TABLE, schema, {
  create: true,
  update: true,
});

module.exports = SimCardModel;