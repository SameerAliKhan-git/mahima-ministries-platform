import { MapPin, Phone, Mail } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function WhereWeWorkPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <Header />

      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1569163139394-de4798aa62b6?q=80&w=2070&auto=format&fit=crop"
            alt="Location Map" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-amber-900/85"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Find Us
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            Location Map
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            Visit us at our head office in Telangana, India
          </p>
        </div>
      </section>

      {/* Map and Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Map Container */}
            <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl border-4 border-orange-200">
              <div className="relative w-full" style={{ height: '500px' }}>
                <iframe
                  title="Head Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2650.043828887272!2d78.31539882500472!3d17.52363516068404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb929a78e90b15%3A0x99908c88209689d4!2sMahima%20Ministries!5e0!3m2!1sen!2sin!4v1758301017824!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  className="border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Address Card */}
              <div className="glass p-6 rounded-2xl border-2 border-orange-100 hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">Head Office</h3>
                <p className="text-gray-600 leading-relaxed">
                  H.No: 2-38/8/2/9/4/1<br />
                  Mahima Ministries<br />
                  NTR Nagar Colony<br />
                  Ameenpur (Mandal)<br />
                  Sangareddy (District)<br />
                  Telangana - 502032<br />
                  INDIA
                </p>
              </div>

              {/* Phone Card */}
              <div className="glass p-6 rounded-2xl border-2 border-orange-100 hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">Phone Numbers</h3>
                <div className="space-y-2">
                  <a href="tel:+919246502264" className="block text-orange-600 hover:text-orange-700 font-medium transition-colors">
                    +91 9246502264
                  </a>
                  <a href="tel:+919246272675" className="block text-orange-600 hover:text-orange-700 font-medium transition-colors">
                    +91 9246272675
                  </a>
                  <a href="tel:04023032675" className="block text-orange-600 hover:text-orange-700 font-medium transition-colors">
                    040-23032675
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="glass p-6 rounded-2xl border-2 border-orange-100 hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">Email Addresses</h3>
                <div className="space-y-2">
                  <a href="mailto:mahimaministriesindia@gmail.com" className="block text-orange-600 hover:text-orange-700 font-medium transition-colors break-all">
                    mahimaministriesindia@gmail.com
                  </a>
                  <a href="mailto:rdmaharaju@gmail.com" className="block text-orange-600 hover:text-orange-700 font-medium transition-colors">
                    rdmaharaju@gmail.com
                  </a>
                </div>
              </div>

            </div>

            {/* Directions CTA */}
            <div className="mt-12 text-center">
              <div className="glass p-8 rounded-2xl border-2 border-orange-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Need Directions?</h3>
                <p className="text-gray-600 mb-6">
                  Click the button below to get directions from your current location
                </p>
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=17.52363516068404,78.31539882500472"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Get Directions
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Branches Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Our Branches
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Mahima Ministries has multiple branches across India, serving communities far and wide
              </p>
            </div>

            {/* Branches Map Container */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-200">
              <div className="relative w-full" style={{ height: '600px' }}>
                <iframe
                  title="Mahima Ministries Branches"
                  src="https://www.google.com/maps/d/u/3/embed?mid=1x7xByMF2oAfOY3AZv98XNPdNaR_yfYo&ehbc=2E312F"
                  width="100%"
                  height="100%"
                  className="border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-8 glass p-6 rounded-2xl border-2 border-amber-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Explore Our Branch Network</h3>
                  <p className="text-gray-600">
                    Click on any marker on the map to view details about each of our branch locations. 
                    Each branch is dedicated to serving local communities with compassion and care.
                  </p>
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
