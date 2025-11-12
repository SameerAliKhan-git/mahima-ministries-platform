import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Newspaper, Video, Image as ImageIcon, FileText } from 'lucide-react';

export default function MediaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />
      
      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop"
            alt="Media Center" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-amber-900/85"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Press & Media
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            <span className="text-amber-200">Media</span> Center
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            Press releases, media kits, and downloadable resources for journalists and partners.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { icon: Newspaper, title: 'Press Releases', desc: 'Latest news and announcements', count: 24 },
              { icon: Video, title: 'Video Library', desc: 'Documentary footage and interviews', count: 18 },
              { icon: ImageIcon, title: 'Photo Gallery', desc: 'High-resolution images for media use', count: 156 },
              { icon: FileText, title: 'Media Kit', desc: 'Logos, fact sheets, and brand guidelines', count: 8 }
            ].map((item, idx) => (
              <div key={idx} className="glass p-8 rounded-3xl hover-lift border-2 border-orange-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-orange-600 font-bold text-lg">{item.count} items</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.desc}</p>
                <button className="text-orange-600 font-semibold hover:text-orange-700">
                  Browse {item.title} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
