const CartManager = require("../dao/db/cartManager");
const cartManager = new CartManager();

exports.createCart = async () => {
    return await cartManager.createCart();
};

exports.getAllCarts = async () => {
    return await cartManager.getAllCarts();
};

exports.getCart = async (cartId) => {
    return await cartManager.getCart(cartId);
};

exports.addToCart = async (cartId, productId, quantity) => {
    return await cartManager.addToCart(cartId, productId, quantity);
};

exports.updateCartProducts = async (cartId, products) => {
    return await cartManager.updateCartProducts(cartId, products);
};

exports.updateProductQuantity = async (cartId, productId, quantity) => {
    return await cartManager.updateProductQuantity(cartId, productId, quantity);
};

exports.emptyCart = async (cartId) => {
    return await cartManager.emptyCart(cartId);
};

exports.deleteCart = async (cartId) => {
    return await cartManager.deleteCart(cartId);
};

exports.deleteProductFromCart = async (cartId, productId) => {
    return await cartManager.deleteProductFromCart(cartId, productId);
};