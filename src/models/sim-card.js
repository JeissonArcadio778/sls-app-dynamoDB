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
      hashKey: true
    },
    estraking: Boolean, 
    msisdn: String,
    iccid: String,
    puk: String,
    estado: String,
    status: Boolean,
    serial: String
  },
  { 
  saveUnknown: ["actions.**"], 
    timestamps:  {
    createdAt: 'fechaCreacion', 
    updatedAt: 'fechaActualizacion'
}}
);

const SimCardModel = dynamoose.model(SERVICES_TABLE, schema, {
  create: true,
  update: true,
});

module.exports = SimCardModel;