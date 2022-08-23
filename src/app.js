const express = require('express');
const volleyball = require('volleyball');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const apiRouter = require("./routes/apiRouter");
require("./config/passport/index");
require("./config/db");

const app = express();

app.use(express.json());
app.use(volleyball);
app.use(helmet());
app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.use("/api/v1", apiRouter);

module.exports = app;
