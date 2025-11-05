import { BookOpen, Heart, Droplet, Home as HomeIcon, Users, Award, GraduationCap } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ProgrammesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-emerald-50">
      <Header />

      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1427751840561-9852520f8ce8?q=80&w=2076&auto=format&fit=crop"
            alt="Our Programmes" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-amber-900/85"></div>
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Our Impact
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            Our Programmes
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            Comprehensive initiatives addressing education, healthcare, water, housing, and community development
          </p>
        </div>
      </section>

      {/* Programmes Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Education */}
              <div className="glass p-8 rounded-2xl hover-lift border-2 border-purple-100">
                <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Education</h3>
                <p className="text-gray-600 mb-4">
                  Building schools, providing scholarships, and ensuring quality education for all children.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• School construction</li>
                  <li>• Teacher training</li>
                  <li>• Scholarship programs</li>
                  <li>• Educational materials</li>
                </ul>
              </div>

              {/* Healthcare */}
              <div className="glass p-8 rounded-2xl hover-lift border-2 border-emerald-100">
                <div className="w-16 h-16 gradient-emerald rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Healthcare</h3>
                <p className="text-gray-600 mb-4">
                  Providing medical care, nutrition programs, and health education to vulnerable communities.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Medical clinics</li>
                  <li>• Vaccination campaigns</li>
                  <li>• Nutrition support</li>
                  <li>• Health education</li>
                </ul>
              </div>

              {/* Clean Water */}
              <div className="glass p-8 rounded-2xl hover-lift border-2 border-orange-100">
                <div className="w-16 h-16 gradient-sunset rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
                  <Droplet className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Clean Water</h3>
                <p className="text-gray-600 mb-4">
                  Installing wells, water purification systems, and sanitation facilities.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Well installation</li>
                  <li>• Water purification</li>
                  <li>• Sanitation systems</li>
                  <li>• Hygiene education</li>
                </ul>
              </div>

              {/* Housing */}
              <div className="glass p-8 rounded-2xl hover-lift border-2 border-purple-100">
                <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
                  <HomeIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Housing</h3>
                <p className="text-gray-600 mb-4">
                  Building safe, dignified homes for families in need of shelter.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Home construction</li>
                  <li>• Repairs & renovations</li>
                  <li>• Emergency shelter</li>
                  <li>• Community housing</li>
                </ul>
              </div>

              {/* Community Development */}
              <div className="glass p-8 rounded-2xl hover-lift border-2 border-emerald-100">
                <div className="w-16 h-16 gradient-emerald rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Community Development</h3>
                <p className="text-gray-600 mb-4">
                  Empowering communities through skills training and economic opportunities.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Vocational training</li>
                  <li>• Microfinance programs</li>
                  <li>• Women's empowerment</li>
                  <li>• Youth programs</li>
                </ul>
              </div>

              {/* Emergency Relief */}
              <div className="glass p-8 rounded-2xl hover-lift border-2 border-orange-100">
                <div className="w-16 h-16 gradient-sunset rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Emergency Relief</h3>
                <p className="text-gray-600 mb-4">
                  Rapid response to natural disasters and humanitarian crises.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Disaster response</li>
                  <li>• Food & water distribution</li>
                  <li>• Temporary shelter</li>
                  <li>• Medical assistance</li>
                </ul>
              </div>

              {/* Higher Education Support */}
              <div className="glass p-8 rounded-2xl hover-lift border-2 border-purple-100 cursor-pointer" onClick={() => window.location.href = '/higher-education-support'}>
                <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Higher Education Support</h3>
                <p className="text-gray-600 mb-4">
                  Providing shelter, food, skills training, and sponsoring external higher education for youth.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Shelter & basic care</li>
                  <li>• Skill development training</li>
                  <li>• Education sponsorship</li>
                  <li>• Holistic welfare support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SDG Alignment Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Aligned with UN Sustainable Development Goals</h2>
            <p className="text-gray-600 mb-8">
              All our programmes contribute to achieving the United Nations' 2030 Agenda for Sustainable Development
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {/* SDG 1 */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative h-20 w-20 transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  <div className="absolute w-full h-full backface-hidden">
                    <img src="/sdgs/Sustainable_Development_Goal_01NoPoverty.svg.png" alt="SDG 1" className="h-20 w-20 rounded-lg shadow-lg" />
                  </div>
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <a href="https://sdgs.un.org/goals/goal1" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-20 w-20 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg shadow-lg border-2 border-orange-200">
                      <span className="text-xs font-bold text-orange-600">Read More</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* SDG 2 */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative h-20 w-20 transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  <div className="absolute w-full h-full backface-hidden">
                    <img src="/sdgs/Sustainable_Development_Goal_02ZeroHunger.svg.png" alt="SDG 2" className="h-20 w-20 rounded-lg shadow-lg" />
                  </div>
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <a href="https://sdgs.un.org/goals/goal2" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-20 w-20 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-lg border-2 border-amber-200">
                      <span className="text-xs font-bold text-amber-600">Read More</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* SDG 3 */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative h-20 w-20 transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  <div className="absolute w-full h-full backface-hidden">
                    <img src="/sdgs/Sustainable_Development_Goal_03GoodHealth.svg.png" alt="SDG 3" className="h-20 w-20 rounded-lg shadow-lg" />
                  </div>
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <a href="https://sdgs.un.org/goals/goal3" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-20 w-20 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg shadow-lg border-2 border-orange-200">
                      <span className="text-xs font-bold text-orange-600">Read More</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* SDG 4 */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative h-20 w-20 transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  <div className="absolute w-full h-full backface-hidden">
                    <img src="/sdgs/Sustainable_Development_Goal_04QualityEducation.svg.png" alt="SDG 4" className="h-20 w-20 rounded-lg shadow-lg" />
                  </div>
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <a href="https://sdgs.un.org/goals/goal4" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-20 w-20 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-lg border-2 border-amber-200">
                      <span className="text-xs font-bold text-amber-600">Read More</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* SDG 5 */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative h-20 w-20 transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  <div className="absolute w-full h-full backface-hidden">
                    <img src="/sdgs/Sustainable_Development_Goal_05GenderEquality.svg.png" alt="SDG 5" className="h-20 w-20 rounded-lg shadow-lg" />
                  </div>
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <a href="https://sdgs.un.org/goals/goal5" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-20 w-20 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg shadow-lg border-2 border-orange-200">
                      <span className="text-xs font-bold text-orange-600">Read More</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* SDG 8 */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative h-20 w-20 transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  <div className="absolute w-full h-full backface-hidden">
                    <img src="/sdgs/Sustainable_Development_Goal_08DecentWork.svg.png" alt="SDG 8" className="h-20 w-20 rounded-lg shadow-lg" />
                  </div>
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <a href="https://sdgs.un.org/goals/goal8" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-20 w-20 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-lg border-2 border-amber-200">
                      <span className="text-xs font-bold text-amber-600">Read More</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* SDG 10 */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative h-20 w-20 transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  <div className="absolute w-full h-full backface-hidden">
                    <img src="/sdgs/Sustainable_Development_Goal_10ReducedInequalities.svg.png" alt="SDG 10" className="h-20 w-20 rounded-lg shadow-lg" />
                  </div>
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <a href="https://sdgs.un.org/goals/goal10" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-20 w-20 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg shadow-lg border-2 border-orange-200">
                      <span className="text-xs font-bold text-orange-600">Read More</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* SDG 11 */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative h-20 w-20 transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  <div className="absolute w-full h-full backface-hidden">
                    <img src="/sdgs/Sustainable_Development_Goal_11SustainableCities.svg.png" alt="SDG 11" className="h-20 w-20 rounded-lg shadow-lg" />
                  </div>
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <a href="https://sdgs.un.org/goals/goal11" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-20 w-20 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-lg border-2 border-amber-200">
                      <span className="text-xs font-bold text-amber-600">Read More</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* SDG 16 */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative h-20 w-20 transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  <div className="absolute w-full h-full backface-hidden">
                    <img src="/sdgs/Sustainable_Development_Goal_16PeaceJusticeInstitutions.svg.png" alt="SDG 16" className="h-20 w-20 rounded-lg shadow-lg" />
                  </div>
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <a href="https://sdgs.un.org/goals/goal16" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-20 w-20 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg shadow-lg border-2 border-orange-200">
                      <span className="text-xs font-bold text-orange-600">Read More</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* SDG 17 */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative h-20 w-20 transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  <div className="absolute w-full h-full backface-hidden">
                    <img src="/sdgs/Sustainable_Development_Goal_17Partnerships.svg.png" alt="SDG 17" className="h-20 w-20 rounded-lg shadow-lg" />
                  </div>
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <a href="https://sdgs.un.org/goals/goal17" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-20 w-20 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-lg border-2 border-amber-200">
                      <span className="text-xs font-bold text-amber-600">Read More</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
