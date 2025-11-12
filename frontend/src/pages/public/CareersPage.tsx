import { Link } from 'react-router-dom';
import { Heart, Users, Lightbulb, Globe, ArrowRight, Mail, Phone, MapPin, Briefcase, CheckCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function CareersPage() {
  const jobListings = [
    {
      id: 1,
      title: 'Program Coordinator',
      department: 'Community Services',
      type: 'Full-time',
      location: 'Chandanagar, Telangana',
      experience: '2-3 years',
      description: 'Coordinate and manage community programs focused on education, healthcare, and elderly care.',
      responsibilities: [
        'Plan and execute community programs',
        'Manage volunteer teams',
        'Track program outcomes and impacts',
        'Liaise with beneficiaries and donors'
      ]
    },
    {
      id: 2,
      title: 'Senior Social Worker',
      department: 'Elderly Care',
      type: 'Full-time',
      location: 'Chandanagar, Telangana',
      experience: '5+ years',
      description: 'Lead elderly care initiatives and provide social support services to our beneficiaries.',
      responsibilities: [
        'Develop elderly care programs',
        'Supervise social work team',
        'Conduct needs assessment',
        'Ensure quality of care delivery'
      ]
    },
    {
      id: 3,
      title: 'Healthcare Administrator',
      department: 'Healthcare',
      type: 'Full-time',
      location: 'Chandanagar, Telangana',
      experience: '3-4 years',
      description: 'Manage healthcare program operations and coordinate with medical professionals.',
      responsibilities: [
        'Manage health camps and clinics',
        'Coordinate with doctors and paramedics',
        'Maintain health records',
        'Plan health awareness campaigns'
      ]
    },
    {
      id: 4,
      title: 'Education Specialist',
      department: 'Education',
      type: 'Full-time',
      location: 'Chandanagar, Telangana',
      experience: '3+ years',
      description: 'Design and implement educational programs for underprivileged children.',
      responsibilities: [
        'Develop curriculum',
        'Train tutors and teachers',
        'Monitor student progress',
        'Organize educational events'
      ]
    },
    {
      id: 5,
      title: 'Fundraising Officer',
      department: 'Development',
      type: 'Full-time',
      location: 'Chandanagar, Telangana',
      experience: '2-3 years',
      description: 'Identify and cultivate donor relationships to support organizational programs.',
      responsibilities: [
        'Develop fundraising strategies',
        'Manage donor relationships',
        'Write grant proposals',
        'Organize fundraising events'
      ]
    },
    {
      id: 6,
      title: 'Volunteer Coordinator',
      department: 'Operations',
      type: 'Part-time',
      location: 'Chandanagar, Telangana',
      experience: '1-2 years',
      description: 'Recruit, train, and manage volunteers across various programs.',
      responsibilities: [
        'Recruit and screen volunteers',
        'Provide volunteer training',
        'Schedule volunteer assignments',
        'Track volunteer hours and impact'
      ]
    }
  ];

  const coreValues = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Compassion',
      description: 'We care deeply for those we serve and treat everyone with respect and dignity.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Teamwork',
      description: 'We collaborate effectively to achieve our shared mission of social impact.'
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovation',
      description: 'We embrace creative solutions to address community challenges.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Impact',
      description: 'We measure success by the positive change we create in people\'s lives.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-6 px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold backdrop-blur-sm">
              ✨ Join Our Movement
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-2xl">
              Join Our <span className="text-amber-200">Mission</span>
            </h1>
            <p className="text-xl md:text-2xl text-orange-50 max-w-3xl mx-auto mb-8 leading-relaxed drop-shadow-lg">
              Be part of a dedicated team making a meaningful difference in the lives of our community. 
              At Mahima Ministries, your work directly impacts thousands of lives.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <p className="text-orange-100 text-sm font-semibold">Impact Areas</p>
                <p className="text-4xl font-bold text-white">4+</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <p className="text-orange-100 text-sm font-semibold">Active Programs</p>
                <p className="text-4xl font-bold text-white">20+</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <p className="text-orange-100 text-sm font-semibold">Beneficiaries Served</p>
                <p className="text-4xl font-bold text-white">5000+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Why Work With Us?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Experience a workplace built on compassion, collaboration, and meaningful impact</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="group p-8 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-orange-50 hover:to-amber-50 transition-all duration-300 border border-transparent hover:border-orange-200 shadow-sm hover:shadow-lg">
                <div className="flex justify-center mb-6 text-orange-600 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{value.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Benefits */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Our Work Culture</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Comprehensive benefits and a supportive environment</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">What We Offer</h3>
              <ul className="space-y-4">
                {[
                  'Competitive salary and benefits package',
                  'Professional development opportunities',
                  'Supportive and inclusive work environment',
                  'Flexible working arrangements',
                  'Health insurance coverage',
                  'Annual leave and holidays',
                  'Opportunity to make real impact',
                  'Continuous learning and training'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <span className="text-gray-700 text-lg group-hover:text-gray-900 transition-colors duration-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-6">Team Environment</h3>
                <p className="mb-8 text-lg text-orange-50 leading-relaxed">
                  We believe in creating a workplace where every team member is valued, heard, and empowered to make decisions that impact our community.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4 text-orange-50">
                    <span className="text-2xl">🤝</span>
                    <div>
                      <p className="font-bold">Collaborative Dynamics</p>
                      <p className="text-sm text-orange-100">Work with dedicated professionals</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 text-orange-50">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <p className="font-bold">Clear Goals</p>
                      <p className="text-sm text-orange-100">Know your impact and contribution</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 text-orange-50">
                    <span className="text-2xl">📈</span>
                    <div>
                      <p className="font-bold">Growth Opportunities</p>
                      <p className="text-sm text-orange-100">Develop your career with us</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 text-orange-50">
                    <span className="text-2xl">❤️</span>
                    <div>
                      <p className="font-bold">Mission-Driven</p>
                      <p className="text-sm text-orange-100">Work that transforms lives</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore current job opportunities and find the role that matches your passion and skills.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {jobListings.map((job) => (
              <div key={job.id} className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-8 border-l-4 border-orange-500 hover:border-orange-600 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-orange-500/0 group-hover:from-orange-50/50 group-hover:to-orange-50/0 transition-all duration-300" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">{job.title}</h3>
                      <p className="text-orange-600 font-semibold mt-1">{job.department}</p>
                    </div>
                    <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-green-50 text-green-700 rounded-full text-sm font-bold border border-green-200">
                      {job.type}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6 text-gray-600">
                    <div className="flex items-center gap-2 hover:text-orange-600 transition-colors duration-300">
                      <MapPin className="w-5 h-5 text-orange-500" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 hover:text-orange-600 transition-colors duration-300">
                      <Briefcase className="w-5 h-5 text-orange-500" />
                      <span>{job.experience} experience</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed">{job.description}</p>

                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <p className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4 text-orange-600" />
                      Key Responsibilities:
                    </p>
                    <ul className="space-y-2">
                      {job.responsibilities.slice(0, 3).map((resp, idx) => (
                        <li key={idx} className="text-gray-600 text-sm flex items-start gap-3 hover:text-gray-900 transition-colors duration-300">
                          <span className="text-orange-600 font-bold mt-0.5">→</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-bold transition-all duration-300 hover:gap-3"
                  >
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Application Process</h2>
            <p className="text-lg text-gray-600">Four simple steps to join our team</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Submit Application', desc: 'Send your resume and cover letter through our contact form', icon: '📝' },
              { step: '2', title: 'Initial Review', desc: 'We review your qualifications and experience', icon: '🔍' },
              { step: '3', title: 'Interview', desc: 'Meet with our team and discuss the role', icon: '🤝' },
              { step: '4', title: 'Offer & Onboarding', desc: 'Join our mission and start making an impact', icon: '🎉' }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300" />
                <div className="relative bg-white rounded-lg p-6 space-y-4 hover:bg-orange-50 transition-colors duration-300">
                  <div className="text-4xl text-center">{item.icon}</div>
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 text-center">{item.title}</h3>
                  <p className="text-gray-600 text-sm text-center leading-relaxed">{item.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-12 -right-10 w-20 h-1 bg-gradient-to-r from-orange-300 to-orange-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight drop-shadow-lg">Ready to Make an Impact?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-95 leading-relaxed drop-shadow">
            Join our team and be part of a mission that transforms lives. Apply now or get in touch with any questions.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-orange-600 px-10 py-4 rounded-xl font-bold hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              <Briefcase className="w-5 h-5" />
              Apply Now <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="mailto:mahimaministriesindia@gmail.com"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-10 py-4 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 backdrop-blur-sm hover:scale-105 transform"
            >
              <Mail className="w-5 h-5" />
              Email HR
            </a>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-lg">
              <Phone className="w-10 h-10 text-orange-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Call Us</h3>
              <p className="text-gray-600">040-65553348</p>
              <p className="text-gray-600">9246272675</p>
            </div>
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-lg">
              <Mail className="w-10 h-10 text-orange-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Email Us</h3>
              <p className="text-gray-600 break-all">mahimaministriesindia@gmail.com</p>
            </div>
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-lg">
              <MapPin className="w-10 h-10 text-orange-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Visit Us</h3>
              <p className="text-gray-600 text-sm">2-38/8/2/9/4/1, NTR Nagar Colony, Chandanagar, Telangana</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
