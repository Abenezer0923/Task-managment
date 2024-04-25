const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');

router.post('/create', controller.createUser);
router.get('/getAll', controller.GetAllUsers);
router.get('/:id', controller.getById);
router.patch('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser)

module.exports = router;
