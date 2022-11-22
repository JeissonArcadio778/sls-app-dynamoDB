const express = require("express"); 
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Manipular el acceso con cors
const allowedOrigins = ['*'];
const corsOptions = {
  origin: allowedOrigins
}

app.use(cors(corsOptions));

//ROUTES:
app.use('/*/api/v1', require('./routes/sim-card.route'));

// Test
app.get("/*/ping", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "pong"
  });
});


app.use((req, res, next) => {
  return res.status(404).json({
    success: false,
    message: "Not Found",
    data: []
  });
});

module.exports = app;
