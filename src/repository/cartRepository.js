const mongoose = require('mongoose');
const { CastError } = require('mongoose').Error;
const Cart = require('../dao/models/carts-mongoose');
const Product = require('../dao/models/products-mongoose');
const Ticket = require('../dao/models/ticket-mongoose');

class CartRepository {
    constructor() {}

    async createCart() {
        try {
            const cart = new Cart();
            await cart.save();
            return cart;
        } catch (error) {
            console.error('Error creating the cart:', error);
            throw error;
        }
    }

    async addToCart(cartId, productId, quantity = 1) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) {
                console.log('Cart not found');
                return { success: false, message: 'Cart not found', cart: null };
            }

            const product = await Product.findById(productId);
            if (!product) {
                console.log('Product not found');
                return { success: false, message: 'Product not found', cart: null };
            }

            const existingProductIndex = cart.products.findIndex(item => item.productId.equals(productId));

            if (existingProductIndex >= 0) {
                cart.products[existingProductIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }

            await cart.save();
            return { success: true, message: 'Product added to cart successfully', cart: cart };
        } catch (error) {
            if (error instanceof CastError) {
                console.error('Incorrect ID:', error);
                return { success: false, message: 'Incorrect cart or product ID', cart: null };
            } else {
                console.error('Error adding product to cart:', error);
                throw error;
            }
        }
    }

    async getAllCarts() {
        try {
            const carts = await Cart.find(); 
            return carts;
        } catch (error) {
            console.error('Error obteniendo todos los carritos:', error);
            throw error;
        }
    } 

    async getCart(cartId) {
        try {
            const cart = await Cart.findById(cartId).populate('products.productId');
            if (!cart) {
                console.log('Cart not found');
                return null;
            }
            return cart;
        } catch (error) {
            if (error instanceof CastError && error.path === '_id') {
                console.error('Incorrect cart ID:', error);
                return null; 
            } else {
                console.error('Error getting the cart:', error);
                throw error;
            }
        }
    }

    async deleteCart(cartId) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) {
                console.log('Cart not found');
                return false;
            }

            await cart.deleteOne();
            return true;
        } catch (error) {
            if (error instanceof CastError) {
                console.error('Incorrect ID:', error);
                return false;
            } else {
                console.error('Error deleting the cart:', error);
                throw error;
            }
        }
    }

    async deleteProductFromCart(cartId, productId) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) {
                console.log('Cart not found');
                return { success: false, message: 'Cart not found' };
            }

            const productIndex = cart.products.findIndex(product => product.productId.equals(productId));

            if (productIndex !== -1) {
                if (cart.products[productIndex].quantity > 1) {
                    cart.products[productIndex].quantity -= 1;
                } else {
                    cart.products.splice(productIndex, 1);
                }

                await cart.save();
                return { success: true, message: 'Product removed from cart successfully', cart: cart };
            } else {
                return { success: false, message: 'Product not found in the cart', cart: cart };
            }
        } catch (error) {
            if (error instanceof CastError) {
                console.error('Incorrect ID:', error);
                return { success: false, message: 'Cart not found' };
            } else {
                console.error('Error removing product from cart:', error);
                throw error;
            }
        }
    }

    async updateProductQuantity(cartId, productId, quantity) {
        const cart = await this.getCart(cartId);
        if (!cart) {
            return { success: false, message: "Cart not found" };
        }

        const productIndex = cart.products.findIndex(p => p.productId.equals(productId));
        if (productIndex === -1) {
            return { success: false, message: "Product not found in the cart" };
        }

        if (quantity <= 0) {
            cart.products.splice(productIndex, 1);
        } else {
            cart.products[productIndex].quantity = quantity;
        }

        await cart.save();
        return { success: true, cart: cart };
    }

    async updateCartProducts(cartId, products) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) {
                return { success: false, message: "Cart not found" };
            }

            const updatedProducts = products.map(product => ({
                productId: new mongoose.Types.ObjectId(product.productId),
                quantity: Number(product.quantity)
            }));

            cart.products = updatedProducts;

            await cart.save();
            return { success: true, cart: cart };
        } catch (error) {
            console.error("Error updating the cart with new products", error);
            throw error;
        }
    }

    async emptyCart(cartId) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) {
                console.log('Cart not found');
                return { success: false, message: 'Cart not found' };
            }

            cart.products = [];

            await cart.save();
            return { success: true, message: 'Cart emptied successfully', cart: cart };
        } catch (error) {
            if (error instanceof CastError) {
                console.error('Incorrect cart ID:', error);
                return { success: false, message: 'Incorrect cart ID' };
            } else {
                console.error('Error emptying the cart:', error);
                throw error;
            }
        }
    }

    async finalizePurchase(cartId, userEmail) {
        const cart = await this.getCart(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
    
        let totalAmount = 0;
        let failedProducts = [];
        const updates = [];
        let newTicket = null;
    
        for (const item of cart.products) {
            const product = await Product.findById(item.productId);
            if (product && product.stock >= item.quantity) {
                product.stock -= item.quantity;
                totalAmount += item.quantity * product.price;
                updates.push(product.save());
            } else {
                failedProducts.push({ id: item.productId.toString(), title: product.title, _id: product._id });
            }
        }
    
        await Promise.all(updates);
    
        if (totalAmount > 0) {
            newTicket = new Ticket({
                code: Math.random().toString(36).substr(2, 9),
                purchase_datetime: new Date(),
                amount: totalAmount,
                purchaser: userEmail
            });
            await newTicket.save();
        }
    
        cart.products = cart.products.filter(item => failedProducts.some(failedProd => failedProd.id === item.productId.toString()));
        await cart.save();
    
        return {
            totalAmount,
            failedProducts,
            message: newTicket ? "Compra finalizada con éxito" : "Compra parcialmente exitosa",
            ticketId: newTicket ? newTicket._id : null
        };
    }
    
}

module.exports = CartRepository;
