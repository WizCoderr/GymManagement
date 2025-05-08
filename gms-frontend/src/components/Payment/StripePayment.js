import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHER_KEY);

const StripePayment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const initiatePayment = async () => {
            try {
                if (!location.state?.amount) {
                    toast.error("Payment amount is required");
                    navigate('/dashboard');
                    return;
                }

                const stripe = await stripePromise;
                
                const response = await axios.post(
                    'http://localhost:4000/payment/create-session',
                    location.state,
                    { withCredentials: true }
                );

                if (!response.data?.sessionId) {
                    throw new Error('Payment session creation failed');
                }

                const { error } = await stripe.redirectToCheckout({
                    sessionId: response.data.sessionId
                });

                if (error) {
                    throw new Error(error.message);
                }

            } catch (error) {
                console.error('Payment Error:', error);
                toast.error("Payment failed to initialize");
                navigate('/payment/cancel');
            }
        };

        initiatePayment();
    }, [location, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <CircularProgress />
            <p className="mt-4">Processing payment...</p>
        </div>
    );
};

export default StripePayment;