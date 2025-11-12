import { Heart, Target, Users, Award, GraduationCap } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />

      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070&auto=format&fit=crop"
            alt="About Mahima Ministries" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-amber-900/85"></div>
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Who We Are
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            <span className="text-amber-200">About</span> Mahima Ministries
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            Caring for and touching the lives of people who are in distress since 2005
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass p-8 md:p-12 rounded-3xl border-2 border-orange-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">About Us</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Mahima Ministries is a non-government organization working at the grass roots level by caring for and touching the lives of people who are in distress.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  <strong>Our main focus is serving the following groups:</strong>
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li>Orphans & abandoned, SC/ST & BPL children</li>
                  <li>Mentally ill and destitute elderly adults</li>
                  <li>HIV/AIDS patients without anyone to care for them</li>
                  <li>Community care and development</li>
                </ul>
                <p className="text-gray-600 leading-relaxed">
                  We are committed to care irrespective of religion, caste, creed or ethnicity, by providing them counseling, food, shelter, clothing, education and medical treatment with a holistic approach. Our community work focuses on providing good drinking water and awareness seminars in rural areas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Our History
            </h2>
            <div className="space-y-6">
              <div className="glass p-6 rounded-2xl border-2 border-orange-100">
                <h3 className="text-2xl font-bold text-orange-600 mb-3">The Beginning - 2005</h3>
                <p className="text-gray-600 leading-relaxed">
                  In the year 2005, an old lady by name Mallamma was in need of shelter. People in the neighbourhood were wondering where to place this lady. Mr. Maharaju responded to the call and opened his house for her stay. This act of benevolence laid the foundation for the future work. Slowly Subdramma along with Sruthi were added.
                </p>
              </div>

              <div className="glass p-6 rounded-2xl border-2 border-amber-100">
                <h3 className="text-2xl font-bold text-amber-600 mb-3">Divine Calling</h3>
                <p className="text-gray-600 leading-relaxed">
                  During this time, Maharaju got a divine prompt for the work that was just initiated as <strong>"Mahima Ministries"</strong>, with main focus of the work "to look after orphans and widows in their distress". Mahima in Indian languages means "Glory".
                </p>
              </div>

              <div className="glass p-6 rounded-2xl border-2 border-orange-100">
                <h3 className="text-2xl font-bold text-orange-600 mb-3">Growth & Expansion</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The number started increasing day by day with old aged people, HIV-infected and affected, orphans and semi-orphans. As the number grew up to 70, they took a rented house in Arjun Reddy Colony. All this while Mr. Maharaju was using up his salary for the sake of the work, with the support of his friends and well-wishers.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  In the year 2009, there was no money to pay the rent and as they had to vacate the rented premises, finding nowhere to go they approached Mr. Pandurangareddy MPTC. He, understanding the situation, told that he couldn't help financially but gave permission to set up a tin sheet shed in the present Ameenpur camps area in 2009.
                </p>
              </div>

              <div className="glass p-6 rounded-2xl border-2 border-amber-100">
                <h3 className="text-2xl font-bold text-amber-600 mb-3">Expansion - 2009-2011</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  During that time, an acre of land was given to Maharaju at Vikarabad. The old age, destitute and HIV infected and affected people moved to that place. With the support of IVY Compt Tech (an MNC), a proper building was constructed at Kothagadi, Vikarabad.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  In 2011, another acre of land was added to Mahima Ministries at Sidloor, Vikarabad, which was developed into a Community Center and a CCI (Child Care Institution).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Our Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass p-6 rounded-2xl border-2 border-orange-100 hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Upper Primary School</h3>
                <p className="text-gray-600 text-sm">Ameenpur, Hyderabad</p>
              </div>

              <div className="glass p-6 rounded-2xl border-2 border-amber-100 hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Destitute and Elderly Care Home</h3>
                <p className="text-gray-600 text-sm">Ameenpur, Hyderabad</p>
              </div>

              <div className="glass p-6 rounded-2xl border-2 border-orange-100 hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Skill Development Center</h3>
                <p className="text-gray-600 text-sm">Ameenpur, Hyderabad</p>
              </div>

              <div className="glass p-6 rounded-2xl border-2 border-amber-100 hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Community Center</h3>
                <p className="text-gray-600 text-sm">Sidduloor, Vikarabad</p>
              </div>

              <div className="glass p-6 rounded-2xl border-2 border-orange-100 hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Old Age Home</h3>
                <p className="text-gray-600 text-sm">Kompally, Vikarabad</p>
              </div>

              <div className="glass p-6 rounded-2xl border-2 border-amber-100 hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Disabled and Destitute Home</h3>
                <p className="text-gray-600 text-sm">Kompally, Vikarabad</p>
              </div>

              <div className="glass p-6 rounded-2xl border-2 border-orange-100 hover-lift cursor-pointer" onClick={() => window.location.href = '/higher-education-support'}>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Higher Education Support</h3>
                <p className="text-gray-600 text-sm">Shelter, Food, Skills & External Education Sponsorship</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
              What Drives Us
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Our core values guide everything we do</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass p-6 rounded-2xl hover-lift border-2 border-orange-100 text-center">
                <div className="w-14 h-14 gradient-purple rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Compassion</h3>
                <p className="text-gray-600 text-sm">Leading with empathy and understanding</p>
              </div>
              
              <div className="glass p-6 rounded-2xl hover-lift border-2 border-amber-100 text-center">
                <div className="w-14 h-14 gradient-emerald rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/30">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Integrity</h3>
                <p className="text-gray-600 text-sm">Transparent and accountable in all we do</p>
              </div>
              
              <div className="glass p-6 rounded-2xl hover-lift border-2 border-yellow-100 text-center">
                <div className="w-14 h-14 gradient-sunset rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-yellow-500/30">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Community</h3>
                <p className="text-gray-600 text-sm">Building lasting partnerships</p>
              </div>
              
              <div className="glass p-6 rounded-2xl hover-lift border-2 border-orange-100 text-center">
                <div className="w-14 h-14 gradient-purple rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Excellence</h3>
                <p className="text-gray-600 text-sm">Committed to maximum impact</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UN SDGs Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Contributing to UN Sustainable Development Goals
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Our work aligns with the United Nations' 2030 Agenda for Sustainable Development
            </p>
            
            {/* SDG Icons Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
              {/* SDG 1 */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative w-full aspect-square transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  <div className="absolute w-full h-full backface-hidden">
                    <div className="glass p-3 rounded-xl border-2 border-orange-100 h-full flex flex-col">
                      <img src="/sdgs/Sustainable_Development_Goal_01NoPoverty.svg.png" alt="SDG 1: No Poverty" className="w-full rounded-lg mb-2" loading="lazy" />
                      <p className="text-xs text-center font-semibold text-gray-700">No Poverty</p>
                    </div>
                  </div>
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="glass p-3 rounded-xl border-2 border-orange-100 h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
                      <p className="text-xs font-bold text-gray-800 text-center mb-2">SDG 1</p>
                      <a href="https://sdgs.un.org/goals/goal1" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all">Read More</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* SDG 2 */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative w-full aspect-square transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  <div className="absolute w-full h-full backface-hidden">
                    <div className="glass p-3 rounded-xl border-2 border-amber-100 h-full flex flex-col">
                      <img src="/sdgs/Sustainable_Development_Goal_02ZeroHunger.svg.png" alt="SDG 2: Zero Hunger" className="w-full rounded-lg mb-2" loading="lazy" />
                      <p className="text-xs text-center font-semibold text-gray-700">Zero Hunger</p>
                    </div>
                  </div>
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="glass p-3 rounded-xl border-2 border-amber-100 h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
                      <p className="text-xs font-bold text-gray-800 text-center mb-2">SDG 2</p>
                      <a href="https://sdgs.un.org/goals/goal2" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all">Read More</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* SDG 3 */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative w-full aspect-square transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  <div className="absolute w-full h-full backface-hidden">
                    <div className="glass p-3 rounded-xl border-2 border-orange-100 h-full flex flex-col">
                      <img src="/sdgs/Sustainable_Development_Goal_03GoodHealth.svg.png" alt="SDG 3: Good Health" className="w-full rounded-lg mb-2" loading="lazy" />
                      <p className="text-xs text-center font-semibold text-gray-700">Good Health</p>
                    </div>
                  </div>
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="glass p-3 rounded-xl border-2 border-orange-100 h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
                      <p className="text-xs font-bold text-gray-800 text-center mb-2">SDG 3</p>
                      <a href="https://sdgs.un.org/goals/goal3" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all">Read More</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* SDG 4 */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative w-full aspect-square transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  <div className="absolute w-full h-full backface-hidden">
                    <div className="glass p-3 rounded-xl border-2 border-amber-100 h-full flex flex-col">
                      <img src="/sdgs/Sustainable_Development_Goal_04QualityEducation.svg.png" alt="SDG 4: Quality Education" className="w-full rounded-lg mb-2" loading="lazy" />
                      <p className="text-xs text-center font-semibold text-gray-700">Quality Education</p>
                    </div>
                  </div>
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="glass p-3 rounded-xl border-2 border-amber-100 h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
                      <p className="text-xs font-bold text-gray-800 text-center mb-2">SDG 4</p>
                      <a href="https://sdgs.un.org/goals/goal4" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all">Read More</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* SDG 5 */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative w-full aspect-square transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  <div className="absolute w-full h-full backface-hidden">
                    <div className="glass p-3 rounded-xl border-2 border-orange-100 h-full flex flex-col">
                      <img src="/sdgs/Sustainable_Development_Goal_05GenderEquality.svg.png" alt="SDG 5: Gender Equality" className="w-full rounded-lg mb-2" loading="lazy" />
                      <p className="text-xs text-center font-semibold text-gray-700">Gender Equality</p>
                    </div>
                  </div>
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="glass p-3 rounded-xl border-2 border-orange-100 h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
                      <p className="text-xs font-bold text-gray-800 text-center mb-2">SDG 5</p>
                      <a href="https://sdgs.un.org/goals/goal5" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all">Read More</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* SDG 8 */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative w-full aspect-square transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  <div className="absolute w-full h-full backface-hidden">
                    <div className="glass p-3 rounded-xl border-2 border-amber-100 h-full flex flex-col">
                      <img src="/sdgs/Sustainable_Development_Goal_08DecentWork.svg.png" alt="SDG 8: Decent Work" className="w-full rounded-lg mb-2" loading="lazy" />
                      <p className="text-xs text-center font-semibold text-gray-700">Decent Work</p>
                    </div>
                  </div>
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="glass p-3 rounded-xl border-2 border-amber-100 h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
                      <p className="text-xs font-bold text-gray-800 text-center mb-2">SDG 8</p>
                      <a href="https://sdgs.un.org/goals/goal8" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all">Read More</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* SDG 10 */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative w-full aspect-square transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  <div className="absolute w-full h-full backface-hidden">
                    <div className="glass p-3 rounded-xl border-2 border-orange-100 h-full flex flex-col">
                      <img src="/sdgs/Sustainable_Development_Goal_10ReducedInequalities.svg.png" alt="SDG 10: Reduced Inequalities" className="w-full rounded-lg mb-2" loading="lazy" />
                      <p className="text-xs text-center font-semibold text-gray-700">Reduced Inequalities</p>
                    </div>
                  </div>
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="glass p-3 rounded-xl border-2 border-orange-100 h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
                      <p className="text-xs font-bold text-gray-800 text-center mb-2">SDG 10</p>
                      <a href="https://sdgs.un.org/goals/goal10" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all">Read More</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* SDG 11 */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative w-full aspect-square transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  <div className="absolute w-full h-full backface-hidden">
                    <div className="glass p-3 rounded-xl border-2 border-amber-100 h-full flex flex-col">
                      <img src="/sdgs/Sustainable_Development_Goal_11SustainableCities.svg.png" alt="SDG 11: Sustainable Communities" className="w-full rounded-lg mb-2" loading="lazy" />
                      <p className="text-xs text-center font-semibold text-gray-700">Sustainable Communities</p>
                    </div>
                  </div>
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="glass p-3 rounded-xl border-2 border-amber-100 h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
                      <p className="text-xs font-bold text-gray-800 text-center mb-2">SDG 11</p>
                      <a href="https://sdgs.un.org/goals/goal11" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all">Read More</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* SDG 16 */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative w-full aspect-square transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  <div className="absolute w-full h-full backface-hidden">
                    <div className="glass p-3 rounded-xl border-2 border-orange-100 h-full flex flex-col">
                      <img src="/sdgs/Sustainable_Development_Goal_16PeaceJusticeInstitutions.svg.png" alt="SDG 16: Peace & Justice" className="w-full rounded-lg mb-2" loading="lazy" />
                      <p className="text-xs text-center font-semibold text-gray-700">Peace & Justice</p>
                    </div>
                  </div>
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="glass p-3 rounded-xl border-2 border-orange-100 h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
                      <p className="text-xs font-bold text-gray-800 text-center mb-2">SDG 16</p>
                      <a href="https://sdgs.un.org/goals/goal16" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all">Read More</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* SDG 17 */}
              <div className="group perspective" style={{ perspective: '1000px' }}>
                <div className="relative w-full aspect-square transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  <div className="absolute w-full h-full backface-hidden">
                    <div className="glass p-3 rounded-xl border-2 border-amber-100 h-full flex flex-col">
                      <img src="/sdgs/Sustainable_Development_Goal_17Partnerships.svg.png" alt="SDG 17: Partnerships" className="w-full rounded-lg mb-2" loading="lazy" />
                      <p className="text-xs text-center font-semibold text-gray-700">Partnerships</p>
                    </div>
                  </div>
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="glass p-3 rounded-xl border-2 border-amber-100 h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
                      <p className="text-xs font-bold text-gray-800 text-center mb-2">SDG 17</p>
                      <a href="https://sdgs.un.org/goals/goal17" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all">Read More</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-2xl border-2 border-orange-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">How We Contribute</h3>
              <div className="grid md:grid-cols-2 gap-6 text-gray-600">
                <div>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Poverty & Hunger:</strong> Providing shelter, food, and basic necessities to 500+ vulnerable individuals</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Health & Well-being:</strong> Healthcare for HIV/AIDS patients and elderly care programs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Quality Education:</strong> Upper primary school and higher education support for 1,200+ students</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Gender Equality:</strong> Empowering women and girls through education and skills training</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Economic Growth:</strong> Vocational training for 1,000+ youth, enabling decent employment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Reduced Inequalities:</strong> Supporting SC/ST, BPL families, and marginalized communities</span>
                    </li>
                  </ul>
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
