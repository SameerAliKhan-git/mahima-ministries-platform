import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Shield, Lock, Eye, FileText, Database, UserCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />

      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
            alt="Privacy Policy" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-amber-900/85"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Legal Compliance
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            <span className="text-amber-200">Privacy</span> Policy
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            Your privacy and data security are our top priorities
          </p>
          <p className="text-sm text-orange-100 mt-4">Last Updated: January 2025</p>
        </div>
      </section>

      {/* Quick Overview Cards */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-2xl border-2 border-orange-100">
              <Shield className="w-12 h-12 text-orange-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">Data Protection</h3>
              <p className="text-sm text-gray-600">We comply with Indian IT Act 2000 and data protection regulations</p>
            </div>
            <div className="glass p-6 rounded-2xl border-2 border-amber-100">
              <Lock className="w-12 h-12 text-amber-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">Secure Transactions</h3>
              <p className="text-sm text-gray-600">All donation and payment data is encrypted using SSL/TLS</p>
            </div>
            <div className="glass p-6 rounded-2xl border-2 border-orange-100">
              <UserCheck className="w-12 h-12 text-orange-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">Your Rights</h3>
              <p className="text-sm text-gray-600">Access, correct, or delete your personal information anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Privacy Policy Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Section 1 */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-orange-100">
              <div className="flex items-start mb-4">
                <FileText className="w-8 h-8 text-orange-600 mr-4 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Information We Collect</h2>
                  <div className="space-y-4 text-gray-600">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">1.1 Personal Information</h3>
                      <p className="mb-2">When you make a donation or register on our website, we may collect:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Full Name</li>
                        <li>Email Address</li>
                        <li>Phone Number</li>
                        <li>Postal Address</li>
                        <li>PAN (Permanent Account Number) for donations above ₹2,000</li>
                        <li>Date of Birth (optional)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">1.2 Financial Information</h3>
                      <p className="mb-2">For processing donations:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Payment method details (processed through secure third-party payment gateways)</li>
                        <li>Transaction history</li>
                        <li>Donation amounts and frequencies</li>
                      </ul>
                      <p className="mt-2 text-sm italic">Note: We do NOT store credit card or bank account details on our servers.</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">1.3 Technical Information</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>IP Address</li>
                        <li>Browser type and version</li>
                        <li>Device information</li>
                        <li>Cookies and usage data</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-amber-100">
              <div className="flex items-start mb-4">
                <Database className="w-8 h-8 text-amber-600 mr-4 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">2. How We Use Your Information</h2>
                  <div className="space-y-3 text-gray-600">
                    <p><strong>2.1 Processing Donations:</strong> To process your donations, issue 80G tax exemption certificates, and maintain donation records as per Indian NGO regulations.</p>
                    <p><strong>2.2 Communication:</strong> To send donation receipts, 80G certificates, impact updates, newsletters, and campaign information. You may opt out at any time.</p>
                    <p><strong>2.3 Legal Compliance:</strong> To comply with Income Tax Act 1961, Foreign Contribution Regulation Act (FCRA), Companies Act 2013 (CSR), and other applicable Indian laws.</p>
                    <p><strong>2.4 Website Improvement:</strong> To analyze website usage, improve user experience, and optimize our services.</p>
                    <p><strong>2.5 Security:</strong> To detect, prevent, and address fraud, security breaches, or technical issues.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-orange-100">
              <div className="flex items-start mb-4">
                <Lock className="w-8 h-8 text-orange-600 mr-4 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Data Security & Storage</h2>
                  <div className="space-y-3 text-gray-600">
                    <p><strong>3.1 Security Measures:</strong> We implement industry-standard security measures including SSL/TLS encryption, secure servers, firewalls, and access controls to protect your data.</p>
                    <p><strong>3.2 Data Retention:</strong> We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy and to comply with legal obligations (minimum 7 years as per Indian tax laws).</p>
                    <p><strong>3.3 Third-Party Payment Processors:</strong> We use PCI-DSS compliant payment gateways (Razorpay, PayU, CCAvenue, etc.) that encrypt and secure all payment transactions.</p>
                    <p><strong>3.4 Data Location:</strong> Your data is stored on secure servers located in India, complying with Indian data localization norms.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-amber-100">
              <div className="flex items-start mb-4">
                <Eye className="w-8 h-8 text-amber-600 mr-4 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Data Sharing & Disclosure</h2>
                  <div className="space-y-3 text-gray-600">
                    <p><strong>4.1 We DO NOT Sell Your Data:</strong> We will never sell, rent, or trade your personal information to third parties.</p>
                    <p><strong>4.2 Service Providers:</strong> We may share limited information with trusted service providers (payment processors, email services, cloud hosting) who assist in our operations under strict confidentiality agreements.</p>
                    <p><strong>4.3 Legal Requirements:</strong> We may disclose information when required by Indian law, court orders, government authorities, or to protect our legal rights.</p>
                    <p><strong>4.4 Regulatory Bodies:</strong> We may share information with Income Tax Department, Ministry of Home Affairs (FCRA compliance), or other regulatory authorities as mandated by law.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-orange-100">
              <div className="flex items-start mb-4">
                <UserCheck className="w-8 h-8 text-orange-600 mr-4 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Your Rights & Choices</h2>
                  <div className="space-y-3 text-gray-600">
                    <p><strong>5.1 Access & Correction:</strong> You have the right to access, review, and correct your personal information. Contact us at <a href="mailto:mahimaministriesindia@gmail.com" className="text-orange-600 hover:underline">mahimaministriesindia@gmail.com</a></p>
                    <p><strong>5.2 Opt-Out:</strong> You can unsubscribe from our newsletters and marketing communications at any time by clicking the "unsubscribe" link or contacting us.</p>
                    <p><strong>5.3 Data Deletion:</strong> You may request deletion of your personal data, subject to legal retention requirements (tax records must be kept for 7 years).</p>
                    <p><strong>5.4 Cookie Management:</strong> You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-amber-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Cookies & Tracking Technologies</h2>
              <div className="space-y-3 text-gray-600">
                <p>We use cookies and similar technologies to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and user behavior</li>
                  <li>Provide personalized content and recommendations</li>
                  <li>Enable secure login and donation processing</li>
                </ul>
                <p className="mt-3">You can manage cookie preferences through your browser settings.</p>
              </div>
            </div>

            {/* Section 7 */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-orange-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Children's Privacy</h2>
              <div className="space-y-3 text-gray-600">
                <p>Our website is not intended for children under 18 years of age. We do not knowingly collect personal information from children. If you are a parent/guardian and believe your child has provided us with information, please contact us immediately.</p>
              </div>
            </div>

            {/* Section 8 */}
            <div className="glass p-8 rounded-2xl mb-8 border-2 border-amber-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Changes to This Policy</h2>
              <div className="space-y-3 text-gray-600">
                <p>We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes by:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Posting the updated policy on our website with a "Last Updated" date</li>
                  <li>Sending an email notification to registered users</li>
                </ul>
                <p className="mt-3">Continued use of our services after changes constitutes acceptance of the updated policy.</p>
              </div>
            </div>

            {/* Section 9 */}
            <div className="glass p-8 rounded-2xl border-2 border-orange-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Contact Us</h2>
              <div className="space-y-3 text-gray-600">
                <p>For questions, concerns, or requests regarding this Privacy Policy or your personal data:</p>
                <div className="bg-orange-50 p-4 rounded-lg mt-4">
                  <p className="font-bold text-gray-800 mb-2">Mahima Ministries</p>
                  <p>2-38/8/2/9/4/1, NTR Nagar Colony, Sridevi Theatre Road</p>
                  <p>Chandanagar, Ameenpur Mdl, Sangareddy, Telangana - 502032</p>
                  <p className="mt-2">Email: <a href="mailto:mahimaministriesindia@gmail.com" className="text-orange-600 hover:underline">mahimaministriesindia@gmail.com</a></p>
                  <p>Phone: 040-65553348 / 9246272675</p>
                </div>
                <p className="mt-4 text-sm italic">For grievances, please visit our <a href="/grievance-redressal" className="text-orange-600 hover:underline">Grievance Redressal</a> page.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Legal Compliance Note */}
      <section className="py-12 bg-gradient-to-br from-orange-100 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Compliance Commitment</h3>
            <p className="text-gray-600 leading-relaxed">
              Mahima Ministries is committed to protecting your privacy in accordance with the Information Technology Act 2000, 
              Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules 2011, 
              and all applicable Indian data protection regulations.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
