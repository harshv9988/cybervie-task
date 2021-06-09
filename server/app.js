const express = require("express");
const app = express();

const bodyparser = require("body-parser");
let cors = require("cors");

// parsing middlewares
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//cors

app.use("/", require("./routes/index"));

module.exports = app;
