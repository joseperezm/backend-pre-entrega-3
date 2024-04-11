const express = require("express");
const router = express.Router();
const cartsController = require('../controllers/cartsController');
const redirectIfNotLoggedInApi = require('../middleware/authApi.js');

router.post("/carts", redirectIfNotLoggedInApi, cartsController.createCart);
router.get("/carts", redirectIfNotLoggedInApi, cartsController.getAllCarts);
router.get("/carts/:cid", redirectIfNotLoggedInApi, cartsController.getCart);
router.post("/carts/:cid/product/:pid", redirectIfNotLoggedInApi, cartsController.addToCart);
router.put("/carts/:cid", redirectIfNotLoggedInApi, cartsController.updateCartProducts);
router.put("/carts/:cid/product/:pid", redirectIfNotLoggedInApi, cartsController.updateProductQuantity);
router.delete("/carts/:cid", redirectIfNotLoggedInApi, cartsController.emptyCart);
router.delete("/carts/:cid/delete", redirectIfNotLoggedInApi, cartsController.deleteCart);
router.delete("/carts/:cid/product/:pid", redirectIfNotLoggedInApi, cartsController.deleteProductFromCart);

module.exports = router;