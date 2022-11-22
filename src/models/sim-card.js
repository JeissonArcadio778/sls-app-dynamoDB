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
    IndexName: "createdAt",
    KeySchema: [
            { AttributeName: "status", KeyType: "HASH" },
            { AttributeName: "createdAt", KeyType: "RANGE" }
        ],
    Projection: { ProjectionType: "ALL" },
    ProvisionedThroughpu: {
          ReadCapacityUnits: 100,
          WriteCapacityUnits: 100
    },
    id: {
      type: String,
      // hashKey: true,
    },
    estraking: Boolean, 
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