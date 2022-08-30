const express = require('express');
const volleyball = require('volleyball');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

const apiRouter = require("./routes/apiRouter");
const viewsRouter = require("./routes/viewsRouter");
require("./config/passport/index");
require("./config/db");

const app = express();

app.use(express.urlencoded({ extended: false, }));
app.use(volleyball);
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.use("/", viewsRouter);

app.use("/api/v1", apiRouter);

module.exports = app;
