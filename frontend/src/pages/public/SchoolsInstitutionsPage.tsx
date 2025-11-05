import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { GraduationCap, BookOpen, Users, Award } from 'lucide-react';

export default function SchoolsInstitutionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />

      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2064&auto=format&fit=crop"
            alt="HG Schools & Institutions" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-amber-900/85"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Education Excellence
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            HG Schools & Institutions
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            Providing quality education to underprivileged children through our network of schools and learning centers.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: GraduationCap, title: '15 Schools', desc: 'Across 8 states' },
                { icon: BookOpen, title: '5,000+ Students', desc: 'Enrolled annually' },
                { icon: Users, title: '200+ Teachers', desc: 'Qualified educators' },
                { icon: Award, title: '95% Success Rate', desc: 'In exams' }
              ].map((item, idx) => (
                <div key={idx} className="glass p-8 rounded-3xl hover-lift border-2 border-orange-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-orange-600">{item.title}</div>
                      <div className="text-gray-600">{item.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
