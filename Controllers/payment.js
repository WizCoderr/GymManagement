import Payment from '../Modals/paymet.js';
import Member from '../Modals/member.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPayment = async (req, res) => {
    try {
        const { memberId, batchId, amount, paymentType, paymentMode } = req.body;
        
        const member = await Member.findById(memberId);
        if (!member) {
            return res.status(404).json({error: 'Member not found'});
        }

        const payment = new Payment({
            member: memberId,
            batch: batchId,
            amount,
            paymentType,
            paymentMode,
            gym: req.gym._id
        });

        await payment.save();
        res.status(201).json({
            message: "Payment recorded successfully",
            payment
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Server error'});
    }
};

export const getMemberPayments = async (req, res) => {
    try {
        const { memberId } = req.params;
        const payments = await Payment.find({
            gym: req.gym._id,
            member: memberId
        }).sort({paymentDate: -1});

        res.status(200).json({
            message: payments.length ? "Fetched payments successfully" : "No payments found",
            payments
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Server error'});
    }
};

export const createPaymentSession = async (req, res) => {
    try {
        const { amount, type, description, currency, metadata } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: currency || 'inr',
                    product_data: {
                        name: description || 'Batch Membership',
                    },
                    unit_amount: amount * 100,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'http://localhost:3000/payment/success',
            cancel_url: 'http://localhost:3000/payment/cancel',
            metadata: {
                type,
                ...metadata
            }
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Payment Session Error:', error);
        res.status(500).json({ error: error.message });
    }
};

export const handlePaymentSuccess = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            'whsec_cBu9JLsCyvKhClAG6MhQzQ3XWhf5kBPr'  // Replace with your webhook secret
        );
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        
        // Record the payment in your database
        await Payment.create({
            member: session.metadata.memberId,
            batch: session.metadata.batchId,
            amount: session.amount_total / 100,
            paymentType: session.metadata.type,
            paymentMode: 'card',
            gym: session.metadata.gymId
        });
    }

    res.json({ received: true });
};