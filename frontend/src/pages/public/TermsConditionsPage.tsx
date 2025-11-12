import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FileText, Scale, AlertCircle, CheckCircle, Shield, Users } from 'lucide-react';

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />

      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop"
            alt="Terms & Conditions" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-amber-900/85"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Legal Agreement
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            <span className="text-amber-200">Terms</span> & Conditions
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            Please read these terms carefully before using our services
          </p>
          <p className="text-sm text-orange-100 mt-4">Last Updated: January 2025</p>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-2xl border-2 border-orange-100">
              <Scale className="w-12 h-12 text-orange-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">Governed by Indian Law</h3>
              <p className="text-sm text-gray-600">These terms are governed by Indian laws and regulations</p>
            </div>
            <div className="glass p-6 rounded-2xl border-2 border-amber-100">
              <CheckCircle className="w-12 h-12 text-amber-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">Transparent Operations</h3>
              <p className="text-sm text-gray-600">We operate with full transparency as per NGO guidelines</p>
            </div>
            <div className="glass p-6 rounded-2xl border-2 border-orange-100">
              <Shield className="w-12 h-12 text-orange-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">80G Tax Benefits</h3>
              <p className="text-sm text-gray-600">Donations eligible for tax exemption under Section 80G</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Terms Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Acceptance */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-orange-100">
              <div className="flex items-start mb-4">
                <FileText className="w-8 h-8 text-orange-600 mr-4 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Acceptance of Terms</h2>
                  <div className="space-y-3 text-gray-600">
                    <p>By accessing and using the Mahima Ministries website (www.mahimaministries.org) and services, you accept and agree to be bound by these Terms and Conditions.</p>
                    <p>If you do not agree with these terms, please do not use our website or services.</p>
                    <p>These terms constitute a legally binding agreement between you ("Donor," "User," or "You") and Mahima Ministries ("We," "Us," or "Organization").</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Organization Details */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-amber-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2. About Mahima Ministries</h2>
              <div className="space-y-3 text-gray-600">
                <p><strong>Legal Status:</strong> Mahima Ministries is a registered charitable trust/NGO operating under Indian Trust Act.</p>
                <p><strong>Registration Details:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Registration Number: [To be updated]</li>
                  <li>PAN: [To be updated]</li>
                  <li>80G Registration: Available</li>
                  <li>12A Registration: [To be updated]</li>
                  <li>FCRA Registration: [If applicable]</li>
                </ul>
                <p><strong>Registered Address:</strong> 2-38/8/2/9/4/1, NTR Nagar Colony, Sridevi Theatre Road, Chandanagar, Ameenpur Mdl, Sangareddy, Telangana - 502032, India</p>
              </div>
            </div>

            {/* Donations */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-orange-100">
              <div className="flex items-start mb-4">
                <Users className="w-8 h-8 text-orange-600 mr-4 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Donations & Contributions</h2>
                  <div className="space-y-4 text-gray-600">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">3.1 Voluntary Nature</h3>
                      <p>All donations to Mahima Ministries are voluntary and made without any consideration or expectation of goods, services, or benefits in return.</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">3.2 Currency</h3>
                      <p>All donations are accepted in Indian Rupees (INR). For foreign donations, FCRA guidelines apply.</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">3.3 Minimum Amount</h3>
                      <p>There is no minimum donation amount, but we recommend a minimum of ₹100 to offset transaction costs.</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">3.4 Tax Benefits</h3>
                      <p>Donations are eligible for 50% tax deduction under Section 80G of Income Tax Act, 1961. PAN is mandatory for donations above ₹2,000.</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">3.5 80G Certificate</h3>
                      <p>80G tax exemption certificates will be issued via email within 7-10 business days. Ensure you provide accurate PAN and email details.</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">3.6 Use of Funds</h3>
                      <p>Donations will be used for charitable purposes as per our organizational objectives. We reserve the right to allocate funds to areas of greatest need unless specified otherwise by the donor.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Terms */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-amber-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Payment Processing</h2>
              <div className="space-y-3 text-gray-600">
                <p><strong>4.1 Payment Methods:</strong> We accept UPI, Net Banking, Credit/Debit Cards, NEFT/RTGS/IMPS, Cheque, and DD as per Indian payment norms.</p>
                <p><strong>4.2 Payment Gateways:</strong> Online payments are processed through third-party payment gateways (Razorpay, PayU, CCAvenue, etc.) that comply with PCI-DSS and RBI guidelines.</p>
                <p><strong>4.3 Transaction Fees:</strong> Payment gateway charges may apply and will be borne by the donor unless specified otherwise.</p>
                <p><strong>4.4 Failed Transactions:</strong> In case of failed transactions, the amount will be refunded to your account within 7-10 business days as per bank processing times.</p>
                <p><strong>4.5 Receipt:</strong> A digital receipt will be sent to your registered email address immediately upon successful payment.</p>
              </div>
            </div>

            {/* Refund Policy Reference */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-orange-100">
              <div className="flex items-start mb-4">
                <AlertCircle className="w-8 h-8 text-orange-600 mr-4 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Refunds & Cancellations</h2>
                  <div className="space-y-3 text-gray-600">
                    <p>Donations are generally non-refundable as they are voluntary contributions to a charitable cause. However, in certain circumstances, refunds may be processed.</p>
                    <p>For detailed information on refund eligibility and process, please refer to our <a href="/refund-policy" className="text-orange-600 hover:underline font-semibold">Refund & Cancellation Policy</a>.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* User Responsibilities */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-amber-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. User Responsibilities</h2>
              <div className="space-y-3 text-gray-600">
                <p><strong>6.1 Accurate Information:</strong> You agree to provide accurate, current, and complete information when making donations or registering on our website.</p>
                <p><strong>6.2 Account Security:</strong> If you create an account, you are responsible for maintaining the confidentiality of your login credentials.</p>
                <p><strong>6.3 Prohibited Activities:</strong> You agree not to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Use the website for any illegal or unauthorized purpose</li>
                  <li>Attempt to hack, disrupt, or compromise website security</li>
                  <li>Upload malicious content or viruses</li>
                  <li>Make fraudulent donations or chargebacks</li>
                  <li>Misuse donor information or organizational resources</li>
                </ul>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-orange-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Intellectual Property</h2>
              <div className="space-y-3 text-gray-600">
                <p><strong>7.1 Ownership:</strong> All content on this website, including text, graphics, logos, images, videos, and software, is the property of Mahima Ministries or its licensors and is protected by Indian copyright and intellectual property laws.</p>
                <p><strong>7.2 Limited License:</strong> You are granted a limited, non-exclusive, non-transferable license to access and use the website for personal, non-commercial purposes.</p>
                <p><strong>7.3 Restrictions:</strong> You may not reproduce, distribute, modify, or create derivative works without our prior written consent.</p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-amber-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Disclaimer of Warranties</h2>
              <div className="space-y-3 text-gray-600">
                <p>The website and services are provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied.</p>
                <p>We do not guarantee that:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>The website will be uninterrupted, secure, or error-free</li>
                  <li>The results obtained from using the website will be accurate or reliable</li>
                  <li>Any errors in the software or content will be corrected</li>
                </ul>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-orange-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Limitation of Liability</h2>
              <div className="space-y-3 text-gray-600">
                <p>To the maximum extent permitted by Indian law, Mahima Ministries shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the website or services.</p>
                <p>Our total liability shall not exceed the amount of your donation in the past 12 months.</p>
              </div>
            </div>

            {/* Privacy */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-amber-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Privacy & Data Protection</h2>
              <div className="space-y-3 text-gray-600">
                <p>Your privacy is important to us. Please review our <a href="/privacy-policy" className="text-orange-600 hover:underline font-semibold">Privacy Policy</a> to understand how we collect, use, and protect your personal information.</p>
                <p>By using our services, you consent to our data practices as described in the Privacy Policy.</p>
              </div>
            </div>

            {/* Changes to Terms */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-orange-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Modifications to Terms</h2>
              <div className="space-y-3 text-gray-600">
                <p>We reserve the right to modify these Terms and Conditions at any time. Changes will be effective upon posting on the website with an updated "Last Updated" date.</p>
                <p>Your continued use of the website after changes constitutes acceptance of the modified terms.</p>
              </div>
            </div>

            {/* Governing Law */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-amber-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Governing Law & Jurisdiction</h2>
              <div className="space-y-3 text-gray-600">
                <p><strong>12.1 Indian Law:</strong> These Terms and Conditions are governed by and construed in accordance with the laws of India.</p>
                <p><strong>12.2 Jurisdiction:</strong> Any disputes arising out of these terms shall be subject to the exclusive jurisdiction of the courts of Hyderabad, Telangana, India.</p>
                <p><strong>12.3 Dispute Resolution:</strong> Before initiating legal proceedings, parties agree to attempt resolution through our <a href="/grievance-redressal" className="text-orange-600 hover:underline font-semibold">Grievance Redressal Mechanism</a>.</p>
              </div>
            </div>

            {/* Severability */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-orange-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">13. Severability</h2>
              <div className="space-y-3 text-gray-600">
                <p>If any provision of these terms is found to be invalid or unenforceable by a court of law, the remaining provisions shall continue in full force and effect.</p>
              </div>
            </div>

            {/* Contact */}
            <div className="glass p-8 rounded-2xl border-2 border-amber-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">14. Contact Information</h2>
              <div className="space-y-3 text-gray-600">
                <p>For questions or concerns regarding these Terms and Conditions:</p>
                <div className="bg-orange-50 p-4 rounded-lg mt-4">
                  <p className="font-bold text-gray-800 mb-2">Mahima Ministries</p>
                  <p>2-38/8/2/9/4/1, NTR Nagar Colony, Sridevi Theatre Road</p>
                  <p>Chandanagar, Ameenpur Mdl, Sangareddy, Telangana - 502032</p>
                  <p className="mt-2">Email: <a href="mailto:mahimaministriesindia@gmail.com" className="text-orange-600 hover:underline">mahimaministriesindia@gmail.com</a></p>
                  <p>Phone: 040-65553348 / 9246272675</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Acknowledgment */}
      <section className="py-12 bg-gradient-to-br from-orange-100 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <CheckCircle className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Thank You for Your Support</h3>
            <p className="text-gray-600 leading-relaxed">
              By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. 
              Your donations help us continue our mission to serve vulnerable communities across India.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
