const { User } = require("../models");
const jwt = require("../utils/jwt");

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({
      username,
    });

    if (existingUser) {
      res.status(403).send("Username is already taken");
      return;
    }

    const hashedPassword = await User.hashPassword(password);

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const token = jwt.generate(user._id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(422).send("No credentials!");
        return;
    }

    const user = await User.findOne({
      username,
    });

    if (!user) {
      res.status(403).send("Wrong credentials!");
      return;
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      res.status(403).send("Wrong credentials!");
      return;
    }

    const token = jwt.generate(user._id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.profile = async (req, res, next) => {
  try {
    if (!req.user) {
        res.status(401).send("Unauthorized!");
        return;
    }

    res.json(req.user);
  } catch (error) {
    next(error);
  }
};