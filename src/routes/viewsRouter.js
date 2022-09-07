const express = require('express');

const router = express.Router();

const { auth } = require("../middlewares");

router.get("/", (req, res) => {
    res.render("index", {
        user: req.user,
    });
});

router.get("/login", (req, res) => {
    const messages = req.flash("message");
    res.render("login", {
        messages,
    });
});

router.get("/register", (req, res) => {
    const messages = req.flash("message");
    res.render("register", {
        messages,
    });
});

router.get("/profile", auth, (req, res) => {
    res.render("profile", {
        user: req.user,
    });
});

module.exports = router;