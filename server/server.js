const express = require("express");
const cors = require("cors");
require("./database/db");
const bodyParser = require("body-parser");
const Routes = require("./routes/route.js");

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(Routes);

const PORT = 8080;

app.listen(PORT, () =>
  console.log(`Your server is running successfully on PORT ${PORT}`)
);
