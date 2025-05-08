import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import './DBConn/conn.js';

import gymRoutes from './Routes/gym.js';
import membershipRoutes from './Routes/membership.js';
import memberRoutes from './Routes/member.js';
import paymentRoutes from './Routes/payment.js';
import batchRoutes from './Routes/batch.js';
dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use('/auth', gymRoutes);
app.use('/plans', membershipRoutes);
app.use('/members', memberRoutes);
app.use('/payments', paymentRoutes);
app.use('/batches', batchRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});