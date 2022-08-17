const express = require('express');

const { auth } = require("../middlewares");
const usersController = require("../controllers/usersController");

const router = express.Router();

router.put("/:id", auth, usersController.update);
router.get("/", usersController.getAll);

module.exports = router;