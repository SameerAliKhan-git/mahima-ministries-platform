import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Shield, Heart, Users, Lock, Eye, AlertTriangle } from 'lucide-react';

export default function ChildSafeguardingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />

      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=2086&auto=format&fit=crop"
            alt="Child Safeguarding" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-amber-900/85"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Our Commitment
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            Child Safeguarding
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            The safety and well-being of children is our highest priority. We maintain the strictest standards of child protection.
          </p>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Our Core Principles
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg max-w-3xl mx-auto">
              Every child has the right to protection from all forms of abuse, exploitation, and neglect.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="glass p-8 rounded-3xl hover-lift border-2 border-orange-100">
                <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Zero Tolerance</h3>
                <p className="text-gray-600 leading-relaxed">
                  We have a zero-tolerance policy for any form of child abuse or exploitation. All allegations are taken seriously and investigated thoroughly.
                </p>
              </div>

              <div className="glass p-8 rounded-3xl hover-lift border-2 border-amber-100">
                <div className="w-16 h-16 gradient-emerald rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Rigorous Screening</h3>
                <p className="text-gray-600 leading-relaxed">
                  All staff, volunteers, and partners undergo comprehensive background checks and safeguarding training before working with children.
                </p>
              </div>

              <div className="glass p-8 rounded-3xl hover-lift border-2 border-orange-100">
                <div className="w-16 h-16 gradient-sunset rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Continuous Monitoring</h3>
                <p className="text-gray-600 leading-relaxed">
                  Regular audits, site visits, and feedback mechanisms ensure ongoing compliance with our safeguarding standards.
                </p>
              </div>
            </div>

            {/* Policy Sections */}
            <div className="space-y-6">
              <div className="glass p-8 rounded-3xl border-2 border-orange-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <AlertTriangle className="w-6 h-6 text-orange-600 mr-3" />
                  Reporting Concerns
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have concerns about a child's safety or suspect any form of abuse, please report it immediately. All reports are treated confidentially and with the utmost seriousness.
                </p>
                <div className="bg-orange-50 p-4 rounded-xl">
                  <p className="font-semibold text-gray-800">24/7 Safeguarding Hotline:</p>
                  <p className="text-orange-600 text-lg font-bold">011 4323 9200</p>
                  <p className="text-gray-600 mt-2">Email: safeguarding@mahimaministries.org</p>
                </div>
              </div>

              <div className="glass p-8 rounded-3xl border-2 border-amber-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <Users className="w-6 h-6 text-amber-600 mr-3" />
                  Staff Training & Code of Conduct
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">✓</span>
                    <span>Mandatory safeguarding training for all staff and volunteers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">✓</span>
                    <span>Clear code of conduct and professional boundaries</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">✓</span>
                    <span>Regular refresher courses and policy updates</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">✓</span>
                    <span>Safe recruitment practices including reference checks</span>
                  </li>
                </ul>
              </div>

              <div className="glass p-8 rounded-3xl border-2 border-orange-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <Heart className="w-6 h-6 text-orange-600 mr-3" />
                  Child Participation & Rights
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Children have the right to be heard and participate in decisions affecting them. We create safe spaces for children to express their views, concerns, and experiences. Our programs empower children with knowledge of their rights and how to protect themselves.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
