import React from 'react';
import { Link } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';

const PaymentCancel = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <CancelIcon sx={{ fontSize: 60, color: 'red' }} />
        <h1 className="text-2xl font-bold text-red-600 mt-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mt-2">
          Your payment was cancelled. No charges were made.
        </p>
        <div className="mt-6 space-y-3">
          <Link
            to="/dashboard"
            className="block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Return to Dashboard
          </Link>
          <Link
            to="/member"
            className="block bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;