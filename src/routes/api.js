const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/users', apiController.getUsers);
router.post('/users', apiController.createUser);
router.put('/users/:id', apiController.updateUser);
router.delete('/users/:id', apiController.deleteUser);

router.get('/extracts', apiController.getExtracts);
router.put('/extracts/:id', apiController.updateExtract);
router.delete('/extracts/:id', apiController.deleteExtract);

router.get('/cards', apiController.getCards);
router.put('/cards/:id', apiController.updateCard);
router.delete('/cards/:id', apiController.deleteCard);

module.exports = router;