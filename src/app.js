const express = require('express');
const volleyball = require('volleyball');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const passport = require("passport");
const { ExtractJwt, Strategy: JWTStrategy, Strategy } = require("passport-jwt");

const apiRouter = require("./routes/apiRouter");
const { User } = require("./models");

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Database connected successfully!'))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(volleyball);
app.use(helmet());
app.use(cors({ origin: '*' }));

const jwtStrategy = new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
  secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);

    if (!user) {
      done(null, false);
      return;
    }

    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(jwtStrategy);

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.use("/api/v1", apiRouter);

module.exports = app;
