import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Play, Image as ImageIcon, MapPin, Users } from 'lucide-react';

export default function VirtualTourPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />

      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
            alt="Virtual Tour" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-amber-900/85"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Explore Our Impact
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            Virtual Tour
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            Take a virtual journey through our projects and see firsthand the lives being transformed.
          </p>
        </div>
      </section>

      {/* Video Tour Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="glass p-8 md:p-12 rounded-3xl border-2 border-orange-100 mb-12">
              <div className="aspect-video bg-gray-800 rounded-2xl flex items-center justify-center mb-6">
                <Play className="w-20 h-20 text-white opacity-80" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Main Campus Tour</h2>
              <p className="text-gray-600 leading-relaxed">
                Experience a guided tour of our main facility in Telangana, India, showcasing our educational programs, healthcare services, and community centers.
              </p>
            </div>

            {/* Project Locations */}
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Explore Our Projects
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="glass rounded-2xl overflow-hidden hover-lift border-2 border-orange-100">
                  <div className="h-48 bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-white opacity-50" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Project Location {item}</h3>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-2 text-orange-600" />
                      <span className="text-sm">Region {item}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      Serving {100 + item * 50} families through education and healthcare programs.
                    </p>
                    <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors font-semibold">
                      View Tour
                    </button>
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
