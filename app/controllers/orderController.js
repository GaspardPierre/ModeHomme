

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createOrder = async (req, res) => {
    const { productId, userId, quantity } = req.body;

    try {
        const order = await prisma.order.create({
            data: { productId, userId, quantity, date: new Date() }
        });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await prisma.order.findUnique({ where: { id: parseInt(id) } });
        if (order) {
            res.json(order);
        } else {
            res.status(404).send('Order not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getOrdersByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await prisma.order.findMany({
            where: { userId: parseInt(userId) }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour une commande
export const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { productId, quantity } = req.body;

    try {
        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(id) },
            data: { productId, quantity }
        });
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};