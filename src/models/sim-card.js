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
      type: String
    },
    estraking: Boolean, 
    msisdn: String,
    iccid: String,
    puk: String,
    estado: {
      type: String,
      // hashKey: true
    },
    status: {
      type: Boolean
    },
    serial: String,
  },
  { 
  saveUnknown: ["actions.**"], 
    timestamps:  {
    createdAt: 'fechaCreacion', 
    updatedAt: 'fechaActualizacion'
}
}
);

const SimCardModel = dynamoose.model(SERVICES_TABLE, schema, {
  create: true,
  update: true,
});

module.exports = SimCardModel;


//INTENTO DYNAMO: 

// let CustomerSchema = new new dynamoose.Schema({

//   personid: {
//       type: String,
//       hashKey: true,
//       validate: (v) => {
//           return typeof(v) !== 'undefined';
//       }
//   },
//   email: {
//       type: String,
//       index: {
//           global: true,
//           name: 'EmailIndex',
//           rangeKey: 'personid',
//       }
//   },
//   phone: {
//       type: String,
//       index: {
//           global: true,
//           name: 'PhoneIndex',
//           rangeKey: 'personid',
//       }
//   },
//   created_date: {
//       type: Date,
//       required: true,
//       index: {
//           global: true,
//           name: 'CreatedIndex',
//           rangeKey: 'personid',
//       },
//   },
//   updated_date: {
//       type: Date,
//       required: true,
//       index: {
//           global: true,
//           name: 'UpdatedIndex',
//           rangeKey: 'personid',
//       },
//   }
// }, {
//   // schema options
//   timestamps: {
//       createdAt: "created_date",
//       updatedAt: "updated_date",
//   },
// });

// const CustomerOptions = {
//   update: true,
// };

// const CustomerRecord = dynamoose.model('customer', CustomerSchema, CustomerOptions);