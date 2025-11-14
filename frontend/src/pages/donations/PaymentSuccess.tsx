import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  CheckCircle,
  Download,
  Mail,
  Home,
  Receipt,
  Loader2,
  FileText,
  Calendar,
  CreditCard,
  User,
  Heart
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface DonationDetails {
  id: string;
  orderId: string;
  txnId: string;
  amount: number;
  donorName: string;
  email: string;
  phone: string;
  paymentMode: string;
  paidAt: string;
  campaignName?: string;
  message?: string;
  isAnonymous: boolean;
}

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [donation, setDonation] = useState<DonationDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  const orderId = searchParams.get('orderId');
  // const donationId = searchParams.get('donationId');

  useEffect(() => {
    if (orderId) {
      fetchDonationDetails();
    } else {
      setError('Invalid payment confirmation');
      setLoading(false);
    }
  }, [orderId]);

  const fetchDonationDetails = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/paytm/status?orderId=${orderId}`,
        {
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch donation details');
      }

      const data = await response.json();
      setDonation(data.donation);
      setLoading(false);
    } catch (err: any) {
      console.error('Error fetching donation details:', err);
      setError(err.message || 'Failed to load donation details');
      setLoading(false);
    }
  };

  const handleDownloadReceipt = () => {
    // The receipt PDF was already emailed, but we can add download functionality later
    alert('Receipt has been sent to your email. PDF download feature coming soon!');
  };

  const handleDownload80G = () => {
    alert('80G Certificate will be sent to your email within 24 hours.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error || !donation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Receipt className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Error Loading Details
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-4 animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful! 🎉
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your generous donation
          </p>
        </div>

        {/* Success Message */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-green-600 mr-2" fill="currentColor" />
              <span className="text-4xl font-bold text-green-600">
                ₹{donation.amount.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-center text-gray-600">
              Your contribution will help us serve those in need
            </p>
          </div>

          {/* Transaction Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Transaction Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <Receipt className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Receipt No.</p>
                  <p className="font-medium text-gray-900">{donation.orderId}</p>
                </div>
              </div>

              <div className="flex items-start">
                <FileText className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Transaction ID</p>
                  <p className="font-medium text-gray-900">{donation.txnId}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="font-medium text-gray-900">
                    {new Date(donation.paidAt).toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CreditCard className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium text-gray-900">{donation.paymentMode}</p>
                </div>
              </div>

              {!donation.isAnonymous && (
                <>
                  <div className="flex items-start">
                    <User className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Donor Name</p>
                      <p className="font-medium text-gray-900">{donation.donorName}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{donation.email}</p>
                    </div>
                  </div>
                </>
              )}

              {donation.campaignName && (
                <div className="flex items-start md:col-span-2">
                  <Heart className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Campaign</p>
                    <p className="font-medium text-gray-900">{donation.campaignName}</p>
                  </div>
                </div>
              )}

              {donation.message && (
                <div className="md:col-span-2 bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Your Message</p>
                  <p className="text-gray-900 italic">"{donation.message}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Receipt Email Notice */}
          <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-900">
                  Receipt Sent Successfully
                </p>
                <p className="text-sm text-green-700 mt-1">
                  A detailed receipt with 80G tax benefit information has been sent to{' '}
                  <strong>{donation.email}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleDownloadReceipt}
            className="flex items-center justify-center px-6 py-4 bg-white border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Receipt
          </button>

          <button
            onClick={handleDownload80G}
            className="flex items-center justify-center px-6 py-4 bg-white border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-medium"
          >
            <FileText className="w-5 h-5 mr-2" />
            80G Certificate
          </button>
        </div>

        {/* Navigation Button */}
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-medium shadow-lg"
        >
          <Home className="w-5 h-5 mr-2" />
          Return to Home
        </button>

        {/* Thank You Message */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-lg">
            Your generosity makes a real difference in the lives of those we serve.
          </p>
          <p className="text-gray-600 mt-2">
            May God bless you abundantly! 🙏
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
