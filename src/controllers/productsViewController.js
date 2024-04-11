const productService = require('../services/productService');

exports.index = async (req, res) => {
    try {
        const { limit, page, sort, query } = req.query;
        const options = { limit, page, sort, query };
        const result = await productService.getProducts(options);
        const productosObj = result.products.map(producto => producto.toObject ? producto.toObject() : producto);
        const messages = req.flash();
        res.render("products", { messages, productos: productosObj, ...result, options });
    } catch (error) {
        console.error("Error al obtener productos", error);
        res.status(500).render('error', { message: "Error interno del servidor" });
    }
};
