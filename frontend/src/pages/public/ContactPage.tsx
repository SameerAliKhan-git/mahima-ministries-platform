import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PhoneInput from '@/components/common/PhoneInput';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    fullPhone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.fullPhone,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        
        // Show dialog box
        alert('✅ Message Sent Successfully!\n\nThank you for contacting us. We have received your message and will get back to you within 24-48 hours.\n\nYou will receive a confirmation email shortly.');
        
        setFormData({
          name: '',
          email: '',
          phone: '',
          fullPhone: '',
          subject: '',
          message: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        // Handle validation errors with specific messages
        if (data.error?.code === 'VALIDATION_ERROR' && data.error?.details) {
          const errorMessages = data.error.details.map((detail: any) => {
            if (detail.path && detail.path[0] === 'subject') {
              return '• Subject must be at least 5 characters';
            }
            if (detail.path && detail.path[0] === 'message') {
              return '• Message must be at least 20 characters';
            }
            if (detail.path && detail.path[0] === 'phone') {
              return '• Phone number must be at least 10 digits';
            }
            return detail.message;
          }).join('\n');
          setError('Please fix the following:\n' + errorMessages);
        } else {
          setError(data.error?.message || 'Failed to submit form. Please try again.');
        }
      }
    } catch (err) {
      setError('⚠️ Backend server is not fully configured. Please ensure PostgreSQL database is running. For development, you can: 1) Install PostgreSQL, or 2) Use Docker, or 3) Contact the administrator.');
      console.error('Contact form error:', err);
      console.log('💡 Tip: Check if PostgreSQL is running on localhost:5432');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhoneChange = (value: string, fullNumber: string) => {
    setFormData({
      ...formData,
      phone: value,
      fullPhone: fullNumber
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-emerald-50">
      <Header />

      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074&auto=format&fit=crop"
            alt="Contact Us" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-amber-900/85"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Get In Touch
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-2xl">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-orange-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Info Cards */}
              <div className="space-y-6">
                <div className="glass p-6 rounded-2xl border-2 border-purple-100">
                  <div className="w-12 h-12 gradient-purple rounded-xl flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Email Us</h3>
                  <a href="mailto:mahimaministriesindia@gmail.com" className="text-purple-600 hover:text-purple-800 text-sm mb-1 block transition-colors">
                    mahimaministriesindia@gmail.com
                  </a>
                  <a href="mailto:rdmaharaju@gmail.com" className="text-purple-600 hover:text-purple-800 text-sm block transition-colors">
                    rdmaharaju@gmail.com
                  </a>
                </div>

                <div className="glass p-6 rounded-2xl border-2 border-emerald-100">
                  <div className="w-12 h-12 gradient-emerald rounded-xl flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Call Us</h3>
                  <a href="tel:04023032675" className="text-emerald-600 hover:text-emerald-800 text-sm mb-1 block transition-colors">
                    040-23032675
                  </a>
                  <a href="tel:+919246272675" className="text-emerald-600 hover:text-emerald-800 text-sm mb-1 block transition-colors">
                    +91 9246272675
                  </a>
                  <a href="tel:+919246332264" className="text-emerald-600 hover:text-emerald-800 text-sm mb-1 block transition-colors">
                    +91 9246332264
                  </a>
                  <p className="text-gray-500 text-xs mt-2">Mon-Sat 9am-6pm IST</p>
                </div>

                <div className="glass p-6 rounded-2xl border-2 border-orange-100">
                  <div className="w-12 h-12 gradient-sunset rounded-xl flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Visit Us</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    2-38/8/2/9/4/1, NTR Nagar Colony,<br />
                    Chandanagar, Ameenpur,<br />
                    Sangareddy, Telangana - 502032
                  </p>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=2-38/8/2/9/4/1+NTR+Nagar+Colony+Chandanagar+Ameenpur+Sangareddy+Telangana+502032"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-orange-600 hover:text-orange-800 text-sm font-semibold transition-colors"
                  >
                    View on Map →
                  </a>
                </div>

                {/* WhatsApp Button */}
                <a
                  href="https://wa.me/919246272675?text=Hi%20Mahima%20Ministries%2C%20Mr%20bahadur%20I%20had%20an%20Enquiery%20this%20chat%20is%20Directed%20via%20the%20Website%20of%20yours"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-6 rounded-2xl border-2 border-green-200 hover:border-green-400 transition-all hover-lift block"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">WhatsApp Us</h3>
                  <p className="text-green-600 font-semibold text-sm mb-1">+91 9246272675</p>
                  <p className="text-gray-600 text-sm">Click to chat instantly</p>
                </a>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="glass p-8 md:p-10 rounded-2xl border-2 border-purple-100">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
                  
                  {/* Success Message */}
                  {submitSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="font-semibold text-green-800">Message Sent Successfully!</p>
                        <p className="text-sm text-green-700">We'll get back to you within 24-48 hours.</p>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                      <p className="text-red-800">{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700 font-semibold">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="h-12 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 font-semibold">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="h-12 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                        />
                      </div>
                    </div>

                    {/* Phone Input */}
                    <div>
                      <PhoneInput
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        required
                        label="Phone Number"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-gray-700 font-semibold">
                        Subject <span className="text-xs text-gray-500">(minimum 5 characters)</span>
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="What is this about?"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        minLength={5}
                        className="h-12 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                      />
                      {formData.subject && formData.subject.length < 5 && (
                        <p className="text-xs text-red-500">
                          {5 - formData.subject.length} more character{5 - formData.subject.length !== 1 ? 's' : ''} needed
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-700 font-semibold">
                        Message <span className="text-xs text-gray-500">(minimum 20 characters)</span>
                      </Label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        placeholder="Tell us more..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        minLength={20}
                        className="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                      />
                      {formData.message && formData.message.length < 20 && (
                        <p className="text-xs text-red-500">
                          {20 - formData.message.length} more character{20 - formData.message.length !== 1 ? 's' : ''} needed
                        </p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full h-12 gradient-purple text-white font-semibold hover-lift shadow-lg shadow-purple-500/30 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
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
