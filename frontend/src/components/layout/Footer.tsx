import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

// Custom X (Twitter) Logo Component
const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Custom WhatsApp Logo Component
const WhatsAppLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative mt-auto bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600">
      {/* Main Footer Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
            
            {/* Column 1: WHO WE ARE - Matches Header */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-extrabold text-white mb-4 pb-2 uppercase tracking-wider border-b-2 border-white/30">WHO WE ARE</h3>
              <ul className="space-y-2">
                <li><Link to="/about-us" className="group text-white/90 hover:text-white transition-all duration-300 text-sm inline-flex items-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">→</span><span className="group-hover:translate-x-1 transition-transform duration-300">About Us</span></Link></li>
                <li><Link to="/vision-mission-values" className="group text-white/90 hover:text-white transition-all duration-300 text-sm inline-flex items-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">→</span><span className="group-hover:translate-x-1 transition-transform duration-300">Vision Mission & Values</span></Link></li>
                <li><Link to="/governance" className="group text-white/90 hover:text-white transition-all duration-300 text-sm inline-flex items-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">→</span><span className="group-hover:translate-x-1 transition-transform duration-300">Our Governance</span></Link></li>
                <li><Link to="/financial-information" className="group text-white/90 hover:text-white transition-all duration-300 text-sm inline-flex items-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">→</span><span className="group-hover:translate-x-1 transition-transform duration-300">Financial Information</span></Link></li>
                <li><Link to="/child-safeguarding" className="group text-white/90 hover:text-white transition-all duration-300 text-sm inline-flex items-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">→</span><span className="group-hover:translate-x-1 transition-transform duration-300">Child Safeguarding</span></Link></li>
                <li><Link to="/virtual-tour" className="group text-white/90 hover:text-white transition-all duration-300 text-sm inline-flex items-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">→</span><span className="group-hover:translate-x-1 transition-transform duration-300">Virtual Tour</span></Link></li>
              </ul>
            </div>

            {/* Column 2: OUR WORK - Matches Header */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-extrabold text-white mb-4 pb-2 uppercase tracking-wider border-b-2 border-white/30">OUR WORK</h3>
              <ul className="space-y-2">
                <li><Link to="/programmes" className="group text-white/90 hover:text-white transition-all duration-300 text-sm inline-flex items-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">→</span><span className="group-hover:translate-x-1 transition-transform duration-300">Our Programmes</span></Link></li>
                <li><Link to="/where-we-work" className="group text-white/90 hover:text-white transition-all duration-300 text-sm inline-flex items-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">→</span><span className="group-hover:translate-x-1 transition-transform duration-300">Where We Work</span></Link></li>
                <li><Link to="/vocational-training" className="group text-white/90 hover:text-white transition-all duration-300 text-sm inline-flex items-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">→</span><span className="group-hover:translate-x-1 transition-transform duration-300">Vocational Training Centre</span></Link></li>
                <li><Link to="/higher-education-support" className="group text-white/90 hover:text-white transition-all duration-300 text-sm inline-flex items-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">→</span><span className="group-hover:translate-x-1 transition-transform duration-300">Higher Education Support</span></Link></li>
              </ul>
            </div>

            {/* Column 3: WAYS TO GIVE - Matches Header */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-extrabold text-white mb-4 pb-2 uppercase tracking-wider border-b-2 border-white/30">WAYS TO GIVE</h3>
              <ul className="space-y-2">
                <li><Link to="/donate" className="group text-white/90 hover:text-white transition-all duration-300 text-sm inline-flex items-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">→</span><span className="group-hover:translate-x-1 transition-transform duration-300">Make a Donation</span></Link></li>
                <li><Link to="/sponsorship" className="group text-white/90 hover:text-white transition-all duration-300 text-sm inline-flex items-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">→</span><span className="group-hover:translate-x-1 transition-transform duration-300">Child Sponsorship</span></Link></li>
                <li><Link to="/partnership" className="group text-white/90 hover:text-white transition-all duration-300 text-sm inline-flex items-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">→</span><span className="group-hover:translate-x-1 transition-transform duration-300">Corporate Partnership</span></Link></li>
                <li><Link to="/give-celebration" className="group text-white/90 hover:text-white transition-all duration-300 text-sm inline-flex items-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">→</span><span className="group-hover:translate-x-1 transition-transform duration-300">Give in Celebration</span></Link></li>
                <li><Link to="/philanthropy" className="group text-white/90 hover:text-white transition-all duration-300 text-sm inline-flex items-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">→</span><span className="group-hover:translate-x-1 transition-transform duration-300">Philanthropy</span></Link></li>
                <li><Link to="/other-ways-to-give" className="group text-white/90 hover:text-white transition-all duration-300 text-sm inline-flex items-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">→</span><span className="group-hover:translate-x-1 transition-transform duration-300">Other Ways to Give</span></Link></li>
              </ul>
            </div>

            {/* Column 4: RESOURCES - Matches Header + Additional Links */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-extrabold text-white mb-4 pb-2 uppercase tracking-wider border-b-2 border-white/30">RESOURCES</h3>
              <ul className="space-y-2">
                <li><Link to="/annual-report" className="group text-white/90 hover:text-white transition-all duration-300 text-sm inline-flex items-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">→</span><span className="group-hover:translate-x-1 transition-transform duration-300">Annual Report</span></Link></li>
                <li><Link to="/blog" className="group text-white/90 hover:text-white transition-all duration-300 text-sm inline-flex items-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">→</span><span className="group-hover:translate-x-1 transition-transform duration-300">Blog</span></Link></li>
                <li><Link to="/media" className="group text-white/90 hover:text-white transition-all duration-300 text-sm inline-flex items-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">→</span><span className="group-hover:translate-x-1 transition-transform duration-300">Media</span></Link></li>
                <li><Link to="/faqs" className="group text-white/90 hover:text-white transition-all duration-300 text-sm inline-flex items-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">→</span><span className="group-hover:translate-x-1 transition-transform duration-300">FAQs</span></Link></li>
                <li><Link to="/contact" className="group text-white/90 hover:text-white transition-all duration-300 text-sm inline-flex items-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">→</span><span className="group-hover:translate-x-1 transition-transform duration-300">Careers</span></Link></li>
                <li><Link to="/contact" className="group text-white/90 hover:text-white transition-all duration-300 text-sm inline-flex items-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">→</span><span className="group-hover:translate-x-1 transition-transform duration-300">Contact</span></Link></li>
                <li><Link to="/contact" className="group text-white/90 hover:text-white transition-all duration-300 text-sm inline-flex items-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">→</span><span className="group-hover:translate-x-1 transition-transform duration-300">Sitemap</span></Link></li>
                <li><Link to="/donor/dashboard" className="group text-white/90 hover:text-white transition-all duration-300 text-sm inline-flex items-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">→</span><span className="group-hover:translate-x-1 transition-transform duration-300">Donor Portal</span></Link></li>
                <li><Link to="/login" className="group text-white/90 hover:text-white transition-all duration-300 text-sm inline-flex items-center"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">→</span><span className="group-hover:translate-x-1 transition-transform duration-300">Login</span></Link></li>
              </ul>
            </div>

            {/* Column 5: MAHIMA MINISTRIES INDIA */}
            <div className="lg:col-span-4">
              <h3 className="text-sm font-extrabold text-white mb-4 pb-2 uppercase tracking-wider border-b-2 border-white/30">MAHIMA MINISTRIES</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                  <p className="text-white/90 text-sm leading-relaxed">
                    2-38/8/2/9/4/1, NTR Nagar Colony<br />
                    Sridevi Theatre Road, Chandanagar<br />
                    Ameenpur Mdl, Sangareddy<br />
                    Telangana - 502032, INDIA
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-white flex-shrink-0" />
                  <Link to="/where-we-work" className="text-white/90 hover:text-white transition-colors text-sm">Location Map</Link>
                </div>
                <div className="flex items-start space-x-2">
                  <Phone className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                  <div className="text-white/90 text-sm">
                    <a href="tel:04023032675" className="hover:text-white transition-colors block">040-23032675</a>
                    <a href="tel:9246272675" className="hover:text-white transition-colors block">9246272675</a>
                    <a href="tel:9246332264" className="hover:text-white transition-colors block">9246332264</a>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Mail className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                  <div className="text-white/90 text-sm">
                    <a href="mailto:mahimaministriesindia@gmail.com" className="hover:text-white transition-colors block whitespace-nowrap">mahimaministriesindia@gmail.com</a>
                    <a href="mailto:rdmaharaju@gmail.com" className="hover:text-white transition-colors block whitespace-nowrap">rdmaharaju@gmail.com</a>
                  </div>
                </div>
                
                {/* Social Media */}
                <div className="mt-6 pt-4 border-t border-white/20">
                  <h4 className="text-xs font-extrabold text-white mb-3 uppercase tracking-wider">CONNECT WITH US</h4>
                  <div className="flex flex-wrap gap-3">
                    <a 
                      href="https://facebook.com/mahimaministries" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group relative w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-blue-600 flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/50"
                      aria-label="Follow us on Facebook"
                    >
                      <Facebook className="w-5 h-5 text-white transition-all duration-300 group-hover:scale-110" />
                    </a>
                    <a 
                      href="https://instagram.com/mahimaministries" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group relative w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/50"
                      aria-label="Follow us on Instagram"
                    >
                      <Instagram className="w-5 h-5 text-white transition-all duration-300 group-hover:scale-110" />
                    </a>
                    <a 
                      href="https://x.com/mahimaministries" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group relative w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-black flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-900/50"
                      aria-label="Follow us on X"
                    >
                      <XLogo className="w-4 h-4 text-white transition-all duration-300 group-hover:scale-110" />
                    </a>
                    <a 
                      href="https://linkedin.com/company/mahimaministries" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group relative w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-blue-700 flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-700/50"
                      aria-label="Connect on LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-white transition-all duration-300 group-hover:scale-110" />
                    </a>
                    <a 
                      href="https://wa.me/919246272675" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group relative w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-green-500 flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/50"
                      aria-label="Chat on WhatsApp"
                    >
                      <WhatsAppLogo className="w-5 h-5 text-white transition-all duration-300 group-hover:scale-110" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indian NGO Compliance Section */}
      <div className="bg-black/10 py-6 border-t border-white/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 text-white/90 text-xs">
            {/* Registration Details */}
            <div>
              <h4 className="font-bold text-white mb-2 uppercase tracking-wider">Registration Details</h4>
              <p className="leading-relaxed">
                <strong>Registration No:</strong> [To be updated]<br />
                <strong>PAN:</strong> [To be updated]<br />
                <strong>TAN:</strong> [To be updated]<br />
                <strong>CSR Registration:</strong> [If applicable]
              </p>
            </div>

            {/* Tax Exemption */}
            <div>
              <h4 className="font-bold text-white mb-2 uppercase tracking-wider">Tax Exemption</h4>
              <p className="leading-relaxed">
                <strong>80G Certificate:</strong> Available<br />
                <strong>12A Registration:</strong> [To be updated]<br />
                <strong>FCRA Registration:</strong> [If applicable]<br />
                <strong>Donations above ₹2,000:</strong> PAN required
              </p>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-bold text-white mb-2 uppercase tracking-wider">Legal & Compliance</h4>
              <ul className="space-y-1">
                <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/refund-policy" className="hover:text-white transition-colors">Refund & Cancellation Policy</Link></li>
                <li><Link to="/grievance-redressal" className="hover:text-white transition-colors">Grievance Redressal</Link></li>
                <li><Link to="/annual-report" className="hover:text-white transition-colors">Annual Reports & Financials</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-black/20 py-4 border-t border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-white text-xs">
            <p className="font-medium">
              © {new Date().getFullYear()} Mahima Ministries. All Rights Reserved. | Registered under Indian Trust Act
            </p>
            <p className="text-white/80">
              Donations are exempt under Section 80G of Income Tax Act, 1961
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
