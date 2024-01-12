// /middleware/auth.js

import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // Si aucun token, non autorisé

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });

        if (!user) return res.sendStatus(403); // Si l'utilisateur n'existe pas, interdit

        req.user = user;
        next(); // Passe au prochain middleware
    } catch (err) {
        return res.sendStatus(403); // Token invalide, interdit
    }
};

export default authenticateToken;
