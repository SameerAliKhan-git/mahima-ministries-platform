import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { GraduationCap, Home, Utensils, BookOpen, Heart, Users, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HigherEducationSupportPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />
      
      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
            alt="Higher Education Support Programme" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-amber-900/85"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Empowering Through Education
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            <span className="text-amber-200">Higher Education</span> Support Programme
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            Supporting talented youth from vulnerable backgrounds to pursue higher education through comprehensive care and financial assistance.
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">How We Support Higher Education</h2>
              <p className="text-xl text-gray-600">
                We don't run high schools, but we empower youth to reach their full potential
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Our Approach */}
              <div className="glass p-8 rounded-3xl border-2 border-orange-100">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6">
                  <Home className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Shelter & Basic Care</h3>
                <p className="text-gray-600 leading-relaxed">
                  We provide safe shelter, nutritious food, and a supportive living environment for higher-aged individuals who wish to pursue education. Our residential facilities ensure students have a stable foundation to focus on their studies.
                </p>
              </div>

              <div className="glass p-8 rounded-3xl border-2 border-amber-100">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Skill Development</h3>
                <p className="text-gray-600 leading-relaxed">
                  Along with academic support, we provide vocational training and skill development programmes aligned with Indian government norms. This equips students with practical skills for self-reliance and employment.
                </p>
              </div>

              <div className="glass p-8 rounded-3xl border-2 border-orange-100">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Education Sponsorship</h3>
                <p className="text-gray-600 leading-relaxed">
                  For students interested in higher education, we facilitate their enrollment in external schools, colleges, and universities. We fundraise specifically for their tuition fees, books, uniforms, and other educational expenses.
                </p>
              </div>

              <div className="glass p-8 rounded-3xl border-2 border-amber-100">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Holistic Welfare</h3>
                <p className="text-gray-600 leading-relaxed">
                  Beyond education, we ensure complete welfare including healthcare, counseling, mentorship, and life skills training. We support students throughout their educational journey until they become self-sufficient.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Cover Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">What We Cover</h2>
              <p className="text-xl text-gray-600">
                Comprehensive support for students pursuing higher education
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-gray-800">Educational Expenses</h3>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">✓</span>
                    <span>College/University tuition fees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">✓</span>
                    <span>School admission fees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">✓</span>
                    <span>Books and study materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">✓</span>
                    <span>Uniforms and stationery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">✓</span>
                    <span>Examination fees</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="font-bold text-gray-800">Living Support</h3>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">✓</span>
                    <span>Safe residential shelter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">✓</span>
                    <span>Nutritious meals (3 times daily)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">✓</span>
                    <span>Clothing and personal care</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">✓</span>
                    <span>Healthcare and medical support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-1">✓</span>
                    <span>Transportation assistance</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-gray-800">Additional Services</h3>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">✓</span>
                    <span>Career counseling and guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">✓</span>
                    <span>Mentorship programmes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">✓</span>
                    <span>Skill development training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">✓</span>
                    <span>English and computer training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">✓</span>
                    <span>Life skills development</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Impact</h2>
              <p className="text-xl text-gray-600">
                Empowering youth to break the cycle of poverty through education
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-extrabold text-orange-600 mb-2">50+</div>
                <div className="text-gray-600 font-medium">Students Supported</div>
                <div className="text-sm text-gray-500 mt-1">In higher education</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-extrabold text-amber-600 mb-2">100%</div>
                <div className="text-gray-600 font-medium">Holistic Care</div>
                <div className="text-sm text-gray-500 mt-1">Shelter, food & education</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-extrabold text-orange-600 mb-2">15+</div>
                <div className="text-gray-600 font-medium">Institutions</div>
                <div className="text-sm text-gray-500 mt-1">Partner schools & colleges</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-extrabold text-amber-600 mb-2">80%</div>
                <div className="text-gray-600 font-medium">Success Rate</div>
                <div className="text-sm text-gray-500 mt-1">Graduation & employment</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Indian Compliance Note */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass p-8 rounded-3xl border-2 border-orange-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Compliance with Indian Norms</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Our Higher Education Support Programme operates in full compliance with:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">✓</span>
                      <span><strong>Juvenile Justice Act:</strong> Adhering to care and protection guidelines for young adults</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">✓</span>
                      <span><strong>Right to Education Act:</strong> Supporting access to quality education for all</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">✓</span>
                      <span><strong>Skill India Mission:</strong> Aligned with national skill development initiatives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">✓</span>
                      <span><strong>Child Welfare Committee Guidelines:</strong> Following protocols for vulnerable youth welfare</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Support */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Support a Student's Education
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Your donation can transform a young person's life by enabling them to pursue higher education
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border-2 border-orange-200">
                <div className="text-3xl font-bold text-orange-600 mb-2">₹25,000</div>
                <div className="text-gray-800 font-semibold mb-2">Yearly Support</div>
                <div className="text-sm text-gray-600">Cover tuition fees for one student for an entire year</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border-2 border-orange-200">
                <div className="text-3xl font-bold text-orange-600 mb-2">₹10,000</div>
                <div className="text-gray-800 font-semibold mb-2">Semester Support</div>
                <div className="text-sm text-gray-600">Help with fees and books for one semester</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border-2 border-orange-200">
                <div className="text-3xl font-bold text-orange-600 mb-2">₹5,000</div>
                <div className="text-gray-800 font-semibold mb-2">Monthly Care</div>
                <div className="text-sm text-gray-600">Provide shelter, food and basic care for one month</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/donate"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Donate Now
              </Link>
              <Link 
                to="/sponsorship"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 font-bold rounded-xl border-2 border-orange-200 hover:bg-orange-50 transition-all duration-300"
              >
                Sponsor a Student
              </Link>
            </div>

            <p className="mt-6 text-sm text-gray-600">
              All donations are eligible for 80G tax exemption. 100% of your donation goes directly to student support.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
