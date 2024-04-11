const cartService = require('../services/cartService');

exports.showCarts = async (req, res) => {
    try {
        const carts = await cartService.getAllCarts();
        const cartsObjects = carts.map(cart => cart.toObject ? cart.toObject() : cart);
        res.render('carts', { carts: cartsObjects });
    } catch (error) {
        console.error("Error al obtener todos los carritos", error);
        res.status(500).render('error', { message: "Error al intentar listar los carritos" });
    }
};

exports.showCart = async (req, res) => {
    try {
        const cart = await cartService.getCart(req.params.cid);
        if (cart) {
            const cartObject = cart.toObject ? cart.toObject() : cart;
            res.render('cart', { cart: cartObject });
        } else {
            res.status(404).render('error', { message: "Carrito no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el carrito por ID", error);
        res.status(500).render('error', { message: "Error interno del servidor" });
    }
};
