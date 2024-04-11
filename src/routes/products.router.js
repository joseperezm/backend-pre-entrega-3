const express = require("express");
const router = express.Router();
const productsController = require('../controllers/productsController');
const redirectIfNotLoggedInApi = require('../middleware/authApi.js');

router.get('/products', redirectIfNotLoggedInApi, productsController.getProducts);
router.get('/products/:pid', redirectIfNotLoggedInApi, productsController.getProductById);
router.post('/products', redirectIfNotLoggedInApi, productsController.addProduct);
router.put('/products/:id', redirectIfNotLoggedInApi, productsController.updateProduct);
router.delete('/products/:pid', redirectIfNotLoggedInApi, productsController.deleteProduct);

module.exports = router;