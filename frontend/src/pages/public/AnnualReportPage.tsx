import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FileText, Download, Calendar } from 'lucide-react';

export default function AnnualReportPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />
      
      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1554224311-beee4f9866eb?q=80&w=2070&auto=format&fit=crop"
            alt="Annual Reports" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-amber-900/85"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Transparency & Impact
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            <span className="text-amber-200">Annual</span> Reports
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            View our yearly impact reports, financial statements, and program achievements.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {[2024, 2023, 2022, 2021, 2020].map((year) => (
              <div key={year} className="glass p-8 rounded-3xl hover-lift border-2 border-orange-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">Annual Report {year}</h3>
                      <div className="flex items-center text-gray-600 mt-1">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Published: January {year + 1}</span>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 gradient-sunset text-white px-6 py-3 rounded-xl font-semibold hover-lift">
                    <Download className="w-5 h-5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
