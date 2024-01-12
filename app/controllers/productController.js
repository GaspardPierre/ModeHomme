// Exemple de code pour controllers/productController.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createProduct = async (req, res) => {
    const { name, description, price, imageUrl, categoryId } = req.body;

    try {
        const product = await prisma.product.create({
            data: { name, description, price, imageUrl, categoryId }
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Mettre à jour un produit
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, imageUrl, categoryId } = req.body;

    try {
        const updatedProduct = await prisma.product.update({
            where: { id: parseInt(id) },
            data: { name, description, price, imageUrl, categoryId }
        });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};