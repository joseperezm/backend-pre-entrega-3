const CartRepositor = require("../repository/cartRepository");
const cartRepositor = new CartRepositor();

exports.createCart = async () => {
    return await cartRepositor.createCart();
};

exports.getAllCarts = async () => {
    return await cartRepositor.getAllCarts();
};

exports.getCart = async (cartId) => {
    return await cartRepositor.getCart(cartId);
};

exports.addToCart = async (cartId, productId, quantity) => {
    return await cartRepositor.addToCart(cartId, productId, quantity);
};

exports.updateCartProducts = async (cartId, products) => {
    return await cartRepositor.updateCartProducts(cartId, products);
};

exports.updateProductQuantity = async (cartId, productId, quantity) => {
    return await cartRepositor.updateProductQuantity(cartId, productId, quantity);
};

exports.emptyCart = async (cartId) => {
    return await cartRepositor.emptyCart(cartId);
};

exports.deleteCart = async (cartId) => {
    return await cartRepositor.deleteCart(cartId);
};

exports.deleteProductFromCart = async (cartId, productId) => {
    return await cartRepositor.deleteProductFromCart(cartId, productId);
};