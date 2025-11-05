import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ChevronDown, Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navigation = {
    whoWeAre: [
      { name: 'About Us', href: '/about-us' },
      { name: 'Vision Mission & Values', href: '/vision-mission-values' },
      { name: 'Our Governance', href: '/governance' },
      { name: 'Financial Information', href: '/financial-information' },
      { name: 'Child Safeguarding', href: '/child-safeguarding' },
      { name: 'Virtual Tour', href: '/virtual-tour' },
    ],
    ourWork: [
      { name: 'Our Programmes', href: '/programmes' },
      { name: 'Where We Work', href: '/where-we-work' },
      { name: 'Vocational Training Centre', href: '/vocational-training' },
      { name: 'Higher Education Support', href: '/higher-education-support' },
    ],
    waysToGive: [
      { name: 'Make a Donation', href: '/donate' },
      { name: 'Child Sponsorship', href: '/sponsorship' },
      { name: 'Corporate Partnership', href: '/partnership' },
      { name: 'Give in Celebration', href: '/give-celebration' },
      { name: 'Philanthropy', href: '/philanthropy' },
      { name: 'Other Ways to Give', href: '/other-ways-to-give' },
    ],
    resources: [
      { name: 'Annual Report', href: '/annual-report' },
      { name: 'Blog', href: '/blog' },
      { name: 'Media', href: '/media' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Careers', href: '/contact' },
    ],
  };

  return (
    <header className="glass sticky top-0 z-50 backdrop-blur-lg border-b border-purple-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity ml-8">
            <img 
              src="/Years MAhima Logo.png" 
              alt="Mahima Ministries" 
              className="h-20 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Who We Are Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setOpenDropdown('whoWeAre')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-purple-600 font-medium transition-colors rounded-lg hover:bg-purple-50">
                <span>Who We Are</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'whoWeAre' ? 'rotate-180' : ''}`} />
              </button>
              
              {openDropdown === 'whoWeAre' && (
                <div className="absolute top-full left-0 mt-2 w-56 glass rounded-xl shadow-xl border border-purple-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {navigation.whoWeAre.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-2.5 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Our Work Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setOpenDropdown('ourWork')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-purple-600 font-medium transition-colors rounded-lg hover:bg-purple-50">
                <span>Our Work</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'ourWork' ? 'rotate-180' : ''}`} />
              </button>
              
              {openDropdown === 'ourWork' && (
                <div className="absolute top-full left-0 mt-2 w-56 glass rounded-xl shadow-xl border border-purple-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {navigation.ourWork.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-2.5 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Ways to Give Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setOpenDropdown('waysToGive')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-purple-600 font-medium transition-colors rounded-lg hover:bg-purple-50">
                <span>Ways to Give</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'waysToGive' ? 'rotate-180' : ''}`} />
              </button>
              
              {openDropdown === 'waysToGive' && (
                <div className="absolute top-full left-0 mt-2 w-56 glass rounded-xl shadow-xl border border-purple-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {navigation.waysToGive.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-2.5 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setOpenDropdown('resources')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-purple-600 font-medium transition-colors rounded-lg hover:bg-purple-50">
                <span>Resources</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>
              
              {openDropdown === 'resources' && (
                <div className="absolute top-full left-0 mt-2 w-56 glass rounded-xl shadow-xl border border-purple-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {navigation.resources.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-2.5 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Link */}
            <Link 
              to="/contact" 
              className="px-4 py-2 text-gray-700 hover:text-purple-600 font-medium transition-colors rounded-lg hover:bg-purple-50"
            >
              Contact
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link 
              to="/login" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors px-4 py-2"
            >
              Login
            </Link>
            <Link 
              to="/donate" 
              className="gradient-sunset text-white px-6 py-2.5 rounded-xl hover-lift font-semibold shadow-lg shadow-orange-500/30"
            >
              Donate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-purple-100">
            {/* Who We Are Mobile */}
            <div className="mb-2">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'whoWeAre' ? null : 'whoWeAre')}
                className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-purple-600 font-semibold transition-colors rounded-lg hover:bg-purple-50"
              >
                <span>Who We Are</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openDropdown === 'whoWeAre' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'whoWeAre' && (
                <div className="mt-1 ml-4 space-y-1">
                  {navigation.whoWeAre.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors rounded-lg"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Our Work Mobile */}
            <div className="mb-2">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'ourWork' ? null : 'ourWork')}
                className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-purple-600 font-semibold transition-colors rounded-lg hover:bg-purple-50"
              >
                <span>Our Work</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openDropdown === 'ourWork' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'ourWork' && (
                <div className="mt-1 ml-4 space-y-1">
                  {navigation.ourWork.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors rounded-lg"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Ways to Give Mobile */}
            <div className="mb-2">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'waysToGive' ? null : 'waysToGive')}
                className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-purple-600 font-semibold transition-colors rounded-lg hover:bg-purple-50"
              >
                <span>Ways to Give</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openDropdown === 'waysToGive' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'waysToGive' && (
                <div className="mt-1 ml-4 space-y-1">
                  {navigation.waysToGive.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors rounded-lg"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Resources Mobile */}
            <div className="mb-2">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'resources' ? null : 'resources')}
                className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-purple-600 font-semibold transition-colors rounded-lg hover:bg-purple-50"
              >
                <span>Resources</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'resources' && (
                <div className="mt-1 ml-4 space-y-1">
                  {navigation.resources.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors rounded-lg"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Mobile */}
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-gray-700 hover:text-purple-600 font-semibold transition-colors rounded-lg hover:bg-purple-50"
            >
              Contact
            </Link>

            {/* Mobile Actions */}
            <div className="mt-4 px-4 space-y-3 pt-4 border-t border-purple-100">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-3 px-4 border-2 border-purple-300 text-purple-600 rounded-xl hover:bg-purple-50 font-semibold transition-all"
              >
                Login
              </Link>
              <Link
                to="/donate"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center gradient-sunset text-white py-3 px-4 rounded-xl font-semibold shadow-lg shadow-orange-500/30"
              >
                Donate Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
