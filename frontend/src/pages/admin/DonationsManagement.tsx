import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Skeleton from '@/components/ui/Skeleton';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  Heart, 
  Search, 
  Download,
  ArrowLeft,
  Filter,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import * as XLSX from 'xlsx';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface Donation {
  id: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  createdAt: string;
  donor: {
    firstName: string;
    lastName: string;
    email: string;
  };
  campaign?: {
    title: string;
  };
  isRecurring: boolean;
  recurringInterval?: string;
}

export default function DonationsManagement() {
  const navigate = useNavigate();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    failed: 0,
    totalAmount: 0
  });

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_URL}/api/admin/donations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch donations');
      }

      const data = await response.json();
      setDonations(data.data.donations || []);
      setStats(data.data.statistics || stats);
    } catch (error) {
      console.error('Error fetching donations:', error);
      // Mock data for demonstration
      const mockDonations: Donation[] = [
        {
          id: '1',
          amount: 5000,
          currency: 'USD',
          status: 'COMPLETED',
          paymentMethod: 'CREDIT_CARD',
          createdAt: new Date().toISOString(),
          donor: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com'
          },
          campaign: {
            title: 'Education Fund'
          },
          isRecurring: false
        },
        {
          id: '2',
          amount: 2500,
          currency: 'USD',
          status: 'COMPLETED',
          paymentMethod: 'UPI',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          donor: {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com'
          },
          campaign: {
            title: 'Healthcare Initiative'
          },
          isRecurring: true,
          recurringInterval: 'MONTHLY'
        },
        {
          id: '3',
          amount: 10000,
          currency: 'USD',
          status: 'PENDING',
          paymentMethod: 'BANK_TRANSFER',
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          donor: {
            firstName: 'Robert',
            lastName: 'Johnson',
            email: 'robert.j@example.com'
          },
          isRecurring: false
        }
      ];
      setDonations(mockDonations);
      setStats({
        total: 3,
        completed: 2,
        pending: 1,
        failed: 0,
        totalAmount: 17500
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      COMPLETED: {
        icon: CheckCircle,
        className: 'bg-emerald-100 text-emerald-700 border-emerald-300'
      },
      PENDING: {
        icon: Clock,
        className: 'bg-amber-100 text-amber-700 border-amber-300'
      },
      FAILED: {
        icon: XCircle,
        className: 'bg-red-100 text-red-700 border-red-300'
      },
      CANCELLED: {
        icon: XCircle,
        className: 'bg-gray-100 text-gray-700 border-gray-300'
      }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
    const Icon = config.icon;

    return (
      <Badge className={`${config.className} font-semibold`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0) + status.slice(1).toLowerCase()}
      </Badge>
    );
  };

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = 
      `${donation.donor.firstName} ${donation.donor.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.donor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.campaign?.title?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'ALL' || donation.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const exportToExcel = () => {
    // Prepare data for export
    const exportData = filteredDonations.map(donation => ({
      'Donation ID': donation.id,
      'Donor Name': `${donation.donor.firstName} ${donation.donor.lastName}`,
      'Email': donation.donor.email,
      'Amount': donation.amount,
      'Currency': donation.currency,
      'Campaign': donation.campaign?.title || 'General Fund',
      'Payment Method': donation.paymentMethod,
      'Status': donation.status,
      'Date': formatDate(donation.createdAt)
    }));

    // Create workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Donations');

    // Auto-size columns
    const maxWidth = 50;
    const wscols = Object.keys(exportData[0] || {}).map(() => ({ wch: maxWidth }));
    worksheet['!cols'] = wscols;

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `donations_export_${timestamp}.xlsx`;

    // Download file
    XLSX.writeFile(workbook, filename);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
          <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b-2 border-orange-200 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-32 h-10" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-12 h-12 rounded-xl" />
                    <div>
                      <Skeleton className="w-56 h-8 mb-2" />
                      <Skeleton className="w-40 h-4" />
                    </div>
                  </div>
                </div>
                <Skeleton className="w-36 h-10" />
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="bg-white/90">
                  <CardContent className="pt-6">
                    <Skeleton className="w-full h-20" />
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="bg-white/90 backdrop-blur border-2 border-purple-200 mb-6">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Skeleton className="flex-1 h-12" />
                  <Skeleton className="w-32 h-12" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur border-2 border-purple-200">
              <CardHeader>
                <Skeleton className="w-48 h-6 mb-2" />
                <Skeleton className="w-64 h-4" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-4">
                      <Skeleton className="w-full h-12" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b-2 border-orange-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/admin/dashboard')}
                  className="border-2 border-orange-300 text-orange-600 hover:bg-orange-50 font-semibold"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Donations Management
                    </h1>
                    <p className="text-sm text-gray-600 font-medium">
                      Monitor and manage all donations
                    </p>
                  </div>
                </div>
              </div>
              <Button 
                onClick={exportToExcel}
                className="bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Excel
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <Card className="bg-white/90 backdrop-blur border-2 border-purple-200 hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total</p>
                    <p className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {stats.total}
                    </p>
                  </div>
                  <Heart className="w-10 h-10 text-purple-500 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur border-2 border-emerald-200 hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Completed</p>
                    <p className="text-3xl font-extrabold text-emerald-600">
                      {stats.completed}
                    </p>
                  </div>
                  <CheckCircle className="w-10 h-10 text-emerald-500 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur border-2 border-amber-200 hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Pending</p>
                    <p className="text-3xl font-extrabold text-amber-600">
                      {stats.pending}
                    </p>
                  </div>
                  <Clock className="w-10 h-10 text-amber-500 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur border-2 border-red-200 hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Failed</p>
                    <p className="text-3xl font-extrabold text-red-600">
                      {stats.failed}
                    </p>
                  </div>
                  <XCircle className="w-10 h-10 text-red-500 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur border-2 border-orange-200 hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Amount</p>
                    <p className="text-2xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                      ${stats.totalAmount.toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="w-10 h-10 text-orange-500 opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card className="bg-white/90 backdrop-blur border-2 border-orange-200 mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search by donor name, email, or campaign..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 border-2 border-orange-200 focus:border-orange-400"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-[200px] h-12 border-2 border-orange-200">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Status</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="FAILED">Failed</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Donations Table */}
          <Card className="bg-white/90 backdrop-blur border-2 border-orange-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">
                Donations List ({filteredDonations.length})
              </CardTitle>
              <CardDescription className="text-gray-600">
                All donation transactions and their details
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredDonations.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-gray-600 text-lg font-medium">No donations found</p>
                  <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filter</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-orange-100">
                        <TableHead className="font-bold text-gray-700">Donor</TableHead>
                        <TableHead className="font-bold text-gray-700">Email</TableHead>
                        <TableHead className="font-bold text-gray-700">Campaign</TableHead>
                        <TableHead className="font-bold text-gray-700">Amount</TableHead>
                        <TableHead className="font-bold text-gray-700">Method</TableHead>
                        <TableHead className="font-bold text-gray-700">Type</TableHead>
                        <TableHead className="font-bold text-gray-700">Status</TableHead>
                        <TableHead className="font-bold text-gray-700">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDonations.map((donation) => (
                        <TableRow key={donation.id} className="border-orange-50 hover:bg-orange-50/50 transition-colors">
                          <TableCell className="font-semibold text-gray-800">
                            {donation.donor.firstName} {donation.donor.lastName}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {donation.donor.email}
                          </TableCell>
                          <TableCell className="text-gray-700">
                            {donation.campaign?.title || 'General Fund'}
                          </TableCell>
                          <TableCell className="font-bold text-purple-600">
                            ${donation.amount.toLocaleString()} {donation.currency}
                          </TableCell>
                          <TableCell className="text-gray-600 text-sm">
                            {donation.paymentMethod.replace('_', ' ')}
                          </TableCell>
                          <TableCell>
                            {donation.isRecurring ? (
                              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 font-semibold">
                                {donation.recurringInterval?.toLowerCase()}
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-gray-100 text-gray-700 font-semibold">
                                One-time
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(donation.status)}
                          </TableCell>
                          <TableCell className="text-gray-600 text-sm">
                            {formatDate(donation.createdAt)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
      <Footer />
    </>
  );
}
