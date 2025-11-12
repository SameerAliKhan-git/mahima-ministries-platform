import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { DollarSign, TrendingUp, Award, FileText } from 'lucide-react';

export default function FinancialInformationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />

      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop"
            alt="Financial Information" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-amber-900/85"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Transparency & Accountability
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            <span className="text-amber-200">Financial</span> Information
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            We believe in complete transparency. See how every donation is used to transform lives.
          </p>
        </div>
      </section>

      {/* Financial Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="glass p-6 rounded-2xl hover-lift border-2 border-orange-100 text-center">
                <div className="w-14 h-14 gradient-purple rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-orange-600 mb-2">₹20 Cr</div>
                <div className="text-gray-600">Total Revenue</div>
              </div>
              <div className="glass p-6 rounded-2xl hover-lift border-2 border-amber-100 text-center">
                <div className="w-14 h-14 gradient-emerald rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-amber-600 mb-2">92%</div>
                <div className="text-gray-600">Program Spending</div>
              </div>
              <div className="glass p-6 rounded-2xl hover-lift border-2 border-orange-100 text-center">
                <div className="w-14 h-14 gradient-sunset rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-orange-600 mb-2">80G</div>
                <div className="text-gray-600">Tax Exemption</div>
              </div>
              <div className="glass p-6 rounded-2xl hover-lift border-2 border-amber-100 text-center">
                <div className="w-14 h-14 gradient-emerald rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-amber-600 mb-2">100%</div>
                <div className="text-gray-600">Transparency</div>
              </div>
            </div>

            <div className="glass p-8 md:p-12 rounded-3xl border-2 border-orange-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Where Your Money Goes</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-700">Program Services</span>
                    <span className="font-bold text-orange-600">92%</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-700">Administrative Costs</span>
                    <span className="font-bold text-amber-600">5%</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-500" style={{ width: '5%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-700">Fundraising</span>
                    <span className="font-bold text-orange-600">3%</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-400 to-amber-400" style={{ width: '3%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 glass p-8 rounded-3xl border-2 border-orange-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Annual Reports & Documents</h2>
              <div className="space-y-4">
                <a href="#" className="flex items-center justify-between p-4 bg-white rounded-xl hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-4">
                    <FileText className="w-8 h-8 text-orange-600" />
                    <div>
                      <div className="font-semibold text-gray-800">Annual Report 2024</div>
                      <div className="text-sm text-gray-600">Financial statements and impact metrics</div>
                    </div>
                  </div>
                  <span className="text-orange-600 font-semibold">Download PDF</span>
                </a>
                <a href="#" className="flex items-center justify-between p-4 bg-white rounded-xl hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-4">
                    <FileText className="w-8 h-8 text-amber-600" />
                    <div>
                      <div className="font-semibold text-gray-800">IRS Form 990 (2024)</div>
                      <div className="text-sm text-gray-600">Tax-exempt organization filing</div>
                    </div>
                  </div>
                  <span className="text-orange-600 font-semibold">Download PDF</span>
                </a>
                <a href="#" className="flex items-center justify-between p-4 bg-white rounded-xl hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-4">
                    <FileText className="w-8 h-8 text-orange-600" />
                    <div>
                      <div className="font-semibold text-gray-800">Audited Financial Statements</div>
                      <div className="text-sm text-gray-600">Independent audit report</div>
                    </div>
                  </div>
                  <span className="text-orange-600 font-semibold">Download PDF</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
