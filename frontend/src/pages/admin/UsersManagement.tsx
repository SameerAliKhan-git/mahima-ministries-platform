import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import Skeleton from '@/components/ui/Skeleton';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  Users, 
  Search, 
  UserPlus, 
  Mail, 
  Shield,
  Edit,
  Trash2,
  ArrowLeft,
  Filter
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface User {
  id: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  profile: {
    firstName: string;
    lastName: string;
    phone?: string;
  };
}

export default function UsersManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('ALL');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_URL}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data.data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Mock data for demonstration
      setUsers([
        {
          id: '1',
          email: 'john.doe@example.com',
          role: 'DONOR',
          status: 'ACTIVE',
          createdAt: new Date().toISOString(),
          profile: {
            firstName: 'John',
            lastName: 'Doe',
            phone: '+91 98765 43210'
          }
        },
        {
          id: '2',
          email: 'jane.smith@example.com',
          role: 'DONOR',
          status: 'ACTIVE',
          createdAt: new Date().toISOString(),
          profile: {
            firstName: 'Jane',
            lastName: 'Smith',
            phone: '+91 98765 43211'
          }
        },
        {
          id: '3',
          email: 'admin@mahima.org',
          role: 'ADMIN',
          status: 'ACTIVE',
          createdAt: new Date().toISOString(),
          profile: {
            firstName: 'Admin',
            lastName: 'User',
            phone: '+91 98765 43212'
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers(users.filter(user => user.id !== userId));
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getRoleBadge = (role: string) => {
    if (role === 'ADMIN') {
      return (
        <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 font-semibold">
          <Shield className="w-3 h-3 mr-1" />
          Admin
        </Badge>
      );
    }
    return (
      <Badge className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0 font-semibold">
        <Users className="w-3 h-3 mr-1" />
        Donor
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    if (status === 'ACTIVE') {
      return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 font-semibold">Active</Badge>;
    }
    return <Badge variant="destructive" className="font-semibold">Inactive</Badge>;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${user.profile.firstName} ${user.profile.lastName}`.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = filterRole === 'ALL' || user.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

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
                      <Skeleton className="w-48 h-8 mb-2" />
                      <Skeleton className="w-32 h-4" />
                    </div>
                  </div>
                </div>
                <Skeleton className="w-36 h-10" />
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card className="bg-white/90 backdrop-blur border-2 border-orange-200 mb-6">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Skeleton className="flex-1 h-12" />
                  <Skeleton className="w-24 h-12" />
                  <Skeleton className="w-24 h-12" />
                  <Skeleton className="w-24 h-12" />
                  <Skeleton className="w-24 h-12" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur border-2 border-blue-200">
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
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      User Management
                    </h1>
                    <p className="text-sm text-gray-600 font-medium">
                      Manage all registered users
                    </p>
                  </div>
                </div>
              </div>
              <Button 
                className="bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add New User
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filter */}
          <Card className="bg-white/90 backdrop-blur border-2 border-orange-200 mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 border-2 border-orange-200 focus:border-orange-400"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filterRole === 'ALL' ? 'default' : 'outline'}
                    onClick={() => setFilterRole('ALL')}
                    className={filterRole === 'ALL' ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white' : 'border-2 border-orange-200'}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    All
                  </Button>
                  <Button
                    variant={filterRole === 'DONOR' ? 'default' : 'outline'}
                    onClick={() => setFilterRole('DONOR')}
                    className={filterRole === 'DONOR' ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' : 'border-2 border-orange-200'}
                  >
                    Donors
                  </Button>
                  <Button
                    variant={filterRole === 'ADMIN' ? 'default' : 'outline'}
                    onClick={() => setFilterRole('ADMIN')}
                    className={filterRole === 'ADMIN' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'border-2 border-orange-200'}
                  >
                    Admins
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="bg-white/90 backdrop-blur border-2 border-orange-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">
                Users List ({filteredUsers.length})
              </CardTitle>
              <CardDescription className="text-gray-600">
                All registered users and their details
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredUsers.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-gray-600 text-lg font-medium">No users found</p>
                  <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filter</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-orange-100">
                        <TableHead className="font-bold text-gray-700">Name</TableHead>
                        <TableHead className="font-bold text-gray-700">Email</TableHead>
                        <TableHead className="font-bold text-gray-700">Phone</TableHead>
                        <TableHead className="font-bold text-gray-700">Role</TableHead>
                        <TableHead className="font-bold text-gray-700">Status</TableHead>
                        <TableHead className="font-bold text-gray-700">Joined</TableHead>
                        <TableHead className="font-bold text-gray-700 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id} className="border-orange-50 hover:bg-orange-50/50 transition-colors">
                          <TableCell className="font-semibold text-gray-800">
                            {user.profile.firstName} {user.profile.lastName}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2 text-gray-700">
                              <Mail className="w-4 h-4 text-gray-400" />
                              {user.email}
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {user.profile.phone || 'N/A'}
                          </TableCell>
                          <TableCell>
                            {getRoleBadge(user.role)}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(user.status)}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {formatDate(user.createdAt)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-blue-200 text-blue-600 hover:bg-blue-50"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-200 text-red-600 hover:bg-red-50"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
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
