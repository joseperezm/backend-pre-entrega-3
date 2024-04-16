const cartService = require('../services/cartService');

exports.createCart = async (req, res) => {
    try {
        const cart = await cartService.createCart();
        res.status(201).json({ cid: cart._id, message: "Carrito creado correctamente" });
    } catch (error) {
        console.error("Error al crear el carrito: ", error);
        res.status(500).json({ error: "Error del servidor" });
    }
};

exports.getAllCarts = async (req, res) => {
    try {
        const carts = await cartService.getAllCarts();
        res.json(carts);
    } catch (error) {
        console.error("Error al obtener los carritos: ", error);
        res.status(500).json({ error: "Error del servidor" });
    }
};

exports.getCart = async (req, res) => {
    try {
        const cart = await cartService.getCart(req.params.cid);
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ message: "Carrito no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el carrito por ID: ", error);
        res.status(500).json({ error: "Error del servidor" });
    }
};

exports.addToCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity = 1 } = req.body;

    try {
        const { success, message, cart } = await cartService.addToCart(cid, pid, quantity);
        if (success) {
            res.json({ message, cart });
        } else {
            res.status(404).json({ message });
        }
    } catch (error) {
        console.error("Error al agregar producto al carrito: ", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};

exports.updateCartProducts = async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;

    try {
        const updatedCart = await cartService.updateCartProducts(cid, products);
        if (updatedCart) {
            res.json({ message: "Carrito actualizado con éxito", cart: updatedCart });
        } else {
            res.status(404).json({ message: "Carrito no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar el carrito: ", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};

exports.updateProductQuantity = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const result = await cartService.updateProductQuantity(cid, pid, quantity);
        if (result.success) {
            res.json({ message: "Cantidad actualizada correctamente", cart: result.cart });
        } else {
            res.status(404).json({ message: result.message });
        }
    } catch (error) {
        console.error("Error al actualizar la cantidad del producto en el carrito: ", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};

exports.emptyCart = async (req, res) => {
    try {
        const success = await cartService.emptyCart(req.params.cid);
        if (success) {
            res.json({ message: "Carrito vaciado correctamente" });
        } else {
            res.status(404).json({ message: "Carrito no encontrado" });
        }
    } catch (error) {
        console.error("Error al vaciar el carrito: ", error);
        res.status(500).json({ error: "Error del servidor" });
    }
};

exports.deleteCart = async (req, res) => {
    try {
        const success = await cartService.deleteCart(req.params.cid);
        if (success) {
            res.json({ message: "Carrito eliminado correctamente" });
        } else {
            res.status(404).json({ message: "Carrito no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar el carrito: ", error);
        res.status(500).json({ error: "Error del servidor" });
    }
};

exports.deleteProductFromCart = async (req, res) => {
    try {
        const { success, message, cart } = await cartService.deleteProductFromCart(req.params.cid, req.params.pid);
        if (success) {
            res.json({ message, cart });
        } else {
            res.status(404).json({ message });
        }
    } catch (error) {
        console.error("Error al eliminar producto del carrito: ", error);
        res.status(500).json({ error: "Error del servidor" });
    }
};

exports.finalizePurchase = async (req, res) => {
    const cartId = req.params.cid;
    const userEmail = req.user.email;
    try {
        const result = await cartService.finalizePurchase(cartId, userEmail);
        if (result.failedProducts.length > 0) {
            res.status(206).json({
                success: true,
                message: "Compra parcialmente exitosa",
                totalAmount: result.totalAmount,
                ticketId: result.ticketId,
                failedProducts: result.failedProducts
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Compra finalizada con éxito",
                totalAmount: result.totalAmount,
                ticketId: result.ticketId
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};