import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { RotateCcw, AlertTriangle, CheckCircle, Clock, CreditCard, FileText } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />

      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
            alt="Refund & Cancellation Policy" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-amber-900/85"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Donation Policy
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            <span className="text-amber-200">Refund</span> & Cancellation Policy
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            Understanding our refund process for donations
          </p>
          <p className="text-sm text-orange-100 mt-4">Last Updated: January 2025</p>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass p-8 rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
              <div className="flex items-start">
                <AlertTriangle className="w-12 h-12 text-amber-600 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Important: Donations are Generally Non-Refundable</h3>
                  <p className="text-gray-600 leading-relaxed">
                    As per Indian NGO regulations and Income Tax Act guidelines, donations to registered charitable organizations 
                    like Mahima Ministries are voluntary contributions and are generally <strong>non-refundable</strong>. 
                    However, we understand that mistakes can happen, and we have established this policy to address specific circumstances.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-12 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-2xl border-2 border-orange-100">
              <Clock className="w-12 h-12 text-orange-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">7 Days Window</h3>
              <p className="text-sm text-gray-600">Refund requests must be made within 7 days of donation</p>
            </div>
            <div className="glass p-6 rounded-2xl border-2 border-amber-100">
              <FileText className="w-12 h-12 text-amber-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">Documentation Required</h3>
              <p className="text-sm text-gray-600">Transaction proof and valid reason needed for processing</p>
            </div>
            <div className="glass p-6 rounded-2xl border-2 border-orange-100">
              <CreditCard className="w-12 h-12 text-orange-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">7-10 Days Processing</h3>
              <p className="text-sm text-gray-600">Approved refunds processed within 7-10 business days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Policy Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Refund Eligibility */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-orange-100">
              <div className="flex items-start mb-4">
                <CheckCircle className="w-8 h-8 text-orange-600 mr-4 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">1. When Refunds May Be Processed</h2>
                  <div className="space-y-4 text-gray-600">
                    <p>Refunds will only be considered in the following exceptional circumstances:</p>
                    
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h3 className="font-bold text-gray-800 mb-2">1.1 Technical Errors</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Duplicate transactions due to payment gateway errors</li>
                        <li>Amount debited from your account but donation not recorded in our system</li>
                        <li>Incorrect amount charged due to system malfunction</li>
                      </ul>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-lg">
                      <h3 className="font-bold text-gray-800 mb-2">1.2 Unauthorized Transactions</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Fraudulent transaction made without your knowledge or consent</li>
                        <li>Transaction made by a minor without parental/guardian consent</li>
                      </ul>
                      <p className="text-sm italic mt-2">Note: Police report or written affidavit may be required for fraud claims.</p>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h3 className="font-bold text-gray-800 mb-2">1.3 Donor Error</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Donation made to wrong organization by mistake (within 48 hours)</li>
                        <li>Significant amount entered by error (e.g., ₹10,000 instead of ₹1,000)</li>
                      </ul>
                      <p className="text-sm italic mt-2">Note: Refunds for donor error are processed at the organization's discretion.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Non-Refundable */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-red-200 bg-red-50">
              <div className="flex items-start mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600 mr-4 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Non-Refundable Circumstances</h2>
                  <div className="space-y-3 text-gray-600">
                    <p className="font-semibold text-gray-800">Refunds will NOT be processed in the following cases:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Change of Mind:</strong> Donor decides they no longer want to support the cause after making a donation</li>
                      <li><strong>Personal Financial Situation:</strong> Donor experiences financial difficulties after making donation</li>
                      <li><strong>Disagreement with Organization:</strong> Donor disagrees with how funds are being used (within legal charitable purposes)</li>
                      <li><strong>Tax Planning:</strong> Donor wants refund due to tax planning considerations</li>
                      <li><strong>Recurring Donations:</strong> Refunds for past recurring donations (cancellation applies only to future donations)</li>
                      <li><strong>Designated Donations:</strong> Donations made for specific programs that have already been utilized</li>
                      <li><strong>After 7 Days:</strong> Any refund request made more than 7 days after the transaction date</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Refund Process */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-amber-100">
              <div className="flex items-start mb-4">
                <RotateCcw className="w-8 h-8 text-amber-600 mr-4 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">3. How to Request a Refund</h2>
                  <div className="space-y-4 text-gray-600">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">Step 1: Contact Us Within 7 Days</h3>
                      <p>Email us at <a href="mailto:mahimaministriesindia@gmail.com" className="text-orange-600 hover:underline font-semibold">mahimaministriesindia@gmail.com</a> with subject line: "REFUND REQUEST - [Your Name]"</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">Step 2: Provide Required Information</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Full name and contact details</li>
                        <li>Transaction date and amount</li>
                        <li>Transaction ID / Reference Number</li>
                        <li>Payment method used</li>
                        <li>Screenshot of transaction receipt</li>
                        <li>Detailed reason for refund request</li>
                        <li>Supporting documents (if applicable)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">Step 3: Review Process</h3>
                      <p>Our finance team will review your request within 3-5 business days and notify you of the decision via email.</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">Step 4: Refund Processing</h3>
                      <p>If approved, the refund will be processed to your original payment method within 7-10 business days. Bank processing times may vary.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cancellation of Recurring Donations */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-orange-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Cancellation of Recurring Donations</h2>
              <div className="space-y-3 text-gray-600">
                <p><strong>4.1 How to Cancel:</strong> Recurring donations can be cancelled at any time by:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Logging into your Donor Portal and cancelling the recurring donation</li>
                  <li>Emailing us at <a href="mailto:mahimaministriesindia@gmail.com" className="text-orange-600 hover:underline">mahimaministriesindia@gmail.com</a></li>
                  <li>Calling us at 040-65553348 / 9246272675</li>
                </ul>
                <p className="mt-3"><strong>4.2 Processing Time:</strong> Cancellation requests are processed within 48 hours. However, if a donation is already in process, it cannot be stopped.</p>
                <p><strong>4.3 No Retroactive Cancellations:</strong> Past recurring donations cannot be refunded once processed. Only future scheduled donations will be cancelled.</p>
              </div>
            </div>

            {/* Failed Transactions */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-amber-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Failed or Pending Transactions</h2>
              <div className="space-y-3 text-gray-600">
                <p><strong>5.1 Payment Failed:</strong> If your payment fails but amount is debited, please wait 5-7 business days. Most banks automatically reverse failed transactions.</p>
                <p><strong>5.2 Still Not Reversed?</strong> If the amount is not reversed within 7 days, contact us with transaction details, and we will coordinate with the payment gateway.</p>
                <p><strong>5.3 Payment Pending:</strong> For transactions showing "pending" status, please wait 24-48 hours before contacting us. Most resolve automatically.</p>
              </div>
            </div>

            {/* Tax Implications */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-orange-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Tax Implications of Refunds</h2>
              <div className="space-y-3 text-gray-600">
                <p><strong>6.1 80G Certificate:</strong> If you have already received an 80G tax exemption certificate for the refunded donation, it will be invalidated.</p>
                <p><strong>6.2 Tax Filing:</strong> Donors who have claimed tax deductions on refunded donations must inform the Income Tax Department and amend their tax returns accordingly.</p>
                <p><strong>6.3 Organization's Obligation:</strong> We are required to report all refunded donations to tax authorities as per Income Tax Act regulations.</p>
              </div>
            </div>

            {/* Processing Fees */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-amber-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Processing Fees & Charges</h2>
              <div className="space-y-3 text-gray-600">
                <p><strong>7.1 Payment Gateway Charges:</strong> Payment gateway charges (typically 2-3%) are non-refundable and will be deducted from the refund amount.</p>
                <p><strong>7.2 Bank Charges:</strong> Any bank transfer fees or charges incurred during the refund process will be borne by the donor.</p>
                <p><strong>7.3 Currency Conversion:</strong> For foreign currency donations, refunds will be processed in INR at current exchange rates. Any loss due to currency fluctuation will be borne by the donor.</p>
              </div>
            </div>

            {/* Partial Refunds */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-orange-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Partial Refunds</h2>
              <div className="space-y-3 text-gray-600">
                <p>In certain cases, we may offer a partial refund:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>If funds have been partially utilized for the designated program</li>
                  <li>If the request is made after the 7-day window but within 15 days</li>
                  <li>If there are exceptional circumstances warranting partial consideration</li>
                </ul>
                <p className="mt-3">Partial refund decisions are made on a case-by-case basis by our management team.</p>
              </div>
            </div>

            {/* Dispute Resolution */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-amber-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Dispute Resolution</h2>
              <div className="space-y-3 text-gray-600">
                <p>If your refund request is denied and you wish to dispute the decision:</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Reply to the refund decision email with additional information or clarification</li>
                  <li>Request escalation to our management team for review</li>
                  <li>If still unsatisfied, file a formal complaint through our <a href="/grievance-redressal" className="text-orange-600 hover:underline font-semibold">Grievance Redressal</a> mechanism</li>
                </ol>
                <p className="mt-3">We are committed to fair and transparent resolution of all disputes.</p>
              </div>
            </div>

            {/* Alternative Options */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-orange-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Alternatives to Refunds</h2>
              <div className="space-y-3 text-gray-600">
                <p>If you are not eligible for a refund but have concerns about your donation, we offer:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Donation Reallocation:</strong> Transfer your donation to a different program or project</li>
                  <li><strong>Future Credit:</strong> Apply the amount as credit toward a future donation (within 1 year)</li>
                  <li><strong>Sponsorship Transfer:</strong> Transfer child/project sponsorship to another individual</li>
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div className="glass p-8 rounded-2xl border-2 border-amber-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Contact for Refund Queries</h2>
              <div className="space-y-3 text-gray-600">
                <p>For all refund-related queries:</p>
                <div className="bg-orange-50 p-4 rounded-lg mt-4">
                  <p className="font-bold text-gray-800 mb-2">Finance Department - Mahima Ministries</p>
                  <p>Email: <a href="mailto:mahimaministriesindia@gmail.com" className="text-orange-600 hover:underline">mahimaministriesindia@gmail.com</a></p>
                  <p>Phone: 040-65553348 / 9246272675</p>
                  <p>Office Hours: Monday-Saturday, 9:00 AM - 6:00 PM IST</p>
                  <p className="mt-2 text-sm">Address: 2-38/8/2/9/4/1, NTR Nagar Colony, Chandanagar, Ameenpur, Sangareddy, Telangana - 502032</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Final Note */}
      <section className="py-12 bg-gradient-to-br from-orange-100 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <CheckCircle className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Generosity Makes a Difference</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              We understand that refund requests may arise in exceptional circumstances. While donations are generally non-refundable, 
              we are committed to addressing legitimate concerns with fairness and transparency.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Thank you for your trust in Mahima Ministries. Every contribution, big or small, directly impacts the lives 
              of vulnerable children, elderly, and communities we serve across Telangana.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
