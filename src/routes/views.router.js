const express = require("express");
const router = express.Router();

const productsViewController = require("../controllers/productsViewController");
const cartsViewController = require("../controllers/cartsViewController");
const authViewController = require("../controllers/authViewController");
const chatViewController = require("../controllers/chatViewController");
const realTimeProductsViewController = require("../controllers/realTimeProductsViewController");

const redirectIfNotLoggedIn = require('../middleware/auth.js');
const redirectIfLoggedIn = require('../middleware/loggedIn.js');

router.get("/", redirectIfNotLoggedIn, (req, res) => res.render("index"));
router.get("/products", redirectIfNotLoggedIn, productsViewController.index);
router.get("/carts", redirectIfNotLoggedIn, cartsViewController.showCarts);
router.get("/carts/:cid", redirectIfNotLoggedIn, cartsViewController.showCart);

router.get('/login', redirectIfLoggedIn, authViewController.showLogin);
router.get("/register", redirectIfLoggedIn, authViewController.showRegister);
router.get('/profile', redirectIfNotLoggedIn, authViewController.showProfile);
router.get("/chat", redirectIfNotLoggedIn, chatViewController.showChat);
router.get("/realtimeproducts", redirectIfNotLoggedIn, realTimeProductsViewController.showRealTimeProducts);

module.exports = router;