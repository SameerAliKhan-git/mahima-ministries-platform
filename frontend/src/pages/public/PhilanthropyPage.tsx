import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Building, Heart, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PhilanthropyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />
      
      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop"
            alt="Philanthropy & Major Gifts" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-amber-900/85"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Major Giving
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            <span className="text-amber-200">Philanthropy</span> & Major Gifts
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            Partner with us to create lasting impact through strategic philanthropy and transformational giving.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { icon: Building, title: 'Named Programs', desc: 'Create legacy through named initiatives' },
                { icon: Heart, title: 'Endowment Funds', desc: 'Sustainable long-term impact' },
                { icon: Award, title: 'Recognition', desc: 'Honored in our donor hall' }
              ].map((item, idx) => (
                <div key={idx} className="glass p-8 rounded-3xl hover-lift border-2 border-orange-100 text-center">
                  <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="glass p-12 rounded-3xl border-2 border-orange-100 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Interested in Major Giving?</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Our philanthropy team would be honored to discuss how your generous gift can create transformational change.
              </p>
              <Link to="/contact" className="inline-block gradient-sunset text-white px-10 py-4 rounded-2xl font-bold text-lg hover-lift shadow-2xl shadow-orange-500/30">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
