// /server.js

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import userRoutes from "../Mode Homme Back/app/routes/userRoutes.js"
import productRoutes from"../Mode Homme Back/app/routes/productRoutes.js"
import orderRoutes from"../Mode Homme Back/app/routes/orderRoutes.js"
const app = express();
const { json, urlencoded } = bodyParser;

// Configuration des middleware
app.use(cors()); 
app.use(morgan('dev')); 
app.use(json()); 
app.use(urlencoded({ extended: true })); 

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Gestionnaire d'erreur basique
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
