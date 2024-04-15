const express = require("express");
const router = express.Router();
const productsController = require('../controllers/productsController');
const redirectIfNotLoggedInApi = require('../middleware/authApi.js');
const authorizeApi = require('../middleware/authorizeApi.js');

router.get('/products', redirectIfNotLoggedInApi, productsController.getProducts);
router.get('/products/:pid', redirectIfNotLoggedInApi, productsController.getProductById);
router.post('/products', authorizeApi('admin'), redirectIfNotLoggedInApi, productsController.addProduct);
router.put('/products/:id', authorizeApi('admin'), redirectIfNotLoggedInApi, productsController.updateProduct);
router.delete('/products/:pid', authorizeApi('admin'), redirectIfNotLoggedInApi, productsController.deleteProduct);

module.exports = router;