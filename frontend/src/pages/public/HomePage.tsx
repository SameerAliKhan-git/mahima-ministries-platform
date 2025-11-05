import { Link } from 'react-router-dom';
import { Heart, Users, TrendingUp, Shield, GraduationCap, Home as HomeIcon, Award, ArrowRight, Zap, Briefcase } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[600px] overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
            alt="Community helping hands" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 via-orange-800/70 to-amber-900/80"></div>
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            ✨ Making a Difference Together
          </div>
          <h2 className="text-6xl md:text-7xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            Transform Lives<br />Through Giving
          </h2>
          <p className="text-xl md:text-2xl text-orange-50 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Join thousands of donors making a real impact. Every contribution helps us build a better tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/donate" 
              className="group gradient-sunset text-white font-bold py-4 px-10 rounded-2xl hover-lift shadow-2xl shadow-orange-500/30 flex items-center space-x-2"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Donate Now</span>
            </Link>
            <a 
              href="#features" 
              className="bg-white/10 backdrop-blur-sm px-10 py-4 rounded-2xl font-semibold text-white hover-lift border-2 border-white/30 hover:bg-white/20 transition-all"
            >
              Learn More
            </a>
          </div>
          
          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl hover-lift shadow-xl">
              <div className="text-4xl font-bold text-orange-600 mb-2">₹20 Cr+</div>
              <div className="text-gray-700 font-medium">Total Raised</div>
            </div>
            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl hover-lift shadow-xl">
              <div className="text-4xl font-bold text-amber-600 mb-2">15K+</div>
              <div className="text-gray-700 font-medium">Active Donors</div>
            </div>
            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl hover-lift shadow-xl">
              <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-gray-700 font-medium">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Why Donors Love Us
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the most trusted and transparent donation platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="glass p-8 rounded-3xl hover-lift gradient-border group">
              <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/30">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-3 text-gray-800">Bank-Level Security</h4>
              <p className="text-gray-600 leading-relaxed">
                Your donations are protected with 256-bit encryption and PCI-DSS compliance. We never store your payment information.
              </p>
              <div className="mt-4 flex items-center text-orange-600 font-semibold text-sm">
                <span>Learn more</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="glass p-8 rounded-3xl hover-lift gradient-border group">
              <div className="w-16 h-16 gradient-emerald rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/30">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-3 text-gray-800">Real-Time Impact</h4>
              <p className="text-gray-600 leading-relaxed">
                Track every rupee with live dashboards and detailed reports. See exactly how your generosity changes lives.
              </p>
              <div className="mt-4 flex items-center text-amber-600 font-semibold text-sm">
                <span>View dashboard</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="glass p-8 rounded-3xl hover-lift gradient-border group">
              <div className="w-16 h-16 gradient-sunset rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/30">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-3 text-gray-800">Instant Processing</h4>
              <p className="text-gray-600 leading-relaxed">
                Set up one-time or recurring donations in seconds. Cancel anytime with zero hassle or hidden fees.
              </p>
              <div className="mt-4 flex items-center text-orange-600 font-semibold text-sm">
                <span>Start giving</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-semibold text-gray-700">80G Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-semibold text-gray-700">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-semibold text-gray-700">15,000+ Donors</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                  About Mahima Ministries
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                  Caring for Lives, Building Hope
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Mahima Ministries is a non-government organization working at the grass roots level by caring for and touching the lives of people who are in distress since 2005.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  We are committed to care irrespective of religion, caste, creed or ethnicity, by providing counseling, food, shelter, clothing, education and medical treatment with a holistic approach.
                </p>
                <Link 
                  to="/about-us"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Learn More About Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070&auto=format&fit=crop" 
                  alt="Community support" 
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                  <div className="text-3xl font-bold text-orange-600">19+</div>
                  <div className="text-gray-600 font-medium">Years of Service</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-white">Our Impact in Numbers</h2>
            <p className="text-center text-white/90 mb-12 text-lg">Making a difference, one life at a time</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-extrabold text-white mb-2">500+</div>
                <div className="text-white/90 font-medium">Children Supported</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-extrabold text-white mb-2">150+</div>
                <div className="text-white/90 font-medium">Elderly Cared For</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-extrabold text-white mb-2">6</div>
                <div className="text-white/90 font-medium">Active Projects</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-extrabold text-white mb-2">19+</div>
                <div className="text-white/90 font-medium">Years of Service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Initiatives Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                What We Focus On
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
                Our Core Initiatives
              </h2>
              <p className="text-xl text-gray-600">
                Supporting vulnerable communities with holistic care
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="glass p-6 rounded-2xl border-2 border-orange-100 hover-lift text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Child Care</h3>
                <p className="text-gray-600 text-sm">Orphans & abandoned, SC/ST & BPL children</p>
              </div>

              <div className="glass p-6 rounded-2xl border-2 border-amber-100 hover-lift text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Elderly Care</h3>
                <p className="text-gray-600 text-sm">Mentally ill and destitute elderly adults</p>
              </div>

              <div className="glass p-6 rounded-2xl border-2 border-orange-100 hover-lift text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Healthcare</h3>
                <p className="text-gray-600 text-sm">HIV/AIDS patients without anyone to care</p>
              </div>

              <div className="glass p-6 rounded-2xl border-2 border-amber-100 hover-lift text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Community Care</h3>
                <p className="text-gray-600 text-sm">Development and awareness programmes</p>
              </div>

              <div className="glass p-6 rounded-2xl border-2 border-orange-100 hover-lift text-center cursor-pointer" onClick={() => window.location.href = '/higher-education-support'}>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Higher Education</h3>
                <p className="text-gray-600 text-sm">Shelter, skills & external education support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programmes Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                Our Projects
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
                Active Programmes
              </h2>
              <p className="text-xl text-gray-600">
                Six locations serving communities across Telangana
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass p-8 rounded-2xl border-2 border-orange-100 hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Upper Primary School</h3>
                <p className="text-gray-600 text-sm mb-2">Ameenpur, Hyderabad</p>
                <p className="text-gray-500 text-sm">Quality education for underprivileged children</p>
              </div>

              <div className="glass p-8 rounded-2xl border-2 border-amber-100 hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Destitute & Elderly Care</h3>
                <p className="text-gray-600 text-sm mb-2">Ameenpur, Hyderabad</p>
                <p className="text-gray-500 text-sm">Compassionate care for vulnerable elderly</p>
              </div>

              <div className="glass p-8 rounded-2xl border-2 border-orange-100 hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Skill Development Center</h3>
                <p className="text-gray-600 text-sm mb-2">Ameenpur, Hyderabad</p>
                <p className="text-gray-500 text-sm">Vocational training for youth</p>
              </div>

              <div className="glass p-8 rounded-2xl border-2 border-amber-100 hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Community Center</h3>
                <p className="text-gray-600 text-sm mb-2">Sidduloor, Vikarabad</p>
                <p className="text-gray-500 text-sm">Building stronger communities together</p>
              </div>

              <div className="glass p-8 rounded-2xl border-2 border-orange-100 hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-4">
                  <HomeIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Old Age Home</h3>
                <p className="text-gray-600 text-sm mb-2">Kompally, Vikarabad</p>
                <p className="text-gray-500 text-sm">Dignified living for senior citizens</p>
              </div>

              <div className="glass p-8 rounded-2xl border-2 border-amber-100 hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Disabled & Destitute Home</h3>
                <p className="text-gray-600 text-sm mb-2">Kompally, Vikarabad</p>
                <p className="text-gray-500 text-sm">Specialized care for disabled persons</p>
              </div>

              <div className="glass p-8 rounded-2xl border-2 border-orange-100 hover-lift cursor-pointer" onClick={() => window.location.href = '/higher-education-support'}>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Higher Education Support</h3>
                <p className="text-gray-600 text-sm mb-2">Multiple Locations</p>
                <p className="text-gray-500 text-sm">Shelter, skills & education sponsorship</p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link 
                to="/programmes"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                View All Programmes
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stories of Impact Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                Real Stories
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
                Stories of Impact
              </h2>
              <p className="text-xl text-gray-600">
                Lives transformed through compassion and care
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover-lift">
                <img 
                  src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=2086&auto=format&fit=crop" 
                  alt="Child education" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-orange-600 font-semibold text-sm mb-2">Education</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Empowering Through Education</h3>
                  <p className="text-gray-600 mb-4">
                    Children from our Upper Primary School are excelling in academics and discovering their potential.
                  </p>
                  <Link to="/blog" className="text-orange-600 font-semibold inline-flex items-center hover:text-orange-700">
                    Read Story <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover-lift">
                <img 
                  src="https://images.unsplash.com/photo-1516733968668-dbdce39c4651?q=80&w=2070&auto=format&fit=crop" 
                  alt="Elderly care" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-amber-600 font-semibold text-sm mb-2">Elderly Care</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Dignity in Golden Years</h3>
                  <p className="text-gray-600 mb-4">
                    Our elderly residents find comfort, companionship, and quality care in their later years.
                  </p>
                  <Link to="/blog" className="text-amber-600 font-semibold inline-flex items-center hover:text-amber-700">
                    Read Story <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover-lift">
                <img 
                  src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=2031&auto=format&fit=crop" 
                  alt="Community support" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-orange-600 font-semibold text-sm mb-2">Community</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Building Stronger Communities</h3>
                  <p className="text-gray-600 mb-4">
                    Our community programs bring people together and create lasting positive change.
                  </p>
                  <Link to="/blog" className="text-orange-600 font-semibold inline-flex items-center hover:text-orange-700">
                    Read Story <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Help Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                Get Involved
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
                Ways to Help
              </h2>
              <p className="text-xl text-gray-600">
                Multiple ways to support our mission
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass p-8 rounded-2xl border-2 border-orange-100 hover-lift">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Make a Donation</h3>
                <p className="text-gray-600 mb-6">
                  Your financial support directly impacts lives and helps us continue our programmes.
                </p>
                <Link 
                  to="/donate"
                  className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700"
                >
                  Donate Now <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="glass p-8 rounded-2xl border-2 border-amber-100 hover-lift">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Become a Partner</h3>
                <p className="text-gray-600 mb-6">
                  Partner with us as a corporate or institution to create sustainable impact.
                </p>
                <Link 
                  to="/partnership"
                  className="inline-flex items-center text-amber-600 font-semibold hover:text-amber-700"
                >
                  Partner With Us <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="glass p-8 rounded-2xl border-2 border-orange-100 hover-lift">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Sponsor a Child</h3>
                <p className="text-gray-600 mb-6">
                  Transform a child's future through education, healthcare, and holistic support.
                </p>
                <Link 
                  to="/sponsorship"
                  className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700"
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                Trusted By
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
                Our Partners & Supporters
              </h2>
              <p className="text-xl text-gray-600">
                Working together to create lasting change
              </p>
            </div>

            {/* Scrolling Partner Logos */}
            <div className="relative overflow-hidden mb-12">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-amber-50 to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-orange-50 to-transparent z-10"></div>
              
              <div className="flex gap-16 animate-scroll whitespace-nowrap">
                {/* First set of logos */}
                <div className="flex items-center gap-16 animate-scroll">
                  <div className="flex-shrink-0">
                    <img 
                      src="/Verity Knowledge Solutions.png" 
                      alt="Verity Knowledge Solutions" 
                      className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="/Franklin Templeton Investments.png" 
                      alt="Franklin Templeton Investments" 
                      className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="/Azim premji Foundation.png" 
                      alt="Azim Premji Foundation" 
                      className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="/Dell Logo.jpg" 
                      alt="Dell" 
                      className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="/ivycomptech.jpg" 
                      alt="Ivy Comptech" 
                      className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  
                  {/* Duplicate set for seamless loop */}
                  <div className="flex-shrink-0">
                    <img 
                      src="/Verity Knowledge Solutions.png" 
                      alt="Verity Knowledge Solutions" 
                      className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="/Franklin Templeton Investments.png" 
                      alt="Franklin Templeton Investments" 
                      className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="/Azim premji Foundation.png" 
                      alt="Azim Premji Foundation" 
                      className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="/Dell Logo.jpg" 
                      alt="Dell" 
                      className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="/ivycomptech.jpg" 
                      alt="Ivy Comptech" 
                      className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link 
                to="/partnership"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Become a Partner
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* UN Sustainable Development Goals Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                Global Impact
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
                Supporting UN Sustainable Development Goals
              </h2>
              <p className="text-xl text-gray-600 mb-4">
                Our work directly contributes to achieving the UN SDGs
              </p>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Mahima Ministries aligns its programmes with the United Nations' 2030 Agenda for Sustainable Development, 
                contributing to multiple goals through our holistic approach to community welfare.
              </p>
            </div>

            {/* SDG Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
              {/* SDG 1: No Poverty */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative w-full aspect-square transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  {/* Front Side */}
                  <div className="absolute w-full h-full backface-hidden">
                    <div className="glass p-4 rounded-2xl border-2 border-orange-100 h-full flex flex-col">
                      <div className="flex-1 rounded-xl overflow-hidden mb-3 flex items-center justify-center">
                        <img 
                          src="/sdgs/Sustainable_Development_Goal_01NoPoverty.svg.png" 
                          alt="SDG 1: No Poverty" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="text-xs font-bold text-gray-800 text-center">No Poverty</h3>
                    </div>
                  </div>
                  {/* Back Side */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="glass p-4 rounded-2xl border-2 border-orange-100 h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
                      <h3 className="text-xs font-bold text-gray-800 text-center mb-3">SDG 1: No Poverty</h3>
                      <a 
                        href="https://sdgs.un.org/goals/goal1" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* SDG 2: Zero Hunger */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative w-full aspect-square transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  {/* Front Side */}
                  <div className="absolute w-full h-full backface-hidden">
                    <div className="glass p-4 rounded-2xl border-2 border-amber-100 h-full flex flex-col">
                      <div className="flex-1 rounded-xl overflow-hidden mb-3 flex items-center justify-center">
                        <img 
                          src="/sdgs/Sustainable_Development_Goal_02ZeroHunger.svg.png" 
                          alt="SDG 2: Zero Hunger" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="text-xs font-bold text-gray-800 text-center">Zero Hunger</h3>
                    </div>
                  </div>
                  {/* Back Side */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="glass p-4 rounded-2xl border-2 border-amber-100 h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
                      <h3 className="text-xs font-bold text-gray-800 text-center mb-3">SDG 2: Zero Hunger</h3>
                      <a 
                        href="https://sdgs.un.org/goals/goal2" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* SDG 3: Good Health */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative w-full aspect-square transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  {/* Front Side */}
                  <div className="absolute w-full h-full backface-hidden">
                    <div className="glass p-4 rounded-2xl border-2 border-orange-100 h-full flex flex-col">
                      <div className="flex-1 rounded-xl overflow-hidden mb-3 flex items-center justify-center">
                        <img 
                          src="/sdgs/Sustainable_Development_Goal_03GoodHealth.svg.png" 
                          alt="SDG 3: Good Health and Well-being" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="text-xs font-bold text-gray-800 text-center">Good Health</h3>
                    </div>
                  </div>
                  {/* Back Side */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="glass p-4 rounded-2xl border-2 border-orange-100 h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
                      <h3 className="text-xs font-bold text-gray-800 text-center mb-3">SDG 3: Good Health</h3>
                      <a 
                        href="https://sdgs.un.org/goals/goal3" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* SDG 4: Quality Education */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative w-full aspect-square transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  {/* Front Side */}
                  <div className="absolute w-full h-full backface-hidden">
                    <div className="glass p-4 rounded-2xl border-2 border-amber-100 h-full flex flex-col">
                      <div className="flex-1 rounded-xl overflow-hidden mb-3 flex items-center justify-center">
                        <img 
                          src="/sdgs/Sustainable_Development_Goal_04QualityEducation.svg.png" 
                          alt="SDG 4: Quality Education" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="text-xs font-bold text-gray-800 text-center">Quality Education</h3>
                    </div>
                  </div>
                  {/* Back Side */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="glass p-4 rounded-2xl border-2 border-amber-100 h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
                      <h3 className="text-xs font-bold text-gray-800 text-center mb-3">SDG 4: Quality Education</h3>
                      <a 
                        href="https://sdgs.un.org/goals/goal4" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* SDG 5: Gender Equality */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative w-full aspect-square transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  {/* Front Side */}
                  <div className="absolute w-full h-full backface-hidden">
                    <div className="glass p-4 rounded-2xl border-2 border-orange-100 h-full flex flex-col">
                      <div className="flex-1 rounded-xl overflow-hidden mb-3 flex items-center justify-center">
                        <img 
                          src="/sdgs/Sustainable_Development_Goal_05GenderEquality.svg.png" 
                          alt="SDG 5: Gender Equality" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="text-xs font-bold text-gray-800 text-center">Gender Equality</h3>
                    </div>
                  </div>
                  {/* Back Side */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="glass p-4 rounded-2xl border-2 border-orange-100 h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
                      <h3 className="text-xs font-bold text-gray-800 text-center mb-3">SDG 5: Gender Equality</h3>
                      <a 
                        href="https://sdgs.un.org/goals/goal5" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* SDG 8: Decent Work */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative w-full aspect-square transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  {/* Front Side */}
                  <div className="absolute w-full h-full backface-hidden">
                    <div className="glass p-4 rounded-2xl border-2 border-amber-100 h-full flex flex-col">
                      <div className="flex-1 rounded-xl overflow-hidden mb-3 flex items-center justify-center">
                        <img 
                          src="/sdgs/Sustainable_Development_Goal_08DecentWork.svg.png" 
                          alt="SDG 8: Decent Work and Economic Growth" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="text-xs font-bold text-gray-800 text-center">Decent Work</h3>
                    </div>
                  </div>
                  {/* Back Side */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="glass p-4 rounded-2xl border-2 border-amber-100 h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
                      <h3 className="text-xs font-bold text-gray-800 text-center mb-3">SDG 8: Decent Work</h3>
                      <a 
                        href="https://sdgs.un.org/goals/goal8" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* SDG 10: Reduced Inequalities */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative w-full aspect-square transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  {/* Front Side */}
                  <div className="absolute w-full h-full backface-hidden">
                    <div className="glass p-4 rounded-2xl border-2 border-orange-100 h-full flex flex-col">
                      <div className="flex-1 rounded-xl overflow-hidden mb-3 flex items-center justify-center">
                        <img 
                          src="/sdgs/Sustainable_Development_Goal_10ReducedInequalities.svg.png" 
                          alt="SDG 10: Reduced Inequalities" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="text-xs font-bold text-gray-800 text-center">Reduced Inequalities</h3>
                    </div>
                  </div>
                  {/* Back Side */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="glass p-4 rounded-2xl border-2 border-orange-100 h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
                      <h3 className="text-xs font-bold text-gray-800 text-center mb-3">SDG 10: Reduced Inequalities</h3>
                      <a 
                        href="https://sdgs.un.org/goals/goal10" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* SDG 11: Sustainable Communities */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative w-full aspect-square transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  {/* Front Side */}
                  <div className="absolute w-full h-full backface-hidden">
                    <div className="glass p-4 rounded-2xl border-2 border-amber-100 h-full flex flex-col">
                      <div className="flex-1 rounded-xl overflow-hidden mb-3 flex items-center justify-center">
                        <img 
                          src="/sdgs/Sustainable_Development_Goal_11SustainableCities.svg.png" 
                          alt="SDG 11: Sustainable Cities and Communities" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="text-xs font-bold text-gray-800 text-center">Sustainable Communities</h3>
                    </div>
                  </div>
                  {/* Back Side */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="glass p-4 rounded-2xl border-2 border-amber-100 h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
                      <h3 className="text-xs font-bold text-gray-800 text-center mb-3">SDG 11: Sustainable Cities</h3>
                      <a 
                        href="https://sdgs.un.org/goals/goal11" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* SDG 16: Peace and Justice */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative w-full aspect-square transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  {/* Front Side */}
                  <div className="absolute w-full h-full backface-hidden">
                    <div className="glass p-4 rounded-2xl border-2 border-orange-100 h-full flex flex-col">
                      <div className="flex-1 rounded-xl overflow-hidden mb-3 flex items-center justify-center">
                        <img 
                          src="/sdgs/Sustainable_Development_Goal_16PeaceJusticeInstitutions.svg.png" 
                          alt="SDG 16: Peace, Justice and Strong Institutions" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="text-xs font-bold text-gray-800 text-center">Peace & Justice</h3>
                    </div>
                  </div>
                  {/* Back Side */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="glass p-4 rounded-2xl border-2 border-orange-100 h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
                      <h3 className="text-xs font-bold text-gray-800 text-center mb-3">SDG 16: Peace & Justice</h3>
                      <a 
                        href="https://sdgs.un.org/goals/goal16" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* SDG 17: Partnerships */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative w-full aspect-square transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  {/* Front Side */}
                  <div className="absolute w-full h-full backface-hidden">
                    <div className="glass p-4 rounded-2xl border-2 border-amber-100 h-full flex flex-col">
                      <div className="flex-1 rounded-xl overflow-hidden mb-3 flex items-center justify-center">
                        <img 
                          src="/sdgs/Sustainable_Development_Goal_17Partnerships.svg.png" 
                          alt="SDG 17: Partnerships for the Goals" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="text-xs font-bold text-gray-800 text-center">Partnerships</h3>
                    </div>
                  </div>
                  {/* Back Side */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="glass p-4 rounded-2xl border-2 border-amber-100 h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
                      <h3 className="text-xs font-bold text-gray-800 text-center mb-3">SDG 17: Partnerships</h3>
                      <a 
                        href="https://sdgs.un.org/goals/goal17" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SDG Impact Details */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass p-8 rounded-2xl border-2 border-orange-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our SDG Contributions</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>SDG 1 & 2:</strong> Providing shelter, food, and basic necessities to vulnerable populations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>SDG 3:</strong> Healthcare support for HIV/AIDS patients and elderly care</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>SDG 4:</strong> Quality education through our schools and higher education support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>SDG 5:</strong> Empowering women and girls through education and skill development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>SDG 8:</strong> Vocational training for decent work and economic growth</span>
                  </li>
                </ul>
              </div>

              <div className="glass p-8 rounded-2xl border-2 border-amber-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Measurable Impact</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-700">Poverty Alleviation</span>
                      <span className="text-sm font-bold text-orange-600">500+ Families</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-700">Education Access</span>
                      <span className="text-sm font-bold text-orange-600">1,200+ Students</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-700">Skills Training</span>
                      <span className="text-sm font-bold text-orange-600">1,000+ Youth</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full" style={{width: '80%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-700">Healthcare Support</span>
                      <span className="text-sm font-bold text-orange-600">300+ Beneficiaries</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 max-w-3xl mx-auto">
                By supporting Mahima Ministries, you're contributing to a better, more sustainable future for all. 
                Together, we can achieve the UN Sustainable Development Goals and create lasting positive change in communities across Telangana.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Cards */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl text-gray-600">
                Choose how you'd like to support our mission
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Make a Donation */}
              <div className="glass p-8 rounded-3xl border-2 border-orange-200 hover-lift group">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/30">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Make a Donation</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Your generous contribution directly supports our programmes and helps transform lives in communities we serve.
                </p>
                <Link 
                  to="/donate" 
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Donate Now
                  <Heart className="w-5 h-5 ml-2" />
                </Link>
              </div>

              {/* Card 2: Become a Partner */}
              <div className="glass p-8 rounded-3xl border-2 border-amber-200 hover-lift group">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/30">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Become a Partner</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Join hands with us as a corporate or institutional partner to create sustainable impact at scale.
                </p>
                <Link 
                  to="/partnership" 
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Partner With Us
                  <Users className="w-5 h-5 ml-2" />
                </Link>
              </div>

              {/* Card 3: Get Involved */}
              <div className="glass p-8 rounded-3xl border-2 border-orange-200 hover-lift group">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/30">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Get Involved</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Learn more about our programmes, volunteer opportunities, and other ways you can support our cause.
                </p>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Contact Us
                  <Shield className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
