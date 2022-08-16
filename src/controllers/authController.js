const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User } = require("../models");

exports.register = async (req, res, next) => {
    try {
        const { username, password, age, description } = req.body;

        const existingUser = await User.findOne({
            username,
        });

        if (existingUser) {
            res.status(422).send("Username is already taken!");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            username,
            password: hashedPassword,
            age,
            description
        });

        const payload = {
            _id: user.id,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "14d",
        });

        res.json({
            user,
            token,
        });
    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({
            username,
        });

        if (!user) {
            res.status(422).send("Wrong credentials! Try again later!");
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(422).send("Wrong credentials! Try again later!");
            return;
        }

        const payload = {
            _id: user.id,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "14d",
        });

        res.json({
            user,
            token,
        });
    } catch (error) {
        next(error);
    }
}

exports.profile = async (req, res, next) => {
    try {
        res.json(req.user);
    } catch (error) {
        next(error);
    }
}