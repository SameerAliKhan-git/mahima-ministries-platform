import { Building2, Users, TrendingUp, Award, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PartnershipPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-emerald-50">
      <Header />

      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop"
            alt="Corporate Partnership" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-amber-900/85"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Partner With Us
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            Corporate <span className="text-amber-200">Partnership</span>
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg mb-8">
            Align your business with meaningful impact. Together, we can create lasting change while strengthening your corporate social responsibility.
          </p>
          <Link 
            to="/contact" 
            className="inline-block gradient-sunset text-white font-bold py-4 px-10 rounded-2xl hover-lift shadow-2xl shadow-orange-500/30"
          >
            Start a Partnership
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
              Partnership Benefits
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Why leading companies choose Mahima Ministries</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass p-8 rounded-2xl hover-lift border-2 border-purple-100">
                <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Measurable Impact</h3>
                <p className="text-gray-600">
                  Receive detailed reports showing exactly how your contribution is creating change in communities.
                </p>
              </div>

              <div className="glass p-8 rounded-2xl hover-lift border-2 border-emerald-100">
                <div className="w-16 h-16 gradient-emerald rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Brand Enhancement</h3>
                <p className="text-gray-600">
                  Strengthen your brand reputation and demonstrate your commitment to social responsibility.
                </p>
              </div>

              <div className="glass p-8 rounded-2xl hover-lift border-2 border-orange-100">
                <div className="w-16 h-16 gradient-sunset rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Employee Engagement</h3>
                <p className="text-gray-600">
                  Boost morale with volunteer opportunities and team-building activities that make a difference.
                </p>
              </div>

              <div className="glass p-8 rounded-2xl hover-lift border-2 border-purple-100">
                <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Tax Benefits</h3>
                <p className="text-gray-600">
                  All corporate donations are eligible for CSR compliance and 80G tax benefits under Indian regulations.
                </p>
              </div>

              <div className="glass p-8 rounded-2xl hover-lift border-2 border-emerald-100">
                <div className="w-16 h-16 gradient-emerald rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Flexible Options</h3>
                <p className="text-gray-600">
                  Choose from various partnership levels and customize your involvement to match your goals.
                </p>
              </div>

              <div className="glass p-8 rounded-2xl hover-lift border-2 border-orange-100">
                <div className="w-16 h-16 gradient-sunset rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Recognition</h3>
                <p className="text-gray-600">
                  Receive public acknowledgment through our website, reports, and events as a valued partner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Partnership Tiers</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Bronze */}
              <div className="glass p-8 rounded-2xl border-2 border-orange-100 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">Bronze</div>
                <div className="text-4xl font-extrabold text-gray-800 mb-4">₹8 Lakh+</div>
                <p className="text-gray-600 mb-6">Annual contribution</p>
                <ul className="text-left space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">✓</span>
                    <span>Logo on website</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">✓</span>
                    <span>Quarterly impact reports</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">✓</span>
                    <span>Social media recognition</span>
                  </li>
                </ul>
              </div>

              {/* Silver */}
              <div className="glass p-8 rounded-2xl border-2 border-purple-200 text-center ring-2 ring-purple-300 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Popular
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">Silver</div>
                <div className="text-4xl font-extrabold text-gray-800 mb-4">₹20 Lakh+</div>
                <p className="text-gray-600 mb-6">Annual contribution</p>
                <ul className="text-left space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span>All Bronze benefits</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span>Employee volunteer opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span>Annual site visit</span>
                  </li>
                </ul>
              </div>

              {/* Gold */}
              <div className="glass p-8 rounded-2xl border-2 border-emerald-100 text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">Gold</div>
                <div className="text-4xl font-extrabold text-gray-800 mb-4">₹40 Lakh+</div>
                <p className="text-gray-600 mb-6">Annual contribution</p>
                <ul className="text-left space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">✓</span>
                    <span>All Silver benefits</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">✓</span>
                    <span>Named program sponsorship</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">✓</span>
                    <span>Exclusive events & networking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">✓</span>
                    <span>Custom impact campaigns</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-emerald-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Make an Impact?</h2>
            <p className="text-xl text-white/90 mb-8">
              Let's discuss how we can create a customized partnership that aligns with your corporate values and goals.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-white text-purple-600 font-bold py-4 px-10 rounded-2xl hover-lift shadow-2xl"
            >
              Contact Our Partnership Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
