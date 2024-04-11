const productService = require('../services/productService');

exports.getProducts = async (req, res) => {
    const limit = req.query.limit === undefined ? 10 : parseInt(req.query.limit, 10);
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort;
    const query = req.query.query;

    try {
        const { products, totalPages } = await productService.getProducts({ limit, page, sort, query });
        const hasPrevPage = page > 1;
        const hasNextPage = page < totalPages;
        const prevPage = hasPrevPage ? page - 1 : null;
        const nextPage = hasNextPage ? page + 1 : null;
        const baseUrl = '/api/products?';

        res.json({
            status: "success",
            products,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink: hasPrevPage ? `${baseUrl}page=${prevPage}` : null,
            nextLink: hasNextPage ? `${baseUrl}page=${nextPage}` : null
        });
    } catch (error) {
        console.error('Error obteniendo los productos:', error);
        res.status(500).json({ status: "error", message: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.pid);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Producto no encontrado o inexistente' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const newProduct = req.body;
        const product = await productService.addProduct(newProduct);
        res.status(201).json({ id: product._id, message: 'Producto agregado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        if (updatedProduct) {
            res.json({ message: 'Producto actualizado correctamente', product: updatedProduct });
        } else {
            res.status(404).json({ message: 'Producto no encontrado o inexistente' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const success = await productService.deleteProduct(req.params.pid);
        if (success) {
            res.status(200).json({ message: 'Producto eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'El producto que desea eliminar no existe' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};