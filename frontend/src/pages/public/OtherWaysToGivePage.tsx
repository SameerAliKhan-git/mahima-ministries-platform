import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Landmark, Building2, Wallet, Smartphone, CreditCard, FileText, Gift, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OtherWaysToGivePage() {
  const paymentMethods = [
    { 
      icon: Smartphone, 
      title: 'UPI Payment', 
      desc: 'Instant donations via UPI - Google Pay, PhonePe, Paytm',
      details: 'UPI ID: mahimaministries@upi (Update with actual UPI ID)',
      taxBenefit: '80G benefit available'
    },
    { 
      icon: Landmark, 
      title: 'Bank Transfer (NEFT/RTGS/IMPS)', 
      desc: 'Direct bank transfer to our account',
      details: 'Account details available on request',
      taxBenefit: '80G certificate issued'
    },
    { 
      icon: CreditCard, 
      title: 'Debit/Credit Card', 
      desc: 'Secure online payment through payment gateway',
      details: 'All major cards accepted - Visa, Mastercard, RuPay',
      taxBenefit: 'Instant 80G receipt'
    },
    { 
      icon: Wallet, 
      title: 'Net Banking', 
      desc: 'Pay directly from your bank account',
      details: 'All major Indian banks supported',
      taxBenefit: '80G certificate via email'
    },
    { 
      icon: FileText, 
      title: 'Cheque/Demand Draft', 
      desc: 'Send cheque payable to "Mahima Ministries"',
      details: 'Mail to our registered address in Hyderabad',
      taxBenefit: 'PAN mandatory for ₹2,000+'
    },
    { 
      icon: Building2, 
      title: 'CSR Contributions', 
      desc: 'Corporate Social Responsibility funding under Companies Act 2013',
      details: 'Eligible under Schedule VII activities',
      taxBenefit: 'CSR compliance certificate'
    },
    { 
      icon: Gift, 
      title: 'In-Kind Donations', 
      desc: 'Donate goods, materials, or services',
      details: 'Food, clothing, educational materials, medical supplies',
      taxBenefit: 'Receipt for in-kind donations'
    },
    { 
      icon: Users, 
      title: 'Legacy/Bequest Giving', 
      desc: 'Include us in your will or estate planning',
      details: 'Consult with our team for legacy planning',
      taxBenefit: 'Estate planning guidance'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />
      
      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2073&auto=format&fit=crop"
            alt="Other Ways to Give" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-amber-900/85"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Multiple Payment Options
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            Other Ways to Give
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg mb-4">
            Choose from various donation methods that suit your convenience. All donations are eligible for 80G tax benefits.
          </p>
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-lg text-sm font-semibold">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            All payments are secure and compliant with Indian regulations
          </div>
        </div>
      </section>

      {/* Payment Methods Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {paymentMethods.map((method, idx) => (
                <div key={idx} className="glass p-8 rounded-3xl hover-lift border-2 border-orange-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6">
                    <method.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{method.title}</h3>
                  <p className="text-gray-600 mb-4">{method.desc}</p>
                  <div className="bg-orange-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-700">{method.details}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-700 font-semibold">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {method.taxBenefit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bank Account Details Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Bank Account Details</h2>
              <p className="text-gray-600">For NEFT, RTGS, IMPS, or Cheque payments</p>
            </div>
            
            <div className="glass p-8 rounded-3xl border-2 border-orange-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Account Name</div>
                  <div className="text-lg font-bold text-gray-800">Mahima Ministries</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Account Number</div>
                  <div className="text-lg font-bold text-gray-800">[Update with actual account number]</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Bank Name</div>
                  <div className="text-lg font-bold text-gray-800">[Update with bank name]</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Branch</div>
                  <div className="text-lg font-bold text-gray-800">[Update with branch name]</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">IFSC Code</div>
                  <div className="text-lg font-bold text-gray-800">[Update with IFSC code]</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Account Type</div>
                  <div className="text-lg font-bold text-gray-800">Savings / Current</div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-orange-200">
                <p className="text-sm text-gray-600">
                  <strong>Important:</strong> Please email your transaction details to <a href="mailto:mahimaministriesindia@gmail.com" className="text-orange-600 hover:text-orange-700">mahimaministriesindia@gmail.com</a> with your PAN details (mandatory for donations above ₹2,000) to receive your 80G tax exemption certificate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Benefits Information */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Tax Benefits Under Section 80G</h2>
              <p className="text-gray-600">Your donations are eligible for income tax deductions</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="text-orange-600 text-4xl font-bold mb-4">50%</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Tax Deduction</h3>
                <p className="text-gray-600">
                  Eligible for 50% tax deduction under Section 80G of Income Tax Act, 1961
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="text-orange-600 text-4xl font-bold mb-4">₹2,000</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">PAN Requirement</h3>
                <p className="text-gray-600">
                  PAN details mandatory for donations exceeding ₹2,000 as per Income Tax rules
                </p>
              </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-2xl border-2 border-orange-200">
              <h4 className="font-bold text-gray-800 mb-4">Required Documents for 80G Certificate:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>PAN Card copy (mandatory for donations ₹2,000 and above)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Payment confirmation (transaction receipt/bank statement)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Complete postal address for certificate mailing</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Email address for electronic certificate</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Choose your preferred payment method and start supporting our cause today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/donate"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Donate Now
              </Link>
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 font-bold rounded-xl border-2 border-orange-200 hover:bg-orange-50 transition-all duration-300"
              >
                Contact Us for Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
