const express = require("express");
const router = express.Router();
const controller = require('../controller/taskController')

router.get('/createTask', controller.createTask);

module.exports = router;