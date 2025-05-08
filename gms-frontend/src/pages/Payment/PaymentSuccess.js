import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';

const PaymentSuccess = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const completeMemberRegistration = async () => {
            try {
                const pendingMember = JSON.parse(sessionStorage.getItem('pendingMember'));
                
                if (!pendingMember) {
                    navigate('/dashboard');
                    return;
                }

                // Register the member
                await axios.post(
                    'http://localhost:4000/members/register-member',
                    pendingMember,
                    { withCredentials: true }
                );

                // Clear pending data
                sessionStorage.removeItem('pendingMember');
                
                toast.success("Registration completed successfully!");
                setTimeout(() => navigate('/member'), 2000);
            } catch (error) {
                console.error(error);
                toast.error("Failed to complete registration");
                navigate('/dashboard');
            } finally {
                setLoading(false);
            }
        };

        completeMemberRegistration();
    }, [navigate]);

    if (loading) {
        return <CircularProgress />;
    }

    return null;
};

export default PaymentSuccess;