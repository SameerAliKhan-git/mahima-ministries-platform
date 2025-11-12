import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Heart, TrendingUp, Calendar, Download, Gift, User, Mail, Phone, MapPin, DollarSign, FileText
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface UserData {
  id: string; email: string; firstName: string; lastName: string; role: string;
  profile?: { phone?: string; address?: string; city?: string };
}

interface DonationData {
  id: string; amount: number; currency: string; status: string; createdAt: string;
  campaign?: { title: string }; isRecurring: boolean; recurringInterval?: string;
}

export default function DonorDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [donations, setDonations] = useState<DonationData[]>([]);
  const [stats, setStats] = useState({ totalDonated: 0, totalDonations: 0, recurringDonations: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) { navigate('/login'); return; }
    const userData = JSON.parse(userStr);
    if (userData.role === 'ADMIN') { navigate('/admin/dashboard'); return; }
    if (userData.role === 'PARTNER') { navigate('/partner/dashboard'); return; }
    if (userData.role !== 'DONOR') { navigate('/login'); return; }
    setUser(userData);
    fetchDonations();
  }, [navigate]);

  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/api/donations/my-donations`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data?.donations) {
          const donationList = data.data.donations;
          setDonations(donationList);
          const completed = donationList.filter((d: DonationData) => d.status === 'COMPLETED');
          const totalAmount = completed.reduce((sum: number, d: DonationData) => sum + Number(d.amount), 0);
          const recurring = donationList.filter((d: DonationData) => d.isRecurring).length;
          setStats({ totalDonated: totalAmount, totalDonations: donationList.length, recurringDonations: recurring });
        }
      }
    } catch (error) { console.error('Error:', error); }
    finally { setLoading(false); }
  };


  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = { COMPLETED: 'default', PENDING: 'secondary', FAILED: 'destructive' };
    return <Badge variant={colors[status] as any || 'default'}>{status.toLowerCase()}</Badge>;
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

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-emerald-50"><motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="text-center"><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4" /><p className="text-gray-600 text-lg">Loading dashboard...</p></motion.div></div>;

  return (<><Header /><div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-emerald-50"><motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="glass sticky top-0 z-50 backdrop-blur-lg border-b border-purple-100"><div className="container mx-auto px-4 py-4"><div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">Welcome, {user?.firstName || 'Donor'}!</h1><p className="text-gray-600 mt-1">Manage your donations</p></div><div className="flex gap-3"><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Button onClick={() => navigate('/donate')} className="bg-gradient-sunset text-white"><Gift className="mr-2 h-4 w-4" />Donate</Button></motion.div></div></div></div></motion.header><div className="container mx-auto px-4 py-8"><motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"><motion.div variants={itemVariants}><Card className="glass hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden relative"><div className="absolute top-0 right-0 w-32 h-32 gradient-purple opacity-10 rounded-full blur-2xl"></div><CardHeader className="relative"><div className="flex items-center justify-between"><CardTitle className="text-lg">Total Donated</CardTitle><DollarSign className="h-8 w-8 text-purple-600" /></div></CardHeader><CardContent className="relative"><motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className="text-3xl font-bold text-purple-600">{stats.totalDonated.toFixed(2)}</motion.div><p className="text-sm text-gray-600 mt-1">Lifetime</p></CardContent></Card></motion.div><motion.div variants={itemVariants}><Card className="glass hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden relative"><div className="absolute top-0 right-0 w-32 h-32 gradient-emerald opacity-10 rounded-full blur-2xl"></div><CardHeader className="relative"><div className="flex items-center justify-between"><CardTitle className="text-lg">Total Donations</CardTitle><Heart className="h-8 w-8 text-emerald-600" /></div></CardHeader><CardContent className="relative"><motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }} className="text-3xl font-bold text-emerald-600">{stats.totalDonations}</motion.div><p className="text-sm text-gray-600 mt-1">Acts of kindness</p></CardContent></Card></motion.div><motion.div variants={itemVariants}><Card className="glass hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden relative"><div className="absolute top-0 right-0 w-32 h-32 gradient-blue opacity-10 rounded-full blur-2xl"></div><CardHeader className="relative"><div className="flex items-center justify-between"><CardTitle className="text-lg">Recurring</CardTitle><TrendingUp className="h-8 w-8 text-blue-600" /></div></CardHeader><CardContent className="relative"><motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: "spring" }} className="text-3xl font-bold text-blue-600">{stats.recurringDonations}</motion.div><p className="text-sm text-gray-600 mt-1">Ongoing</p></CardContent></Card></motion.div></motion.div><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}><Tabs defaultValue="donations" className="w-full"><TabsList className="glass"><TabsTrigger value="donations">Donations</TabsTrigger><TabsTrigger value="profile">Profile</TabsTrigger><TabsTrigger value="receipts">Receipts</TabsTrigger></TabsList><TabsContent value="donations"><Card className="glass hover:shadow-xl transition-all"><CardHeader><CardTitle>Donation History</CardTitle><CardDescription>View all donations</CardDescription></CardHeader><CardContent>{donations.length === 0 ? <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6 }} className="text-center py-16"><motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}><Gift className="h-16 w-16 text-gray-300 mx-auto mb-4" /></motion.div><h3 className="text-xl font-semibold text-gray-700 mb-2">No donations yet</h3><p className="text-gray-500 mb-6">Start giving today</p><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Button onClick={() => navigate('/donate')} className="bg-gradient-sunset text-white">Make Your First Donation</Button></motion.div></motion.div> : <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}><Table><TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Campaign</TableHead><TableHead>Amount</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead><TableHead>Receipt</TableHead></TableRow></TableHeader><TableBody>{donations.map((donation, index) => <motion.tr key={donation.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + index * 0.05 }} className="hover:bg-purple-50/50 transition-colors"><TableCell><div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-gray-400" />{formatDate(donation.createdAt)}</div></TableCell><TableCell>{donation.campaign?.title || 'General Fund'}</TableCell><TableCell className="font-semibold">{donation.currency} {donation.amount}</TableCell><TableCell>{donation.isRecurring ? <Badge variant="secondary">Recurring</Badge> : <Badge variant="outline">One-time</Badge>}</TableCell><TableCell>{getStatusBadge(donation.status)}</TableCell><TableCell>{donation.status === 'COMPLETED' && <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Button size="sm" variant="outline" className="text-blue-600"><Download className="h-4 w-4 mr-1" />Download</Button></motion.div>}</TableCell></motion.tr>)}</TableBody></Table></motion.div>}</CardContent></Card></TabsContent><TabsContent value="profile"><Card className="glass hover:shadow-xl transition-all"><CardHeader><CardTitle>Profile</CardTitle></CardHeader><CardContent className="space-y-4"><motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-4"><motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm"><User className="h-5 w-5 text-purple-600" /><div><p className="text-sm text-gray-600">Name</p><p className="font-semibold">{user?.firstName} {user?.lastName}</p></div></motion.div><motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm"><Mail className="h-5 w-5 text-purple-600" /><div><p className="text-sm text-gray-600">Email</p><p className="font-semibold">{user?.email}</p></div></motion.div>{user?.profile?.phone && <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm"><Phone className="h-5 w-5 text-purple-600" /><div><p className="text-sm text-gray-600">Phone</p><p className="font-semibold">{user.profile.phone}</p></div></motion.div>}{user?.profile?.address && <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm"><MapPin className="h-5 w-5 text-purple-600" /><div><p className="text-sm text-gray-600">Address</p><p className="font-semibold">{user.profile.address}</p></div></motion.div>}</motion.div></CardContent></Card></TabsContent><TabsContent value="receipts"><Card className="glass hover:shadow-xl transition-all"><CardHeader><CardTitle>Receipts</CardTitle></CardHeader><CardContent>{donations.filter(d => d.status === 'COMPLETED').length === 0 ? <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-16"><motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}><FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" /></motion.div><h3 className="text-xl font-semibold text-gray-700 mb-2">No receipts</h3></motion.div> : <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">{donations.filter(d => d.status === 'COMPLETED').map((donation) => <motion.div key={donation.id} variants={itemVariants} whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"><div className="flex items-center gap-4"><FileText className="h-8 w-8 text-purple-600" /><div><p className="font-semibold">{donation.campaign?.title || 'General'}</p><p className="text-sm text-gray-600">{formatDate(donation.createdAt)}  {donation.currency} {donation.amount}</p></div></div><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Button variant="outline"><Download className="h-4 w-4 mr-2" />PDF</Button></motion.div></motion.div>)}</motion.div>}</CardContent></Card></TabsContent></Tabs></motion.div></div></div><Footer /></>);
}

