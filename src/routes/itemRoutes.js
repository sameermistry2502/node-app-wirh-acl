const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Define routes for item operations
router.get('/', itemController.getAllItems);
router.get('/getItem/:id', itemController.getItemById);
router.post('/addItem', itemController.createItem);
router.put('/update/:id', itemController.updateItem);
router.delete('/delete/:id', itemController.deleteItem);

module.exports = router;
