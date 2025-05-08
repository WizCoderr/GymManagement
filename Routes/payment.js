import express from 'express';
import { createPayment, getMemberPayments, createPaymentSession, handlePaymentSuccess } from '../Controllers/payment.js';
import auth from '../DBConn/Auth/auth.js';

const router = express.Router();

router.post('/create-payment', auth, createPayment);
router.get('/member-payments/:memberId', auth, getMemberPayments);
router.post('/create-session', auth, createPaymentSession);
router.post('/webhook', handlePaymentSuccess);

export default router;