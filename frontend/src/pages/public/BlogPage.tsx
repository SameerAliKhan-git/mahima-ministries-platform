import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BookOpen, Calendar, User, Tag } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />
      
      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2073&auto=format&fit=crop"
            alt="Our Blog" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-amber-900/85"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Stories & Updates
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            Our Blog
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            Read inspiring stories, program updates, and insights from the field.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <article key={item} className="glass rounded-3xl overflow-hidden hover-lift border-2 border-orange-100">
                <div className="h-48 bg-gradient-to-br from-orange-400 to-amber-500"></div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Nov {item}, 2025</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Transforming Lives Through Education
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Learn how our education programs are empowering children to break the cycle of poverty...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-2" />
                      <span>By Staff Writer</span>
                    </div>
                    <button className="text-orange-600 font-semibold hover:text-orange-700">
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
