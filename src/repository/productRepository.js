const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { CastError } = require('mongoose').Error;
const Product = require('../dao/models/products-mongoose');

Product.schema.plugin(mongoosePaginate);

class ProductRepository {
    constructor() {}

    async addProduct(productData) {
        try {
            const product = new Product(productData);
            await product.save();
            return product;
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    }

    async getProducts(opts = null) {
        try {
            if (!opts) {
                return await Product.find({});
            }
    
            const { limit, page = 1, sort = '', query = '' } = opts;
    
            let queryFilter = {};
            if (query) {
                if (query.startsWith("categoria:") || query.startsWith("disponible:")) {
                    const [key, value] = query.split(":");
                    if (key === "categoria") {
                        queryFilter.category = value;
                    } else if (key === "disponible") {
                        queryFilter.status = value === 'true';
                    }
                } else {
                    queryFilter.$or = [
                        { title: { $regex: query, $options: 'i' } },
                        { description: { $regex: query, $options: 'i' } }
                    ];
                }
            }
    
            let sortOptions = {};
            if (sort === 'asc' || sort === 'desc') {
                sortOptions.price = sort === 'asc' ? 1 : -1;
            }
    
            if (limit === undefined || limit === 0) {
                const docs = await Product.find(queryFilter).sort(sortOptions);
                return {
                    products: docs,
                    totalPages: 1,
                    page: 1,
                    hasPrevPage: false,
                    hasNextPage: false,
                    prevPage: null,
                    nextPage: null,
                };
            } else {
                const options = {
                    page,
                    limit,
                    sort: sortOptions,
                };
                const result = await Product.paginate(queryFilter, options);
                return {
                    products: result.docs,
                    totalPages: result.totalPages,
                    page: result.page,
                    hasPrevPage: result.hasPrevPage,
                    hasNextPage: result.hasNextPage,
                    prevPage: result.prevPage,
                    nextPage: result.nextPage,
                };
            }
        } catch (error) {
            console.error('Error obteniendo los productos:', error);
            throw error;
        }
    }

    async getProductById(productId) {
        try {
            return await Product.findById(productId);
        } catch (error) {
            if (error instanceof CastError && error.path === '_id') {
                console.error('Incorrect product ID:', error);
                return null;
            } else {
                console.error('Error getting product by ID:', error);
                throw error;
            }
        }
    }

    async updateProduct(productId, productData) {
        try {
            return await Product.findByIdAndUpdate(productId, productData, { new: true });
        } catch (error) {
            if (error instanceof CastError && error.path === '_id') {
                console.error('Incorrect product ID:', error);
                return null;
            } else {
                console.error('Error updating product:', error);
                throw error;
            }
        }
    }

    async deleteProduct(productId) {
        try {
            return await Product.findByIdAndDelete(productId);
        } catch (error) {
            if (error instanceof CastError && error.path === '_id') {
                console.error('Incorrect product ID:', error);
                return null;
            } else {
                console.error('Error deleting product:', error);
                throw error;
            }
        }
    }

    createQueryFilter(query) {
        let queryFilter = {};
        if (query) {
            if (query.startsWith("categoria:") || query.startsWith("disponible:")) {
                const [key, value] = query.split(":");
                queryFilter[key === "categoria" ? 'category' : 'status'] = value === 'true' || value;
            } else {
                queryFilter.$or = [
                    { title: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } }
                ];
            }
        }
        return queryFilter;
    }

    createSortOptions(sort) {
        let sortOptions = {};
        if (sort === 'asc' || sort === 'desc') {
            sortOptions.price = sort === 'asc' ? 1 : -1;
        }
        return sortOptions;
    }
}

module.exports = ProductRepository;