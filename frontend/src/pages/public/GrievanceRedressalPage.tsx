import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MessageSquare, Users, Clock, CheckCircle, AlertCircle, Phone, Mail, FileText } from 'lucide-react';
import { useState } from 'react';

export default function GrievanceRedressalPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    subject: '',
    description: '',
    transactionId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Grievance submitted:', formData);
    alert('Your grievance has been submitted successfully. Our team will contact you within 48 hours.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />

      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
            alt="Grievance Redressal" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-amber-900/85"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            We're Here to Help
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            Grievance Redressal
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            Your concerns matter to us. We are committed to resolving issues promptly and fairly.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
            <div className="glass p-6 rounded-2xl border-2 border-orange-100 text-center">
              <Clock className="w-12 h-12 text-orange-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-800 mb-1">48 Hours</div>
              <p className="text-sm text-gray-600">First Response Time</p>
            </div>
            <div className="glass p-6 rounded-2xl border-2 border-amber-100 text-center">
              <CheckCircle className="w-12 h-12 text-amber-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-800 mb-1">15 Days</div>
              <p className="text-sm text-gray-600">Maximum Resolution Time</p>
            </div>
            <div className="glass p-6 rounded-2xl border-2 border-orange-100 text-center">
              <Users className="w-12 h-12 text-orange-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-800 mb-1">Dedicated</div>
              <p className="text-sm text-gray-600">Grievance Officer</p>
            </div>
            <div className="glass p-6 rounded-2xl border-2 border-amber-100 text-center">
              <MessageSquare className="w-12 h-12 text-amber-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-800 mb-1">24/7</div>
              <p className="text-sm text-gray-600">Email Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            
            {/* Left Column - Information */}
            <div>
              {/* About Grievance Mechanism */}
              <div className="glass p-8 rounded-2xl mb-8 border-2 border-orange-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About Our Grievance Mechanism</h2>
                <p className="text-gray-600 mb-4">
                  As per Indian NGO regulations and best practices, Mahima Ministries has established a transparent grievance redressal mechanism 
                  to address concerns, complaints, and feedback from donors, beneficiaries, and stakeholders.
                </p>
                <p className="text-gray-600">
                  We are committed to resolving all grievances in a fair, timely, and respectful manner while maintaining confidentiality and transparency.
                </p>
              </div>

              {/* Types of Grievances */}
              <div className="glass p-8 rounded-2xl mb-8 border-2 border-amber-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">What Grievances Can You Report?</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div><strong>Donation Issues:</strong> Payment problems, receipt not received, 80G certificate delays</div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div><strong>Refund Requests:</strong> Transaction errors, unauthorized charges, duplicate payments</div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div><strong>Service Complaints:</strong> Staff behavior, communication issues, website problems</div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div><strong>Transparency Concerns:</strong> Fund utilization, program implementation, reporting</div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div><strong>Privacy Issues:</strong> Data security, unauthorized use of personal information</div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div><strong>Child Safety:</strong> Any concerns regarding beneficiary safety or safeguarding policies</div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div><strong>Other Concerns:</strong> Any other issue related to our organization's operations</div>
                  </li>
                </ul>
              </div>

              {/* Resolution Process */}
              <div className="glass p-8 rounded-2xl mb-8 border-2 border-orange-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Grievance Resolution Process</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold mr-3 flex-shrink-0">1</div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Submission</h3>
                      <p className="text-gray-600 text-sm">Submit your grievance via online form, email, or phone</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold mr-3 flex-shrink-0">2</div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Acknowledgment (48 Hours)</h3>
                      <p className="text-gray-600 text-sm">Receive unique grievance ID and acknowledgment email</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold mr-3 flex-shrink-0">3</div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Investigation (5-7 Days)</h3>
                      <p className="text-gray-600 text-sm">Our team reviews and investigates the matter</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold mr-3 flex-shrink-0">4</div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Resolution (Within 15 Days)</h3>
                      <p className="text-gray-600 text-sm">Action taken and detailed response provided</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold mr-3 flex-shrink-0">5</div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Escalation (If Needed)</h3>
                      <p className="text-gray-600 text-sm">Unsatisfied? Escalate to senior management or trustees</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grievance Officer */}
              <div className="glass p-8 rounded-2xl border-2 border-amber-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Grievance Redressal Officer</h2>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <p className="font-bold text-gray-800 mb-3">Mr. [Name] - Grievance Officer</p>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-orange-600 mr-2" />
                      <a href="mailto:grievance@mahimaministries.org" className="hover:text-orange-600">grievance@mahimaministries.org</a>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-orange-600 mr-2" />
                      <span>040-65553348 (Ext. 201)</span>
                    </div>
                    <div className="flex items-start">
                      <FileText className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />
                      <span className="text-sm">Available: Monday-Saturday, 9:00 AM - 6:00 PM IST</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 italic">
                    For urgent child safety concerns, call our 24/7 safeguarding hotline: 9246272675
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Grievance Form */}
            <div>
              <div className="glass p-8 rounded-2xl border-2 border-orange-100 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit Your Grievance</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Grievance Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select category</option>
                      <option value="donation">Donation Issues</option>
                      <option value="refund">Refund Request</option>
                      <option value="service">Service Complaint</option>
                      <option value="transparency">Transparency Concerns</option>
                      <option value="privacy">Privacy Issues</option>
                      <option value="child-safety">Child Safety</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Transaction ID (if applicable)</label>
                    <input
                      type="text"
                      name="transactionId"
                      value={formData.transactionId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter transaction or reference ID"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Brief subject of your grievance"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Detailed Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                      placeholder="Please provide detailed information about your grievance including dates, amounts, and any relevant details..."
                    />
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-600">
                        By submitting this form, you agree to our <a href="/privacy-policy" className="text-orange-600 hover:underline">Privacy Policy</a>. 
                        We will only use your information to resolve your grievance.
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Submit Grievance
                  </button>
                </form>

                <p className="text-xs text-gray-500 text-center mt-4">
                  You will receive an acknowledgment email with a unique grievance ID within 48 hours
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Alternative Contact Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Other Ways to Reach Us</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass p-6 rounded-2xl border-2 border-orange-100 text-center">
                <Phone className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-800 mb-2">Call Us</h3>
                <p className="text-sm text-gray-600 mb-2">040-65553348</p>
                <p className="text-sm text-gray-600">9246272675 / 9246332264</p>
                <p className="text-xs text-gray-500 mt-2">Mon-Sat, 9 AM - 6 PM</p>
              </div>

              <div className="glass p-6 rounded-2xl border-2 border-amber-100 text-center">
                <Mail className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-800 mb-2">Email Us</h3>
                <p className="text-sm text-gray-600 mb-1">
                  <a href="mailto:grievance@mahimaministries.org" className="text-amber-600 hover:underline">
                    grievance@mahimaministries.org
                  </a>
                </p>
                <p className="text-sm text-gray-600">
                  <a href="mailto:mahimaministriesindia@gmail.com" className="text-amber-600 hover:underline">
                    mahimaministriesindia@gmail.com
                  </a>
                </p>
                <p className="text-xs text-gray-500 mt-2">24/7 email support</p>
              </div>

              <div className="glass p-6 rounded-2xl border-2 border-orange-100 text-center">
                <FileText className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-800 mb-2">Written Post</h3>
                <p className="text-sm text-gray-600">Mahima Ministries</p>
                <p className="text-xs text-gray-600 mt-1">
                  2-38/8/2/9/4/1, NTR Nagar Colony<br />
                  Chandanagar, Ameenpur<br />
                  Telangana - 502032
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-12 bg-gradient-to-br from-orange-100 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <CheckCircle className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Commitment to You</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Mahima Ministries is committed to the highest standards of accountability, transparency, and ethical conduct. 
              Your grievance is important to us, and we will make every effort to resolve it fairly and promptly.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We maintain confidentiality of all grievances and protect your personal information as per our Privacy Policy and Indian data protection regulations.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
