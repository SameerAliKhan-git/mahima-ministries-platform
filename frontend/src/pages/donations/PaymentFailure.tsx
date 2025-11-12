import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { XCircle, Home, RotateCcw, Mail, AlertTriangle } from 'lucide-react';

const PaymentFailure: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get('orderId');
  const errorMessage = searchParams.get('message') || 'Payment was not completed';
  const errorCode = searchParams.get('error');

  const getErrorDetails = () => {
    switch (errorCode) {
      case 'invalid_checksum':
        return {
          title: 'Security Verification Failed',
          description:
            'The payment could not be verified. This could be due to a security issue. Please try again.',
        };
      case 'donation_not_found':
        return {
          title: 'Transaction Not Found',
          description:
            'We could not find the donation record. Please contact support if amount was deducted.',
        };
      case 'callback_error':
        return {
          title: 'Processing Error',
          description:
            'An error occurred while processing your payment. Please check your bank statement and contact us if needed.',
        };
      default:
        return {
          title: 'Payment Failed',
          description: errorMessage || 'Your payment could not be processed at this time.',
        };
    }
  };

  const errorDetails = getErrorDetails();

  const handleRetry = () => {
    navigate('/donate');
  };

  const handleContactSupport = () => {
    window.location.href = 'mailto:info@mahimaministries.org?subject=Payment Issue - Order ' + (orderId || 'Unknown');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Error Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full mb-4">
            <XCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {errorDetails.title}
          </h1>
          <p className="text-gray-600">
            {errorDetails.description}
          </p>
        </div>

        {/* Error Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {orderId && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Order Reference</p>
              <p className="font-mono text-sm text-gray-900 break-all">{orderId}</p>
            </div>
          )}

          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-900">
                  What happened?
                </p>
                <ul className="text-sm text-red-700 mt-2 space-y-1 list-disc list-inside">
                  <li>Payment was not completed successfully</li>
                  <li>No amount has been charged from your account</li>
                  <li>You can try again with same or different payment method</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              <strong>Common reasons for payment failure:</strong>
            </p>
            <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside ml-2">
              <li>Insufficient funds in account</li>
              <li>Incorrect card details or expired card</li>
              <li>Transaction timeout or network issue</li>
              <li>Payment cancelled by user</li>
              <li>Bank declined the transaction</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleRetry}
            className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all font-medium shadow-lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Try Again
          </button>

          <button
            onClick={handleContactSupport}
            className="w-full flex items-center justify-center px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <Mail className="w-5 h-5 mr-2" />
            Contact Support
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <Home className="w-5 h-5 mr-2" />
            Return to Home
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            If amount was deducted but payment failed, please contact us immediately with your order reference number.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            📧 info@mahimaministries.org | 📞 +91-XXX-XXX-XXXX
          </p>
        </div>

        {/* Note */}
        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
          <p className="text-sm text-blue-900">
            <strong>Note:</strong> Your donation details are safe. You can retry the payment anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
