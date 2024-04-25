const express = require("express");
const router = express.Router();
const controller = require('../controller/taskController')

router.post('/createTask', controller.createTask);
router.get('/getTask', controller.getTask);
router.put('/putTask', controller.putTask);
router.delete('/delete', controller.deleteTask);
module.exports = router;