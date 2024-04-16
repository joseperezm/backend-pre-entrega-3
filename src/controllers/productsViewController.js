const productService = require('../services/productService');

exports.index = async (req, res) => {
    try {
        const limit = req.query.limit === undefined ? 10 : parseInt(req.query.limit, 10);
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort || '';
        const query = req.query.query || '';
        
        const options = { limit, page, sort, query };
        const result = await productService.getProducts(options);
        const productosObj = result.products.map(producto => producto.toObject ? producto.toObject() : producto);
        
        const messages = req.flash();
        
        // Calculo de controladores de paginación
        const hasPrevPage = page > 1;
        const hasNextPage = page < result.totalPages;
        const prevPage = hasPrevPage ? page - 1 : null;
        const nextPage = hasNextPage ? page + 1 : null;
        
        // Generar lista de páginas (esto puede ajustarse según tu necesidad exacta)
        const pages = Array.from({ length: result.totalPages }, (_, i) => ({
            number: i + 1,
            isCurrent: (i + 1) === page
        }));

        res.render("products", {
            messages, 
            productos: productosObj,
            options,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            pages,
            sort
        });
    } catch (error) {
        console.error("Error al obtener productos", error);
        res.status(500).render('error', { message: "Error interno del servidor" });
    }
};