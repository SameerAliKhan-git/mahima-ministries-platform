import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  TrendingUp,
  DollarSign,
  Users,
  Gift,
  Download,
  RefreshCw,
  ArrowLeft,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Target,
  Award,
  AlertCircle,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Chart Colors
const COLORS = {
  primary: ['#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6', '#4C1D95'],
  success: ['#10B981', '#059669', '#047857', '#065F46', '#064E3B'],
  warning: ['#F59E0B', '#D97706', '#B45309', '#92400E', '#78350F'],
  danger: ['#EF4444', '#DC2626', '#B91C1C', '#991B1B', '#7F1D1D'],
  info: ['#3B82F6', '#2563EB', '#1D4ED8', '#1E40AF', '#1E3A8A'],
  gradient: ['#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#3B82F6'],
};

// Custom Tooltip Components
const CustomPieTooltip = ({ active, payload, formatValue, showPercentage = false }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white px-4 py-3 rounded-lg shadow-xl border-2 border-purple-200">
        <p className="font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: data.fill }}
          />
          {data.name}
        </p>
        <div className="space-y-1 text-sm">
          <p className="text-gray-700">
            <span className="font-semibold">Value:</span> {formatValue ? formatValue(data.value) : data.value}
          </p>
          {data.payload.count !== undefined && (
            <p className="text-gray-700">
              <span className="font-semibold">Count:</span> {data.payload.count}
            </p>
          )}
          {showPercentage && data.payload.percentage !== undefined && (
            <p className="text-purple-600 font-semibold">
              {data.payload.percentage}%
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
};

const CustomDonationTypeTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    };
    
    return (
      <div className="bg-white px-4 py-3 rounded-lg shadow-xl border-2 border-blue-200">
        <p className="font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: data.fill }}
          />
          {data.payload.type}
        </p>
        <div className="space-y-1 text-sm">
          <p className="text-gray-700">
            <span className="font-semibold">Amount:</span> {formatCurrency(data.value)}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Count:</span> {data.payload.count} donations
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const CustomUserRoleTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const total = payload[0].payload.total || 0;
    const percentage = total > 0 ? ((data.value / total) * 100).toFixed(1) : 0;
    
    return (
      <div className="bg-white px-4 py-3 rounded-lg shadow-xl border-2 border-emerald-200">
        <p className="font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: data.fill }}
          />
          {data.payload.role}
        </p>
        <div className="space-y-1 text-sm">
          <p className="text-gray-700">
            <span className="font-semibold">Users:</span> {data.value}
          </p>
          <p className="text-emerald-600 font-semibold">
            {percentage}% of total
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    };
    
    return (
      <div className="bg-white px-4 py-3 rounded-lg shadow-xl border-2 border-purple-200">
        <p className="font-bold text-gray-800 mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              <span className="font-semibold">{entry.name}:</span>{' '}
              {entry.name === 'amount' || entry.name === 'Amount' || entry.name === 'revenue' || entry.name === 'Revenue'
                ? formatCurrency(entry.value)
                : entry.value}
            </p>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const CustomLineTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    };
    
    return (
      <div className="bg-white px-4 py-3 rounded-lg shadow-xl border-2 border-blue-200">
        <p className="font-bold text-gray-800 mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <p className="text-sm text-gray-700">
                <span className="font-semibold">{entry.name}:</span>{' '}
                {entry.name.toLowerCase().includes('revenue') || entry.name.toLowerCase().includes('amount')
                  ? formatCurrency(entry.value)
                  : entry.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

interface AnalyticsData {
  donationsByMonth: Array<{ month: string; amount: number; count: number }>;
  donationsByStatus: Array<{ name: string; value: number; percentage: number }>;
  donationsByType: Array<{ type: string; amount: number; count: number }>;
  topDonors: Array<{ name: string; total: number; count: number }>;
  recentGrowth: Array<{ date: string; users: number; donations: number; revenue: number }>;
  campaignPerformance: Array<{ campaign: string; raised: number; goal: number; donors: number }>;
  usersByRole: Array<{ role: string; count: number }>;
  averages: {
    avgDonation: number;
    avgMonthlyRevenue: number;
    avgDonationsPerUser: number;
  };
}

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<AnalyticsData>({
    donationsByMonth: [],
    donationsByStatus: [],
    donationsByType: [],
    topDonors: [],
    recentGrowth: [],
    campaignPerformance: [],
    usersByRole: [],
    averages: {
      avgDonation: 0,
      avgMonthlyRevenue: 0,
      avgDonationsPerUser: 0,
    },
  });

  useEffect(() => {
    checkAuth();
    fetchAnalyticsData();
  }, []);

  const checkAuth = () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }

    const userData = JSON.parse(userStr);
    if (userData.role !== 'ADMIN') {
      navigate('/donor/dashboard');
    }
  };

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');

      // Fetch pre-aggregated analytics data from backend
      const analyticsRes = await fetch(`${API_URL}/api/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json();
        
        // Use the pre-processed data from backend
        if (analyticsData.success && analyticsData.data) {
          setData(analyticsData.data);
        }
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };



  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAnalyticsData();
    setRefreshing(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-emerald-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 text-lg">Loading analytics data...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-emerald-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-3">
                  <BarChart3 className="w-10 h-10 text-purple-600" />
                  Analytics & Insights
                </h1>
                <p className="text-gray-600 text-lg mt-1">
                  Comprehensive data analysis and reporting
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleRefresh}
                disabled={refreshing}
                variant="outline"
                className="gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button className="gradient-purple text-white gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div variants={itemVariants}>
            <Card className="glass border-2 border-purple-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Average Donation</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {formatCurrency(data.averages.avgDonation)}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">+12% vs last month</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 gradient-purple rounded-full flex items-center justify-center">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass border-2 border-emerald-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
                    <p className="text-3xl font-bold text-emerald-600">
                      {formatCurrency(data.averages.avgMonthlyRevenue)}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">+8% growth</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 gradient-emerald rounded-full flex items-center justify-center">
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass border-2 border-amber-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Donations Per User</p>
                    <p className="text-3xl font-bold text-amber-600">
                      {data.averages.avgDonationsPerUser.toFixed(1)}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">Steady engagement</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 gradient-sunset rounded-full flex items-center justify-center">
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Charts Tabs */}
        <Tabs defaultValue="revenue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass border-2 border-purple-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    Revenue Growth Trend
                  </CardTitle>
                  <CardDescription>
                    Monthly revenue, user growth, and donation trends over the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={data.recentGrowth}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="date" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip content={<CustomLineTooltip />} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8B5CF6"
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                        strokeWidth={3}
                        name="Revenue (₹1000s)"
                      />
                      <Area
                        type="monotone"
                        dataKey="donations"
                        stroke="#10B981"
                        fillOpacity={1}
                        fill="url(#colorDonations)"
                        strokeWidth={3}
                        name="Donations"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="glass border-2 border-emerald-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-emerald-600" />
                      Monthly Donation Amount
                    </CardTitle>
                    <CardDescription>Total donations received per month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={data.donationsByMonth}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="month" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip content={<CustomBarTooltip />} />
                        <Bar dataKey="amount" fill="#10B981" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="glass border-2 border-blue-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChartIcon className="w-5 h-5 text-blue-600" />
                      Donation Type Distribution
                    </CardTitle>
                    <CardDescription>One-time vs recurring donations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={data.donationsByType}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ type, count }) => `${type}: ${count}`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="amount"
                        >
                          {data.donationsByType.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS.gradient[index % COLORS.gradient.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomDonationTypeTooltip />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Donations Tab */}
          <TabsContent value="donations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="glass border-2 border-purple-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-purple-600" />
                      Donation Status Distribution
                    </CardTitle>
                    <CardDescription>Breakdown by completion status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={data.donationsByStatus}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) => `${name}: ${percentage}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {data.donationsByStatus.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                entry.name === 'COMPLETED'
                                  ? COLORS.success[0]
                                  : entry.name === 'PENDING'
                                  ? COLORS.warning[0]
                                  : COLORS.danger[0]
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomPieTooltip showPercentage={true} />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="glass border-2 border-amber-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-600" />
                      Top Donors
                    </CardTitle>
                    <CardDescription>Highest contributing donors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {data.topDonors.map((donor, index) => (
                        <motion.div
                          key={donor.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 hover:shadow-md transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{donor.name}</p>
                              <p className="text-sm text-gray-600">{donor.count} donations</p>
                            </div>
                          </div>
                          <p className="text-lg font-bold text-amber-600">
                            {formatCurrency(donor.total)}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass border-2 border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-600" />
                    Campaign Performance
                  </CardTitle>
                  <CardDescription>
                    Progress towards goals for active campaigns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data.campaignPerformance} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis type="number" stroke="#6B7280" />
                      <YAxis dataKey="campaign" type="category" width={150} stroke="#6B7280" />
                      <Tooltip content={<CustomBarTooltip />} />
                      <Legend />
                      <Bar dataKey="raised" fill="#10B981" name="Raised" radius={[0, 8, 8, 0]} />
                      <Bar dataKey="goal" fill="#E5E7EB" name="Goal" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.campaignPerformance.map((campaign, index) => {
                const progress = (campaign.raised / campaign.goal) * 100;
                return (
                  <motion.div
                    key={campaign.campaign}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="glass border-2 border-purple-100 hover:shadow-xl transition-all hover:-translate-y-1">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold text-gray-900 mb-3">{campaign.campaign}</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-semibold text-purple-600">
                                {progress.toFixed(0)}%
                              </span>
                            </div>
                            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full gradient-purple"
                              />
                            </div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Raised</span>
                            <span className="font-bold text-emerald-600">
                              {formatCurrency(campaign.raised)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Goal</span>
                            <span className="font-semibold text-gray-700">
                              {formatCurrency(campaign.goal)}
                            </span>
                          </div>
                          <div className="pt-2 border-t flex items-center justify-between">
                            <span className="text-sm text-gray-600">Donors</span>
                            <Badge className="gradient-emerald text-white border-0">
                              {campaign.donors}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="glass border-2 border-blue-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Users by Role
                    </CardTitle>
                    <CardDescription>Distribution of user types</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={data.usersByRole.map(item => ({
                            ...item,
                            total: data.usersByRole.reduce((sum, r) => sum + r.count, 0)
                          }))}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ role, count }) => `${role}: ${count}`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {data.usersByRole.map((_entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS.gradient[index % COLORS.gradient.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomUserRoleTooltip />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="glass border-2 border-purple-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      User Growth
                    </CardTitle>
                    <CardDescription>New registrations over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={data.recentGrowth}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="date" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip content={<CustomLineTooltip />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="users"
                          stroke="#8B5CF6"
                          strokeWidth={3}
                          dot={{ fill: '#8B5CF6', r: 5 }}
                          name="New Users"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Additional Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <Card className="glass border-2 border-amber-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                Key Insights & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-100"
                >
                  <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Positive Trend
                  </h4>
                  <p className="text-sm text-green-700">
                    Donation amounts have increased by 12% compared to last month. Keep engaging
                    with donors through regular updates.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100"
                >
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    User Engagement
                  </h4>
                  <p className="text-sm text-blue-700">
                    Average of {data.averages.avgDonationsPerUser.toFixed(1)} donations per user.
                    Consider implementing loyalty rewards to increase retention.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-100"
                >
                  <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Campaign Success
                  </h4>
                  <p className="text-sm text-purple-700">
                    3 out of 5 campaigns are above 80% completion. Focus marketing efforts on the
                    remaining campaigns to meet goals.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-100"
                >
                  <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Top Performers
                  </h4>
                  <p className="text-sm text-amber-700">
                    Your top 5 donors contribute 40% of total revenue. Consider implementing a VIP
                    donor program with exclusive benefits.
                  </p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
