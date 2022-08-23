const jwt = require("jsonwebtoken");

const defaultOptions = {
    expiresIn: "14d",
}

exports.generete = (userId) => {
    const payload = {
        _id: userId,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, defaultOptions);

    return token;
}

exports.verify = (token) => jwt.verify(token, process.env.JWT_SECRET);