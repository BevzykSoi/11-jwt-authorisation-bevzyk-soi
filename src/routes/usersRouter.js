const express = require("express");

const usersController = require("../controllers/usersController");
const { auth } = require("../middlewares");

const router = express.Router();

router.put("/:id", auth, usersController.update);

module.exports = router;
