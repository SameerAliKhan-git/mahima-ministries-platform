import { Heart, Users, BookOpen, Home, Gift, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function SponsorshipPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-emerald-50">
      <Header />

      {/* Hero Section with Image */}
      <section className="relative min-h-[600px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
            alt="Child Sponsorship Program" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-amber-900/85"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-28">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Transform a Child's Life
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            Child Sponsorship Program
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg mb-8">
            Create lasting change in a child's life through education, healthcare, and opportunities for a brighter future
          </p>
          <Link 
            to="/donate" 
            className="inline-block gradient-sunset text-white font-bold py-4 px-10 rounded-2xl hover-lift shadow-2xl shadow-orange-500/30"
          >
            Sponsor a Child Today
          </Link>
        </div>
      </section>

      {/* What is Sponsorship */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="glass p-10 md:p-12 rounded-3xl border-2 border-purple-100">
              <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">What is Child Sponsorship?</h2>
              <p className="text-lg text-gray-600 leading-relaxed text-center mb-8">
                Child sponsorship is a personal way to make a tangible difference in a child's life. Your monthly contribution 
                provides essential resources for education, healthcare, nutrition, and family support—giving vulnerable children 
                the tools they need to break the cycle of poverty.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border-2 border-purple-100">
                  <h3 className="font-bold text-gray-800 mb-3 text-lg flex items-center">
                    <CheckCircle className="w-5 h-5 text-purple-600 mr-2" />
                    Direct Impact
                  </h3>
                  <p className="text-gray-600">
                    Your support goes directly to your sponsored child and their community, creating measurable change.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border-2 border-emerald-100">
                  <h3 className="font-bold text-gray-800 mb-3 text-lg flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mr-2" />
                    Personal Connection
                  </h3>
                  <p className="text-gray-600">
                    Receive photos, letters, and progress updates from your sponsored child throughout the year.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Sponsorship Provides */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
              What Your Sponsorship Provides
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Your ₹3,500/month makes all of this possible</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Education */}
              <div className="glass p-8 rounded-2xl hover-lift border-2 border-purple-100">
                <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Education</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>School tuition and fees</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Books and supplies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Uniforms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Tutoring support</span>
                  </li>
                </ul>
              </div>

              {/* Healthcare */}
              <div className="glass p-8 rounded-2xl hover-lift border-2 border-emerald-100">
                <div className="w-16 h-16 gradient-emerald rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Healthcare</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">•</span>
                    <span>Regular medical checkups</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">•</span>
                    <span>Vaccinations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">•</span>
                    <span>Medicine when needed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">•</span>
                    <span>Dental care</span>
                  </li>
                </ul>
              </div>

              {/* Nutrition */}
              <div className="glass p-8 rounded-2xl hover-lift border-2 border-orange-100">
                <div className="w-16 h-16 gradient-sunset rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Nutrition</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Daily nutritious meals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Vitamin supplements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Clean drinking water</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Food security</span>
                  </li>
                </ul>
              </div>

              {/* Life Skills */}
              <div className="glass p-8 rounded-2xl hover-lift border-2 border-purple-100">
                <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Life Skills</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Mentorship programs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Vocational training</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Leadership development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Career counseling</span>
                  </li>
                </ul>
              </div>

              {/* Safe Environment */}
              <div className="glass p-8 rounded-2xl hover-lift border-2 border-emerald-100">
                <div className="w-16 h-16 gradient-emerald rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
                  <Home className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Safe Environment</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">•</span>
                    <span>Child protection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">•</span>
                    <span>Community support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">•</span>
                    <span>Recreational activities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">•</span>
                    <span>Emotional support</span>
                  </li>
                </ul>
              </div>

              {/* Family Support */}
              <div className="glass p-8 rounded-2xl hover-lift border-2 border-orange-100">
                <div className="w-16 h-16 gradient-sunset rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Family Support</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Parent workshops</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Economic empowerment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Home visits</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Crisis intervention</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
              How It Works
            </h2>

            <div className="space-y-6">
              <div className="glass p-8 rounded-2xl border-2 border-purple-100 flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 gradient-purple rounded-full flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Choose a Child</h3>
                  <p className="text-gray-600">Browse available children and select one who speaks to your heart. You'll receive their photo, story, and background information.</p>
                </div>
              </div>

              <div className="glass p-8 rounded-2xl border-2 border-emerald-100 flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 gradient-emerald rounded-full flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Start Your Monthly Sponsorship</h3>
                  <p className="text-gray-600">Set up a convenient monthly contribution of ₹3,500. Your donation is eligible for 80G tax benefits and can be adjusted or cancelled anytime.</p>
                </div>
              </div>

              <div className="glass p-8 rounded-2xl border-2 border-orange-100 flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 gradient-sunset rounded-full flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Build a Relationship</h3>
                  <p className="text-gray-600">Exchange letters, receive progress reports, and watch your sponsored child grow and thrive. Optional video calls available!</p>
                </div>
              </div>

              <div className="glass p-8 rounded-2xl border-2 border-purple-100 flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 gradient-purple rounded-full flex items-center justify-center text-white font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">See the Transformation</h3>
                  <p className="text-gray-600">Receive annual reports showing how your support has helped your child and their entire community flourish.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-emerald-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Change a Life?</h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of sponsors who are making a real difference. Your journey starts today.
            </p>
            <Link 
              to="/donate" 
              className="inline-block bg-white text-purple-600 font-bold py-4 px-10 rounded-2xl hover-lift shadow-2xl hover:shadow-3xl transition-all"
            >
              Sponsor a Child for ₹3,500/Month
            </Link>
            <p className="text-white/80 mt-6 text-sm">80G Tax Benefits • Cancel anytime • 100% transparent</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
