import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const API_URL = 'http://localhost:3000';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

function DonationForm({ }: { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const { error: submitError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/donation/success`,
        },
      });

      if (submitError) {
        setError(submitError.message || 'Payment failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <PaymentElement />

      <Button
        type="submit"
        className="w-full"
        disabled={!stripe || processing}
      >
        {processing ? 'Processing...' : 'Complete Donation'}
      </Button>
    </form>
  );
}

export default function DonatePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: '',
    customAmount: '',
    isRecurring: false,
    recurringInterval: 'MONTHLY',
    isAnonymous: false,
    dedicatedTo: '',
    message: '',
  });
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Indian Rupee preset amounts
  const presetAmounts = [500, 1000, 2500, 5000, 10000, 25000];

  const handleAmountSelect = (amount: number) => {
    setFormData({ ...formData, amount: amount.toString(), customAmount: '' });
  };

  const handleCustomAmount = (value: string) => {
    setFormData({ ...formData, customAmount: value, amount: '' });
  };

  const handleNext = async () => {
    const donationAmount = formData.customAmount || formData.amount;
    
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      setError('Please enter a valid donation amount');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('accessToken');
      const headers: any = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}/api/donations`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          amount: parseFloat(donationAmount),
          currency: 'INR',
          isRecurring: formData.isRecurring,
          recurringInterval: formData.isRecurring ? formData.recurringInterval : undefined,
          isAnonymous: formData.isAnonymous,
          dedicatedTo: formData.dedicatedTo || undefined,
          message: formData.message || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create donation');
      }

      setClientSecret(data.data.clientSecret);
      setStep(2);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep(1);
    setClientSecret('');
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Make a Donation</h1>
          <p className="text-lg text-gray-600">
            Your generosity makes a real difference in our community
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 ? 'Choose Your Donation Amount' : 'Payment Details'}
            </CardTitle>
            <CardDescription>
              {step === 1
                ? 'Select an amount or enter a custom donation'
                : 'Complete your donation securely with Stripe'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <div className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Preset Amounts */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Select Amount
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    {presetAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleAmountSelect(amount)}
                        className={`p-4 border-2 rounded-lg font-semibold transition-all ${
                          formData.amount === amount.toString()
                            ? 'border-orange-600 bg-orange-50 text-orange-600'
                            : 'border-gray-300 hover:border-orange-400'
                        }`}
                      >
                        ₹{amount.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div className="space-y-2">
                  <Label htmlFor="customAmount">Or Enter Custom Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                    <Input
                      id="customAmount"
                      type="number"
                      min="1"
                      step="1"
                      placeholder="0"
                      className="pl-8"
                      value={formData.customAmount}
                      onChange={(e) => handleCustomAmount(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-gray-600">
                    Donations above ₹2,000 require PAN details for tax exemption under Section 80G
                  </p>
                </div>

                {/* Indian Compliance Notice */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-amber-900 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Tax Benefits & Compliance
                  </h4>
                  <ul className="text-xs text-amber-800 space-y-1 ml-7">
                    <li>✓ Donations are eligible for 80G tax exemption</li>
                    <li>✓ PAN mandatory for donations above ₹2,000</li>
                    <li>✓ 80G certificate will be issued via email</li>
                    <li>✓ All payments are secured and encrypted</li>
                  </ul>
                </div>

                {/* Recurring Donation */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isRecurring"
                      checked={formData.isRecurring}
                      onChange={(e) =>
                        setFormData({ ...formData, isRecurring: e.target.checked })
                      }
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <Label htmlFor="isRecurring" className="cursor-pointer">
                      Make this a recurring donation
                    </Label>
                  </div>

                  {formData.isRecurring && (
                    <select
                      value={formData.recurringInterval}
                      onChange={(e) =>
                        setFormData({ ...formData, recurringInterval: e.target.value })
                      }
                      className="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md"
                    >
                      <option value="MONTHLY">Monthly</option>
                      <option value="QUARTERLY">Quarterly</option>
                      <option value="ANNUALLY">Annually</option>
                    </select>
                  )}
                </div>

                {/* Anonymous Donation */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isAnonymous"
                    checked={formData.isAnonymous}
                    onChange={(e) =>
                      setFormData({ ...formData, isAnonymous: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <Label htmlFor="isAnonymous" className="cursor-pointer">
                    Make this donation anonymous
                  </Label>
                </div>

                {/* Dedication */}
                <div className="space-y-2">
                  <Label htmlFor="dedicatedTo">Dedicate this donation (optional)</Label>
                  <Input
                    id="dedicatedTo"
                    placeholder="In memory of..."
                    value={formData.dedicatedTo}
                    onChange={(e) =>
                      setFormData({ ...formData, dedicatedTo: e.target.value })
                    }
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message (optional)</Label>
                  <textarea
                    id="message"
                    placeholder="Share your thoughts..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full min-h-24 px-3 py-2 text-sm border border-gray-300 rounded-md"
                    maxLength={500}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/')}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? 'Processing...' : 'Continue to Payment'}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <DonationForm clientSecret={clientSecret} />
                  </Elements>
                )}

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="w-full"
                >
                  Back to Donation Details
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        </div>
      <Footer />
      </div>
    </>
  );
}
