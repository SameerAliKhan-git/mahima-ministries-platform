import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Briefcase,
  Users,
  TrendingUp,
  FileText,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Building2,
  Mail,
  Phone,
  Globe,
  Target,
  BarChart3,
  Settings,
} from 'lucide-react';

// API URL for future backend integration
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface PartnerProfile {
  id: string;
  firstName: string;
  lastName: string;
  organizationName?: string;
  email: string;
  phone?: string;
}

interface Partnership {
  id: string;
  organizationName: string;
  partnershipType: string;
  status: string;
  createdAt: string;
  reviewedAt?: string;
}

export default function PartnerDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<PartnerProfile | null>(null);
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user from localStorage
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }

    const userData = JSON.parse(userStr);

    if (userData.role !== 'PARTNER') {
      navigate('/login');
      return;
    }

    // Simulate API call - replace with actual API
    setTimeout(() => {
      setProfile({
        id: userData.id,
        firstName: userData.profile?.firstName || userData.firstName || 'Partner',
        lastName: userData.profile?.lastName || userData.lastName || 'User',
        organizationName: userData.profile?.organizationName || 'My Organization',
        email: userData.email,
        phone: userData.profile?.phone || '+91 98765 43210',
      });

      // Sample partnerships data
      setPartnerships([
        {
          id: '1',
          organizationName: 'Corporate Social Responsibility Initiative',
          partnershipType: 'CORPORATE',
          status: 'APPROVED',
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          reviewedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ]);

      setLoading(false);
    }, 500);
  }, [navigate]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return (
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case 'PENDING':
        return (
          <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'UNDER_REVIEW':
        return (
          <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <Clock className="w-3 h-3 mr-1" />
            Under Review
          </Badge>
        );
      case 'REJECTED':
        return (
          <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 text-lg">Loading partner dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Welcome, {profile?.firstName}!
              </h1>
              <p className="text-gray-600 text-lg">
                Manage your partnerships and collaboration initiatives
              </p>
            </div>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <motion.div variants={itemVariants}>
            <Card className="glass border-2 border-blue-100 hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 gradient-blue opacity-10 rounded-full blur-2xl"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Active Partnerships
                </CardTitle>
                <Briefcase className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="text-3xl font-bold text-blue-600"
                >
                  {partnerships.filter(p => p.status === 'APPROVED').length}
                </motion.div>
                <p className="text-xs text-gray-500 mt-1">
                  Currently active collaborations
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass border-2 border-green-100 hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 gradient-emerald opacity-10 rounded-full blur-2xl"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Impact
                </CardTitle>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="text-3xl font-bold text-green-600"
                >
                  ₹2.5L
                </motion.div>
                <p className="text-xs text-gray-500 mt-1">
                  Contribution to date
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass border-2 border-purple-100 hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 gradient-purple opacity-10 rounded-full blur-2xl"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Beneficiaries Reached
                </CardTitle>
                <Users className="h-5 w-5 text-purple-600" />
              </CardHeader>
              <CardContent className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="text-3xl font-bold text-purple-600"
                >
                  1,240
                </motion.div>
                <p className="text-xs text-gray-500 mt-1">
                  Lives impacted together
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass border-2 border-amber-100 hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 gradient-sunset opacity-10 rounded-full blur-2xl"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Applications
                </CardTitle>
                <FileText className="h-5 w-5 text-amber-600" />
              </CardHeader>
              <CardContent className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="text-3xl font-bold text-amber-600"
                >
                  {partnerships.length}
                </motion.div>
                <p className="text-xs text-gray-500 mt-1">
                  Total submissions
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Profile Information */}
          <Card className="lg:col-span-1 glass border-2 border-blue-100 hover:shadow-xl transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                Organization Profile
              </CardTitle>
              <CardDescription>Your partnership details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <p className="text-sm font-medium text-gray-500">Organization</p>
                <p className="text-base font-semibold text-gray-900 mt-1">
                  {profile?.organizationName}
                </p>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-600">{profile?.email}</p>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-600">{profile?.phone}</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="w-full gradient-blue text-white mt-4 transition-all">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </motion.div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="lg:col-span-2 glass border-2 border-purple-100 hover:shadow-xl transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Quick Actions
              </CardTitle>
              <CardDescription>Manage your partnership activities</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <motion.div variants={itemVariants} whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                  <Button className="w-full h-auto py-4 flex flex-col items-start gradient-blue text-white transition-all">
                    <FileText className="w-6 h-6 mb-2" />
                    <span className="font-semibold">New Application</span>
                    <span className="text-xs opacity-90">Submit a partnership proposal</span>
                  </Button>
                </motion.div>
                <motion.div variants={itemVariants} whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                  <Button className="w-full h-auto py-4 flex flex-col items-start gradient-purple text-white transition-all">
                    <BarChart3 className="w-6 h-6 mb-2" />
                    <span className="font-semibold">View Reports</span>
                    <span className="text-xs opacity-90">Check impact analytics</span>
                  </Button>
                </motion.div>
                <motion.div variants={itemVariants} whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                  <Button className="w-full h-auto py-4 flex flex-col items-start gradient-emerald text-white transition-all">
                    <Calendar className="w-6 h-6 mb-2" />
                    <span className="font-semibold">Events</span>
                    <span className="text-xs opacity-90">Upcoming activities</span>
                  </Button>
                </motion.div>
                <motion.div variants={itemVariants} whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                  <Button className="w-full h-auto py-4 flex flex-col items-start gradient-sunset text-white transition-all">
                    <Globe className="w-6 h-6 mb-2" />
                    <span className="font-semibold">Resources</span>
                    <span className="text-xs opacity-90">Partnership materials</span>
                  </Button>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Partnership Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Card className="glass border-2 border-blue-100 hover:shadow-xl transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                Partnership Applications
              </CardTitle>
              <CardDescription>
                Track your partnership proposals and status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {partnerships.length === 0 ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Partnerships Yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Submit your first partnership application to get started
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="gradient-blue text-white">
                      <FileText className="w-4 h-4 mr-2" />
                      New Application
                    </Button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {partnerships.map((partnership) => (
                    <motion.div
                      key={partnership.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                      className="border-2 border-gray-100 rounded-lg p-4 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {partnership.organizationName}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Type: {partnership.partnershipType}
                          </p>
                        </div>
                        {getStatusBadge(partnership.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Applied: {new Date(partnership.createdAt).toLocaleDateString()}
                        </div>
                        {partnership.reviewedAt && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            Reviewed: {new Date(partnership.reviewedAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 border-blue-200 text-blue-600 hover:bg-blue-50 transition-all"
                        >
                          View Details
                        </Button>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
