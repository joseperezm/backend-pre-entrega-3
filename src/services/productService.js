const ProductManager = require("../dao/db/productManager");
const productManager = new ProductManager();

exports.getProducts = async ({ limit, page, sort, query }) => {
    return await productManager.getProducts({ limit, page, sort, query });
};

exports.getProductById = async (productId) => {
    return await productManager.getProductById(productId);
};

exports.addProduct = async (productData) => {
    return await productManager.addProduct(productData);
};

exports.updateProduct = async (productId, productData) => {
    return await productManager.updateProduct(productId, productData);
};

exports.deleteProduct = async (productId) => {
    return await productManager.deleteProduct(productId);
};