import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  Gift,
  BarChart3,
  Settings,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Shield,
  Calendar,
  Eye,
  Edit,
  Trash2,
  FileText,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface DashboardStats {
  totalUsers: number;
  totalDonors: number;
  totalPartners: number;
  totalDonations: number;
  totalAmount: number;
  pendingDonations: number;
  completedDonations: number;
  activeCampaigns: number;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isEmailVerified: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

interface Donation {
  id: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  campaign?: {
    name: string;
  };
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalDonors: 0,
    totalPartners: 0,
    totalDonations: 0,
    totalAmount: 0,
    pendingDonations: 0,
    completedDonations: 0,
    activeCampaigns: 0,
  });
  const [recentDonations, setRecentDonations] = useState<Donation[]>([]);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }

    const userData = JSON.parse(userStr);

    // Check if user is admin
    if (userData.role !== 'ADMIN') {
      // Redirect to appropriate dashboard
      if (userData.role === 'DONOR') {
        navigate('/donor/dashboard');
      } else if (userData.role === 'PARTNER') {
        navigate('/partner/dashboard');
      } else {
        navigate('/login');
      }
      return;
    }

    fetchAdminData();

    // Auto-refresh data every 30 seconds for real-time updates
    const refreshInterval = setInterval(() => {
      fetchAdminData();
    }, 30000);

    // Cleanup interval on unmount
    return () => clearInterval(refreshInterval);
  }, [navigate]);

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      
      // Fetch users count and list
      try {
        const usersResponse = await fetch(`${API_URL}/api/admin/users`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          if (usersData.success && usersData.data) {
            const users = usersData.data;
            setRecentUsers(users.slice(0, 5));
            
            setStats(prev => ({
              ...prev,
              totalUsers: users.length,
              totalDonors: users.filter((u: User) => u.role === 'DONOR').length,
              totalPartners: users.filter((u: User) => u.role === 'PARTNER').length,
            }));
          }
        }
      } catch (err) {
        console.error('Error fetching users:', err);
      }

      // Fetch donations data
      try {
        const donationsResponse = await fetch(`${API_URL}/api/admin/donations`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        
        if (donationsResponse.ok) {
          const donationsData = await donationsResponse.json();
          if (donationsData.success && donationsData.data) {
            const donations = donationsData.data;
            setRecentDonations(donations.slice(0, 10));
            
            const completed = donations.filter((d: Donation) => d.status === 'COMPLETED');
            const pending = donations.filter((d: Donation) => d.status === 'PENDING');
            const totalAmount = completed.reduce((sum: number, d: Donation) => sum + Number(d.amount), 0);
            
            setStats(prev => ({
              ...prev,
              totalDonations: donations.length,
              completedDonations: completed.length,
              pendingDonations: pending.length,
              totalAmount: totalAmount,
            }));
          }
        }
      } catch (err) {
        console.error('Error fetching donations:', err);
      }

      // Set default campaign count (can be fetched from API)
      setStats(prev => ({ ...prev, activeCampaigns: 5 }));

    } catch (error) {
      console.error('Error fetching admin data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case 'COMPLETED':
        return (
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      case 'PENDING':
        return (
          <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white border-0">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'FAILED':
      case 'CANCELLED':
        return (
          <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
            <XCircle className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return (
          <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0">
            <Shield className="w-3 h-3 mr-1" />
            Admin
          </Badge>
        );
      case 'PARTNER':
        return (
          <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
            <Users className="w-3 h-3 mr-1" />
            Partner
          </Badge>
        );
      case 'DONOR':
        return (
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <Gift className="w-3 h-3 mr-1" />
            Donor
          </Badge>
        );
      default:
        return <Badge>{role}</Badge>;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 text-lg">Loading admin dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-white to-amber-50">
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
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                <Shield className="w-10 h-10 inline-block mr-3 text-orange-600" />
                Admin Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                Complete control panel for Mahima Ministries platform
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => navigate('/admin/analytics')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

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
                  Total Users
                </CardTitle>
              <Users className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent className="relative">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className="text-3xl font-bold text-blue-600">
                {stats.totalUsers}
              </motion.div>
              <p className="text-xs text-gray-500 mt-1">
                {stats.totalDonors} donors, {stats.totalPartners} partners
              </p>
            </CardContent>
          </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass border-2 border-green-100 hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 gradient-emerald opacity-10 rounded-full blur-2xl"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Amount
                </CardTitle>
                <DollarSign className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent className="relative">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }} className="text-3xl font-bold text-green-600">
                  {formatCurrency(stats.totalAmount)}
                </motion.div>
                <p className="text-xs text-gray-500 mt-1">
                  From {stats.completedDonations} completed donations
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass border-2 border-purple-100 hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 gradient-purple opacity-10 rounded-full blur-2xl"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Donations
                </CardTitle>
                <Gift className="h-5 w-5 text-purple-600" />
              </CardHeader>
              <CardContent className="relative">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: "spring" }} className="text-3xl font-bold text-purple-600">
                  {stats.totalDonations}
                </motion.div>
                <p className="text-xs text-gray-500 mt-1">
                  {stats.pendingDonations} pending approval
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass border-2 border-amber-100 hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 gradient-sunset opacity-10 rounded-full blur-2xl"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Active Campaigns
                </CardTitle>
                <TrendingUp className="h-5 w-5 text-amber-600" />
              </CardHeader>
              <CardContent className="relative">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }} className="text-3xl font-bold text-amber-600">
                  {stats.activeCampaigns}
                </motion.div>
                <p className="text-xs text-gray-500 mt-1">
                  Currently running campaigns
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Analytics Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-8"
        >
          <Card className="glass border-2 border-purple-100 hover:shadow-xl transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    Analytics Overview
                  </CardTitle>
                  <CardDescription>
                    Real-time platform insights and performance metrics
                  </CardDescription>
                </div>
                <Link to="/admin/analytics">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover-lift">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Full Analytics
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="w-8 h-8 text-blue-600" />
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(stats.totalAmount)}
                  </p>
                  <p className="text-xs text-green-600 mt-1">+12% this month</p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Gift className="w-8 h-8 text-purple-600" />
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Avg Donation</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {stats.totalDonations > 0 
                      ? formatCurrency(stats.totalAmount / stats.totalDonations) 
                      : formatCurrency(0)}
                  </p>
                  <p className="text-xs text-green-600 mt-1">+8% vs last month</p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Users className="w-8 h-8 text-emerald-600" />
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Active Donors</p>
                  <p className="text-2xl font-bold text-emerald-600">{stats.totalDonors}</p>
                  <p className="text-xs text-green-600 mt-1">+15% growth</p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle className="w-8 h-8 text-orange-600" />
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Success Rate</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {stats.totalDonations > 0 
                      ? Math.round((stats.completedDonations / stats.totalDonations) * 100) 
                      : 0}%
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    {stats.completedDonations} of {stats.totalDonations}
                  </p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card className="glass border-2 border-orange-100 mb-8 hover:shadow-xl transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-600" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common administrative tasks and navigation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Link to="/admin/users">
                <Button className="w-full h-auto py-4 flex flex-col items-center gradient-blue text-white hover-lift">
                  <Users className="w-8 h-8 mb-2" />
                  <span className="font-semibold">Manage Users</span>
                  <span className="text-xs opacity-90 mt-1">{stats.totalUsers} users</span>
                </Button>
              </Link>
              <Link to="/admin/donations">
                <Button className="w-full h-auto py-4 flex flex-col items-center gradient-purple text-white hover-lift">
                  <Gift className="w-8 h-8 mb-2" />
                  <span className="font-semibold">Manage Donations</span>
                  <span className="text-xs opacity-90 mt-1">{stats.totalDonations} donations</span>
                </Button>
              </Link>
              <Link to="/admin/reports">
                <Button className="w-full h-auto py-4 flex flex-col items-center gradient-orange text-white hover-lift">
                  <FileText className="w-8 h-8 mb-2" />
                  <span className="font-semibold">Manage Reports</span>
                  <span className="text-xs opacity-90 mt-1">Financial transparency</span>
                </Button>
              </Link>
              <Link to="/admin/analytics">
                <Button className="w-full h-auto py-4 flex flex-col items-center gradient-emerald text-white hover-lift">
                  <BarChart3 className="w-8 h-8 mb-2" />
                  <span className="font-semibold">View Analytics</span>
                  <span className="text-xs opacity-90 mt-1">Detailed insights</span>
                </Button>
              </Link>
              <Button className="w-full h-auto py-4 flex flex-col items-center gradient-sunset text-white hover-lift">
                <Settings className="w-8 h-8 mb-2" />
                <span className="font-semibold">Settings</span>
                <span className="text-xs opacity-90 mt-1">System configuration</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="donations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="donations" className="gap-2">
              <Gift className="w-4 h-4" />
              Recent Donations
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="w-4 h-4" />
              Recent Users
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          {/* Donations Tab */}
          <TabsContent value="donations">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="glass border-2 border-purple-100 hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Gift className="w-5 h-5 text-purple-600" />
                        Recent Donations
                      </CardTitle>
                      <CardDescription className="mt-2">
                        Latest donation transactions from all users
                      </CardDescription>
                    </div>
                    <Link to="/admin/donations">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="gradient-purple text-white">
                          View All Donations
                        </Button>
                      </motion.div>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {recentDonations.length === 0 ? (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
                      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                        <Gift className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No Donations Yet
                      </h3>
                      <p className="text-gray-600">
                        Donation records will appear here once users start contributing
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-semibold">Donor</TableHead>
                            <TableHead className="font-semibold">Amount</TableHead>
                            <TableHead className="font-semibold">Campaign</TableHead>
                            <TableHead className="font-semibold">Status</TableHead>
                            <TableHead className="font-semibold">Date</TableHead>
                            <TableHead className="text-right font-semibold">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentDonations.map((donation, index) => (
                            <motion.tr key={donation.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + index * 0.05 }} className="hover:bg-purple-50/50 transition-colors">
                              <TableCell>
                              <div className="font-medium text-gray-900">
                                {donation.user?.firstName} {donation.user?.lastName}
                              </div>
                              <div className="text-xs text-gray-500">
                                {donation.user?.email}
                              </div>
                            </TableCell>
                            <TableCell className="font-bold text-purple-600">
                              {formatCurrency(donation.amount)}
                            </TableCell>
                            <TableCell>
                              {donation.campaign?.name || 'General Fund'}
                            </TableCell>
                            <TableCell>{getStatusBadge(donation.status)}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                {formatDate(donation.createdAt)}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button variant="ghost" size="sm" className="text-blue-600">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button variant="ghost" size="sm" className="text-green-600">
                                    <Download className="w-4 h-4" />
                                  </Button>
                                </motion.div>
                              </div>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </TableBody>
                    </Table>
                  </motion.div>
                )}
              </CardContent>
            </Card>
            </motion.div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="glass border-2 border-blue-100 hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-600" />
                        Recent Users
                      </CardTitle>
                      <CardDescription className="mt-2">
                        Newly registered users and their account status
                      </CardDescription>
                    </div>
                    <Link to="/admin/users">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="gradient-blue text-white">
                          Manage All Users
                        </Button>
                      </motion.div>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {recentUsers.length === 0 ? (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
                      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                        <Users className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No Users Yet
                      </h3>
                      <p className="text-gray-600">
                        User registrations will appear here
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-semibold">Name</TableHead>
                            <TableHead className="font-semibold">Email</TableHead>
                            <TableHead className="font-semibold">Role</TableHead>
                            <TableHead className="font-semibold">Status</TableHead>
                            <TableHead className="font-semibold">Joined</TableHead>
                            <TableHead className="text-right font-semibold">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentUsers.map((currentUser, index) => (
                            <motion.tr key={currentUser.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + index * 0.05 }} className="hover:bg-blue-50/50 transition-colors">
                            <TableCell className="font-medium">
                              {currentUser.firstName} {currentUser.lastName}
                            </TableCell>
                            <TableCell className="text-gray-600">
                              {currentUser.email}
                            </TableCell>
                            <TableCell>{getRoleBadge(currentUser.role)}</TableCell>
                            <TableCell>
                              {currentUser.isEmailVerified ? (
                                <Badge className="bg-green-100 text-green-700 border-green-200">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              ) : (
                                <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
                                  <Clock className="w-3 h-3 mr-1" />
                                  Pending
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                {formatDate(currentUser.createdAt)}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button variant="ghost" size="sm" className="text-blue-600">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button variant="ghost" size="sm" className="text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </motion.div>
                              </div>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </TableBody>
                    </Table>
                  </motion.div>
                )}
              </CardContent>
            </Card>
            </motion.div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <Card className="glass border-2 border-emerald-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                  Analytics & Reports
                </CardTitle>
                <CardDescription>
                  Comprehensive insights and data analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 border-2 border-blue-100 rounded-xl hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Donation Analytics</h3>
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Monthly trends, top donors, and revenue insights
                    </p>
                    <Button className="w-full gradient-blue text-white">
                      View Report
                    </Button>
                  </div>

                  <div className="p-6 border-2 border-purple-100 rounded-xl hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">User Growth</h3>
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Registration trends and user engagement metrics
                    </p>
                    <Button className="w-full gradient-purple text-white">
                      View Report
                    </Button>
                  </div>

                  <div className="p-6 border-2 border-green-100 rounded-xl hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Campaign Performance</h3>
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Campaign-wise donations and goal achievements
                    </p>
                    <Button className="w-full gradient-emerald text-white">
                      View Report
                    </Button>
                  </div>

                  <div className="p-6 border-2 border-amber-100 rounded-xl hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Financial Summary</h3>
                      <DollarSign className="w-6 h-6 text-amber-600" />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Revenue reports, expenses, and financial statements
                    </p>
                    <Button className="w-full gradient-sunset text-white">
                      View Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
