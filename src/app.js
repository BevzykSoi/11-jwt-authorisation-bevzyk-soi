const express = require("express");
const volleyball = require("volleyball");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

require("./config/passport");
const apiRouter = require("./routes/apiRouter");

const app = express();

app.use(express.json());
if (process.env.NODE_ENV !== "test") {
  app.use(volleyball);
}
app.use(helmet());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.use("/api/v1", apiRouter);

module.exports = app;
