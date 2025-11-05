import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface User {
  id: string;
  email: string;
  role: string;
  profile: {
    firstName: string;
    lastName: string;
  };
}

interface Donation {
  id: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  campaign?: {
    title: string;
  };
  isRecurring: boolean;
  recurringInterval?: string;
}

export default function DonorDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [stats, setStats] = useState({
    totalDonated: 0,
    totalDonations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
    fetchDonations();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUser(data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      navigate('/login');
    }
  };

  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_URL}/api/donations/my-donations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch donations');
      }

      const data = await response.json();
      setDonations(data.data.donations);
      setStats(data.data.statistics);
    } catch (error) {
      console.error('Error fetching donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: any = {
      COMPLETED: 'default',
      PENDING: 'secondary',
      FAILED: 'destructive',
      CANCELLED: 'outline',
    };

    return (
      <Badge variant={variants[status] || 'default'}>
        {status.toLowerCase()}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-emerald-50">
        {/* Header */}
        <header className="glass sticky top-0 z-50 backdrop-blur-lg border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
                My Dashboard
              </h1>
              <p className="text-sm text-gray-600 font-medium mt-1">
                Welcome back, <span className="text-purple-600 font-semibold">{user?.profile?.firstName}</span>! 👋
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => navigate('/donate')} 
                className="gradient-sunset text-white font-semibold hover-lift shadow-lg shadow-orange-500/30"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                Make a Donation
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="border-purple-300 text-purple-600 hover:bg-purple-50 font-medium"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass border-2 border-purple-100 hover-lift gradient-border overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 gradient-purple opacity-10 rounded-full blur-2xl"></div>
            <CardHeader className="relative">
              <CardDescription className="text-gray-600 font-medium">Total Donated</CardDescription>
              <CardTitle className="text-4xl gradient-purple bg-clip-text text-transparent font-extrabold">
                ${stats.totalDonated.toFixed(2)}
              </CardTitle>
              <div className="mt-2 flex items-center text-sm text-emerald-600 font-semibold">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                Making impact
              </div>
            </CardHeader>
          </Card>

          <Card className="glass border-2 border-emerald-100 hover-lift gradient-border overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 gradient-emerald opacity-10 rounded-full blur-2xl"></div>
            <CardHeader className="relative">
              <CardDescription className="text-gray-600 font-medium">Total Donations</CardDescription>
              <CardTitle className="text-4xl gradient-emerald bg-clip-text text-transparent font-extrabold">
                {stats.totalDonations}
              </CardTitle>
              <div className="mt-2 flex items-center text-sm text-purple-600 font-semibold">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                Contributions
              </div>
            </CardHeader>
          </Card>

          <Card className="glass border-2 border-orange-100 hover-lift gradient-border overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 gradient-sunset opacity-10 rounded-full blur-2xl"></div>
            <CardHeader className="relative">
              <CardDescription className="text-gray-600 font-medium">Impact Score</CardDescription>
              <CardTitle className="text-4xl gradient-sunset bg-clip-text text-transparent font-extrabold">
                {Math.floor(stats.totalDonated / 10)}
              </CardTitle>
              <div className="mt-2 flex items-center text-sm text-orange-600 font-semibold">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Points earned
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Donation History */}
        <Card className="glass border-2 border-purple-100">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
                  Donation History
                </CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  View and manage your past contributions
                </CardDescription>
              </div>
              <div className="w-12 h-12 gradient-purple rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {donations.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 gradient-sunset opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-2 text-lg font-medium">No donations yet</p>
                <p className="text-gray-500 text-sm mb-6">Start your journey of giving today</p>
                <Button 
                  onClick={() => navigate('/donate')}
                  className="gradient-purple text-white font-semibold hover-lift shadow-lg shadow-purple-500/30"
                >
                  Make Your First Donation
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-purple-100">
                      <TableHead className="font-bold text-gray-700">Date</TableHead>
                      <TableHead className="font-bold text-gray-700">Campaign</TableHead>
                      <TableHead className="font-bold text-gray-700">Amount</TableHead>
                      <TableHead className="font-bold text-gray-700">Type</TableHead>
                      <TableHead className="font-bold text-gray-700">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donations.map((donation) => (
                      <TableRow key={donation.id} className="border-purple-50 hover:bg-purple-50/50 transition-colors">
                        <TableCell className="font-medium text-gray-700">
                          {formatDate(donation.createdAt)}
                        </TableCell>
                        <TableCell className="text-gray-800">
                          {donation.campaign?.title || 'General Fund'}
                        </TableCell>
                        <TableCell className="font-bold text-purple-600">
                          ${donation.amount.toFixed(2)} {donation.currency}
                        </TableCell>
                        <TableCell>
                          {donation.isRecurring ? (
                            <Badge className="gradient-emerald text-white border-0">
                              {donation.recurringInterval?.toLowerCase()}
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                              One-time
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{getStatusBadge(donation.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
      </div>
    </>
  );
}
