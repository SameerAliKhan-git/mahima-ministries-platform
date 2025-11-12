import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Wrench, Users, Award, TrendingUp } from 'lucide-react';

export default function VocationalTrainingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />
      
      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1581092160607-ee67e34c35d7?q=80&w=2070&auto=format&fit=crop"
            alt="Vocational Training Centre" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-amber-900/85"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Skills for Life
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            <span className="text-amber-200">Vocational Training</span> Centre
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            Empowering youth with practical skills and job training for sustainable livelihoods.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { icon: Wrench, title: 'Technical Skills', desc: 'Carpentry, plumbing, electrical work' },
              { icon: Users, title: '1,000+ Trained', desc: 'Youth empowered annually' },
              { icon: Award, title: 'Certified Programs', desc: 'Industry-recognized certificates' },
              { icon: TrendingUp, title: '85% Placement', desc: 'Job placement rate' }
            ].map((item, idx) => (
              <div key={idx} className="glass p-8 rounded-3xl hover-lift border-2 border-orange-100">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 gradient-emerald rounded-2xl flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{item.title}</div>
                    <div className="text-gray-600">{item.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Connection to Higher Education Support */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="glass p-8 rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Award className="w-6 h-6 mr-3 text-orange-600" />
                Pathways to Higher Education
              </h3>
              <p className="text-gray-600 mb-4">
                Students who complete our vocational training and wish to pursue higher education can join our <a href="/higher-education-support" className="text-orange-600 hover:text-amber-600 font-semibold underline">Higher Education Support Programme</a>.
              </p>
              <p className="text-gray-600">
                Through this initiative, we provide shelter, food, continued skills development, and sponsor external college/university enrollment by fundraising for tuition, fees, books, and overall student welfare.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
