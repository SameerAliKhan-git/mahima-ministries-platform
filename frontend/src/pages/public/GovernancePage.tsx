import { Shield, FileText, Users, Eye, Award, TrendingUp } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function GovernancePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-emerald-50">
      <Header />

      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2087&auto=format&fit=crop"
            alt="Our Governance" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-amber-900/85"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Transparency & Accountability
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            Our <span className="text-amber-200">Governance</span>
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            How we ensure responsible stewardship of your donations and maintain the highest standards of integrity
          </p>
        </div>
      </section>

      {/* Governance Structure */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
              Governance Structure
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Board of Directors */}
              <div className="glass p-8 rounded-2xl hover-lift border-2 border-purple-100">
                <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Board of Directors</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Our independent board provides strategic oversight and ensures adherence to our mission.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>7 independent members</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Quarterly meetings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Diverse expertise</span>
                  </li>
                </ul>
              </div>

              {/* Executive Team */}
              <div className="glass p-8 rounded-2xl hover-lift border-2 border-emerald-100">
                <div className="w-16 h-16 gradient-emerald rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Executive Team</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Experienced leaders who manage day-to-day operations and program delivery.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">•</span>
                    <span>CEO & Executive Director</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">•</span>
                    <span>Program Directors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">•</span>
                    <span>Finance & Operations</span>
                  </li>
                </ul>
              </div>

              {/* Advisory Council */}
              <div className="glass p-8 rounded-2xl hover-lift border-2 border-orange-100">
                <div className="w-16 h-16 gradient-sunset rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Advisory Council</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Subject matter experts who guide our programs and strategic initiatives.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Healthcare experts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Education specialists</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Community leaders</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Accountability */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="glass p-10 md:p-12 rounded-3xl border-2 border-purple-100">
              <div className="flex items-center justify-center mb-8">
                <div className="w-20 h-20 gradient-purple rounded-3xl flex items-center justify-center shadow-xl shadow-purple-500/30">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Financial Accountability</h2>
              <p className="text-center text-gray-600 mb-8 text-lg">
                We maintain the highest standards of financial transparency and responsibility
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-purple-50 p-6 rounded-xl text-center">
                  <div className="text-4xl font-extrabold text-purple-600 mb-2">85%</div>
                  <div className="text-gray-700 font-medium">Program Expenses</div>
                  <div className="text-sm text-gray-600 mt-2">Direct impact on communities</div>
                </div>
                <div className="bg-emerald-50 p-6 rounded-xl text-center">
                  <div className="text-4xl font-extrabold text-emerald-600 mb-2">10%</div>
                  <div className="text-gray-700 font-medium">Administrative</div>
                  <div className="text-sm text-gray-600 mt-2">Operations & management</div>
                </div>
                <div className="bg-orange-50 p-6 rounded-xl text-center">
                  <div className="text-4xl font-extrabold text-orange-600 mb-2">5%</div>
                  <div className="text-gray-700 font-medium">Fundraising</div>
                  <div className="text-sm text-gray-600 mt-2">Donor engagement</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-purple-100">
                <h3 className="font-bold text-gray-800 mb-4 text-lg">Our Financial Commitments:</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2 mt-1">✓</span>
                    <span>Annual independent audits by certified public accountants</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2 mt-1">✓</span>
                    <span>Quarterly financial reports published on our website</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2 mt-1">✓</span>
                    <span>Form 990 tax returns available to the public</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2 mt-1">✓</span>
                    <span>Real-time donation tracking for all contributors</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Certifications & Memberships</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass p-6 rounded-xl border-2 border-purple-100">
                <div className="w-14 h-14 gradient-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">12A Registration</h3>
                <p className="text-sm text-gray-600">Government approved NGO status</p>
              </div>
              <div className="glass p-6 rounded-xl border-2 border-emerald-100">
                <div className="w-14 h-14 gradient-emerald rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">80G Certified</h3>
                <p className="text-sm text-gray-600">Tax exemption approved</p>
              </div>
              <div className="glass p-6 rounded-xl border-2 border-orange-100">
                <div className="w-14 h-14 gradient-sunset rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">FCRA Registered</h3>
                <p className="text-sm text-gray-600">Foreign funding approved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-emerald-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Important Documents</h2>
            <p className="text-white/90 mb-8">Download our governance and financial documents</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="bg-white/20 backdrop-blur-lg hover:bg-white/30 text-white font-semibold py-4 px-6 rounded-xl transition-all hover-lift flex items-center justify-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Annual Report 2024</span>
              </button>
              <button className="bg-white/20 backdrop-blur-lg hover:bg-white/30 text-white font-semibold py-4 px-6 rounded-xl transition-all hover-lift flex items-center justify-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Financial Statements</span>
              </button>
              <button className="bg-white/20 backdrop-blur-lg hover:bg-white/30 text-white font-semibold py-4 px-6 rounded-xl transition-all hover-lift flex items-center justify-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>80G Certificate</span>
              </button>
              <button className="bg-white/20 backdrop-blur-lg hover:bg-white/30 text-white font-semibold py-4 px-6 rounded-xl transition-all hover-lift flex items-center justify-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Bylaws & Policies</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
