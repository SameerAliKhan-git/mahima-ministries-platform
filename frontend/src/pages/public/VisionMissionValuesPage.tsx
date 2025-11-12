import { Eye, Target, Heart, Shield, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function VisionMissionValuesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />

      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=2070&auto=format&fit=crop"
            alt="Vision Mission Values" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-amber-900/85"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Our Purpose
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            <span className="text-amber-200">Vision</span> | <span className="text-amber-200">Mission</span> | <span className="text-amber-200">Values</span>
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            Our guiding principles that shape every decision and action we take
          </p>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="glass p-10 md:p-12 rounded-3xl border-2 border-orange-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission Statement</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We strive to ensure that every child and vulnerable person has access to care, education, and the opportunity to thrive. Through community-rooted programmes, we support families, strengthen youth, and care for the elderly and people in need with dignity and compassion.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our work spans multiple initiatives led by a dedicated team and supported by partners and well-wishers. Transparency and accountability guide how we plan, implement, and report our impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* As an Organization Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              As an independent, non-governmental social development organisation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass p-6 rounded-2xl border-2 border-orange-100 hover-lift">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 leading-relaxed">
                    We support children in need of care and protection.
                  </p>
                </div>
              </div>

              <div className="glass p-6 rounded-2xl border-2 border-amber-100 hover-lift">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 leading-relaxed">
                    We respect diverse cultures and work with communities for sustainable development.
                  </p>
                </div>
              </div>

              <div className="glass p-6 rounded-2xl border-2 border-orange-100 hover-lift">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 leading-relaxed">
                    We uphold child rights and safeguarding across all programmes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="glass p-10 md:p-16 rounded-3xl border-2 border-orange-100 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/30">
                <Eye className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Vision</h2>
              <p className="text-2xl text-gray-700 leading-relaxed font-medium">
                "A world where every child and vulnerable person thrives with dignity, education, and opportunity."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="glass p-10 md:p-16 rounded-3xl border-2 border-amber-100 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-500/30">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Mission</h2>
              <p className="text-2xl text-gray-700 leading-relaxed font-medium">
                "To deliver compassionate care, quality education, and sustainable livelihood support through community-driven programmes and transparent stewardship."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Values
              </h2>
              <p className="text-xl text-gray-600">The principles that guide our work every day</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Dignity and Respect */}
              <div className="glass p-8 rounded-2xl hover-lift border-2 border-orange-100">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Dignity and Respect</h3>
                <p className="text-gray-600 leading-relaxed">
                  We treat every person with dignity, honoring their worth and respecting their rights in all our interactions.
                </p>
              </div>

              {/* Integrity and Transparency */}
              <div className="glass p-8 rounded-2xl hover-lift border-2 border-amber-100">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-amber-500/30">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Integrity and Transparency</h3>
                <p className="text-gray-600 leading-relaxed">
                  We operate with complete transparency and accountability to our donors, partners, and beneficiaries.
                </p>
              </div>

              {/* Child Safety First */}
              <div className="glass p-8 rounded-2xl hover-lift border-2 border-orange-100">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Child Safety First</h3>
                <p className="text-gray-600 leading-relaxed">
                  The safety and protection of children is our highest priority across all programmes and activities.
                </p>
              </div>

              {/* Collaboration and Inclusion */}
              <div className="glass p-8 rounded-2xl hover-lift border-2 border-amber-100">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-amber-500/30">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Collaboration and Inclusion</h3>
                <p className="text-gray-600 leading-relaxed">
                  We believe in the power of partnership and building inclusive communities where everyone has a voice.
                </p>
              </div>

              {/* Stewardship and Accountability */}
              <div className="glass p-8 rounded-2xl hover-lift border-2 border-orange-100">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Stewardship and Accountability</h3>
                <p className="text-gray-600 leading-relaxed">
                  We responsibly manage resources entrusted to us and remain accountable for our impact and outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Explore our work</h2>
            <p className="text-xl text-white/90 mb-8">
              See programmes and stories aligned to our Vision, Mission, and Values.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/programmes"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Our Programmes
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-800 text-white font-bold rounded-xl hover:bg-orange-900 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Contact Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
