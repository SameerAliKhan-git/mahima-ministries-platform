import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Gift, Heart, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GiveCelebrationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />
      
      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1530099486328-e021101a494a?q=80&w=2047&auto=format&fit=crop"
            alt="Give in Celebration" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-amber-900/85"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Celebrate with Purpose
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            Give in <span className="text-amber-200">Celebration</span>
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            Mark life's special moments by making a difference. Celebrate birthdays, weddings, and milestones with a gift that transforms lives.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
            {[
              { icon: Gift, title: 'Birthday Giving', desc: 'Ask friends to donate instead of gifts' },
              { icon: Heart, title: 'Wedding Registry', desc: 'Create a charitable wedding registry' },
              { icon: Calendar, title: 'Memorial Gifts', desc: 'Honor loved ones with tribute donations' },
              { icon: Users, title: 'Corporate Events', desc: 'Celebrate milestones with impact' }
            ].map((item, idx) => (
              <div key={idx} className="glass p-8 rounded-3xl hover-lift border-2 border-orange-100">
                <div className="w-16 h-16 gradient-sunset rounded-2xl flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/donate" className="inline-block gradient-sunset text-white px-10 py-4 rounded-2xl font-bold text-lg hover-lift shadow-2xl shadow-orange-500/30">
              Start Your Celebration Campaign
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
