const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/', usersController.addUser);
router.put('/:id/deposit', usersController.deposit);
router.put('/:id/updateCredit', usersController.updateCredit);
router.put('/:id/withdraw', usersController.withdraw);
router.put('/:id/transfer/:receiverId', usersController.transfer);
router.get('/:id', usersController.getUserDetails);
router.get('/', usersController.getAllUsers);

module.exports = router;
