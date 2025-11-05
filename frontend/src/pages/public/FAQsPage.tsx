import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { HelpCircle, Search } from 'lucide-react';
import { useState } from 'react';

export default function FAQsPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    { 
      q: 'How do I make a donation?', 
      a: 'You can donate through multiple methods: UPI (Google Pay, PhonePe, Paytm), Net Banking, Credit/Debit Card, NEFT/RTGS/IMPS bank transfer, or Cheque/DD. Visit our "Other Ways to Give" page for complete payment details and bank account information.' 
    },
    { 
      q: 'Is my donation eligible for tax exemption?', 
      a: 'Yes! Mahima Ministries is registered under Section 80G of the Income Tax Act, 1961. Donations are eligible for 50% tax deduction. We will provide an 80G certificate for your tax filing. Note: PAN details are mandatory for donations above ₹2,000 as per Income Tax regulations.' 
    },
    { 
      q: 'What is Section 80G and how does it benefit me?', 
      a: 'Section 80G of the Income Tax Act allows you to claim a deduction on your taxable income for donations made to eligible charitable organizations. For Mahima Ministries, you can claim 50% of your donation amount as a deduction, which reduces your tax liability. For example, if you donate ₹10,000, you can claim ₹5,000 as a deduction from your taxable income.' 
    },
    { 
      q: 'Do I need to provide my PAN for donations?', 
      a: 'Yes, as per Income Tax rules, PAN details are mandatory for all donations exceeding ₹2,000. This is required to issue the 80G tax exemption certificate. For donations below ₹2,000, PAN is not mandatory but recommended for proper record-keeping.' 
    },
    { 
      q: 'How will I receive my 80G certificate?', 
      a: 'After your donation is processed, we will email your 80G tax exemption certificate to your registered email address within 7-10 working days. The certificate will include your PAN, donation amount, date, and our registration details. You can use this certificate while filing your Income Tax Return.' 
    },
    { 
      q: 'Can my company make CSR donations to Mahima Ministries?', 
      a: 'Yes! We are eligible to receive Corporate Social Responsibility (CSR) contributions under Section 135 of the Companies Act, 2013. Our activities align with Schedule VII of the Act. Companies can fulfill their CSR obligations by supporting our programs in education, elderly care, healthcare, and community development. Please contact us for CSR partnership details and compliance documentation.' 
    },
    { 
      q: 'What payment methods do you accept?', 
      a: 'We accept: UPI payments (all UPI apps), Net Banking (all major Indian banks), Credit/Debit Cards (Visa, Mastercard, RuPay), NEFT/RTGS/IMPS bank transfers, Cheques and Demand Drafts. For bank transfer details, please visit our "Other Ways to Give" page or contact us at mahimaministriesindia@gmail.com.' 
    },
    { 
      q: 'How is my donation used?', 
      a: 'Your donations directly support our 6 active programs across Telangana: Upper Primary School, Destitute & Elderly Care Homes, Skill Development Centers, and Community Centers. We maintain complete transparency and publish annual reports with detailed utilization of funds. Approximately 85-90% of donations go directly to program implementation.' 
    },
    { 
      q: 'Can I sponsor a specific child?', 
      a: 'Yes! Our child sponsorship program allows you to support a specific child\'s education, healthcare, nutrition, and overall development with monthly contributions starting from ₹1,000. You will receive regular updates, progress reports, and photos of the child you sponsor. Visit our Child Sponsorship page for more details.' 
    },
    { 
      q: 'Can I donate in-kind (goods/materials)?', 
      a: 'Yes, we gladly accept in-kind donations such as food items, clothing, educational materials, medical supplies, furniture, and other useful items. We provide receipts for in-kind donations as well. Please contact us before sending materials to ensure we have the current need and storage capacity.' 
    },
    { 
      q: 'How do I cancel my recurring donation?', 
      a: 'You can cancel your recurring donation anytime through your donor portal account or by emailing us at mahimaministriesindia@gmail.com. There are no questions asked and no penalties. We understand that circumstances change, and we appreciate any support you were able to provide.' 
    },
    { 
      q: 'Do you accept foreign donations (FCRA)?', 
      a: 'Please check our FCRA registration status in the footer. If we have valid FCRA registration, we can accept foreign donations. Foreign donors should contact us at mahimaministriesindia@gmail.com for specific bank account details and compliance requirements for international transfers.' 
    },
    { 
      q: 'Are my payment details secure?', 
      a: 'Absolutely! All online transactions are processed through secure, PCI-DSS compliant payment gateways with 256-bit SSL encryption. We do not store your credit card or banking details on our servers. Your payment information is handled directly by certified payment processors.' 
    },
    { 
      q: 'Can I get a refund if I donated by mistake?', 
      a: 'Yes, we have a refund policy in place. If you made a donation in error, please contact us at mahimaministriesindia@gmail.com within 7 days with your transaction details. Refunds will be processed within 10-15 working days. Please refer to our Refund & Cancellation Policy page for complete details.' 
    },
    { 
      q: 'Where can I find your registration and financial documents?', 
      a: 'All our legal documents, registration certificates, annual reports, and financial statements are available in the "Financial Information" and "Annual Reports" sections of our website. This includes our Trust Registration, 80G Certificate, 12A Registration, PAN details, and audited financial statements. We maintain full transparency as per Indian NGO regulations.' 
    },
    { 
      q: 'How can I verify your organization\'s credentials?', 
      a: 'You can verify our credentials through: (1) Our Registration Number with the Charity Commissioner, (2) 80G and 12A certificates issued by the Income Tax Department, (3) PAN and TAN numbers listed in our footer, (4) Annual reports and audited financial statements on our website, (5) CSR registration if applicable. All documents are available for public viewing.' 
    },
    { 
      q: 'Who can I contact for more information?', 
      a: 'For any queries, please contact us at: Email: mahimaministriesindia@gmail.com | Phone: 040-65553348, 9246272675, 9246332264 | Address: 2-38/8/2/9/4/1, NTR Nagar Colony, Chandanagar, Ameenpur, Sangareddy, Telangana - 502032. Our team is available Monday to Saturday, 9 AM to 6 PM IST.' 
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />
      
      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
            alt="Frequently Asked Questions" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-amber-900/85"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Help Center
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            Frequently Asked Questions
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg mb-8">
            Find answers to common questions about donations, programs, and partnerships.
          </p>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search FAQs..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-orange-200 focus:border-orange-500 outline-none"
            />
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border-2 border-orange-200">
              <div className="text-orange-600 text-3xl font-bold mb-2">80G</div>
              <h3 className="font-bold text-gray-800 mb-2">Tax Exemption</h3>
              <p className="text-sm text-gray-600">50% tax deduction under Section 80G</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border-2 border-orange-200">
              <div className="text-orange-600 text-3xl font-bold mb-2">₹2,000</div>
              <h3 className="font-bold text-gray-800 mb-2">PAN Required</h3>
              <p className="text-sm text-gray-600">Mandatory for donations above this amount</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border-2 border-orange-200">
              <div className="text-orange-600 text-3xl font-bold mb-2">7-10</div>
              <h3 className="font-bold text-gray-800 mb-2">Days</h3>
              <p className="text-sm text-gray-600">80G certificate delivery time</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Category: Donations & Payments */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full"></div>
                Donations & Payment Methods
              </h2>
              <div className="space-y-4">
                {faqs.slice(0, 7).map((faq, idx) => (
                  <div key={idx} className="glass rounded-2xl border-2 border-orange-100 overflow-hidden">
                    <button 
                      onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                      className="w-full p-6 flex items-center justify-between text-left hover:bg-orange-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <HelpCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
                        <span className="font-bold text-gray-800">{faq.q}</span>
                      </div>
                      <span className="text-2xl text-orange-600">{openFAQ === idx ? '−' : '+'}</span>
                    </button>
                    {openFAQ === idx && (
                      <div className="px-6 pb-6 pl-16 text-gray-600 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Category: Programs & Sponsorship */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full"></div>
                Programs & Sponsorship
              </h2>
              <div className="space-y-4">
                {faqs.slice(7, 10).map((faq, idx) => (
                  <div key={idx + 7} className="glass rounded-2xl border-2 border-orange-100 overflow-hidden">
                    <button 
                      onClick={() => setOpenFAQ(openFAQ === (idx + 7) ? null : idx + 7)}
                      className="w-full p-6 flex items-center justify-between text-left hover:bg-orange-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <HelpCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
                        <span className="font-bold text-gray-800">{faq.q}</span>
                      </div>
                      <span className="text-2xl text-orange-600">{openFAQ === (idx + 7) ? '−' : '+'}</span>
                    </button>
                    {openFAQ === (idx + 7) && (
                      <div className="px-6 pb-6 pl-16 text-gray-600 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Category: Security & Compliance */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full"></div>
                Security, Compliance & Transparency
              </h2>
              <div className="space-y-4">
                {faqs.slice(10).map((faq, idx) => (
                  <div key={idx + 10} className="glass rounded-2xl border-2 border-orange-100 overflow-hidden">
                    <button 
                      onClick={() => setOpenFAQ(openFAQ === (idx + 10) ? null : idx + 10)}
                      className="w-full p-6 flex items-center justify-between text-left hover:bg-orange-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <HelpCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
                        <span className="font-bold text-gray-800">{faq.q}</span>
                      </div>
                      <span className="text-2xl text-orange-600">{openFAQ === (idx + 10) ? '−' : '+'}</span>
                    </button>
                    {openFAQ === (idx + 10) && (
                      <div className="px-6 pb-6 pl-16 text-gray-600 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Still Have Questions?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Our team is here to help you with any queries about donations, programs, or partnerships
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:mahimaministriesindia@gmail.com"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Email Us
              </a>
              <a 
                href="tel:04065553348"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 font-bold rounded-xl border-2 border-orange-200 hover:bg-orange-50 transition-all duration-300"
              >
                Call: 040-65553348
              </a>
            </div>
            <p className="mt-6 text-sm text-gray-600">
              Available Monday to Saturday, 9 AM to 6 PM IST
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
