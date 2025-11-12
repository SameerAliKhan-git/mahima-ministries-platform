import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import Skeleton from '@/components/ui/Skeleton';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  FileText, 
  Download,
  ArrowLeft,
  Trash2,
  Eye,
  Edit,
  Plus,
  Calendar,
  TrendingUp,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface Report {
  id: string;
  title: string;
  description: string | null;
  reportType: string;
  fiscalYear: string | null;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  status: string;
  viewCount: number;
  publishedAt: string | null;
  createdAt: string;
}

interface ReportStats {
  totalReports: number;
  publishedReports: number;
  draftReports: number;
  archivedReports: number;
  totalViews: number;
}

const ReportsManagement = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [stats, setStats] = useState<ReportStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filterType, setFilterType] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    reportType: 'FINANCIAL',
    fiscalYear: '',
    status: 'PUBLISHED',
  });

  useEffect(() => {
    fetchReports();
    fetchStats();
  }, [filterType, filterStatus]);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      
      if (filterType !== 'ALL') params.append('reportType', filterType);
      if (filterStatus !== 'ALL') params.append('status', filterStatus);

      const response = await fetch(`${API_URL}/api/reports?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setReports(data.data.reports);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/reports-stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file type
      if (file.type !== 'application/pdf') {
        alert('Please select a PDF file');
        return;
      }
      
      // Check file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert('Please select a PDF file');
      return;
    }

    setUploading(true);

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('title', uploadForm.title);
      formData.append('description', uploadForm.description);
      formData.append('reportType', uploadForm.reportType);
      formData.append('fiscalYear', uploadForm.fiscalYear);
      formData.append('status', uploadForm.status);

      const response = await fetch(`${API_URL}/api/reports`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert('Report uploaded successfully!');
        setShowUploadDialog(false);
        setSelectedFile(null);
        setUploadForm({
          title: '',
          description: '',
          reportType: 'FINANCIAL',
          fiscalYear: '',
          status: 'PUBLISHED',
        });
        fetchReports();
        fetchStats();
      } else {
        alert(data.error || 'Failed to upload report');
      }
    } catch (error) {
      console.error('Error uploading report:', error);
      alert('Failed to upload report');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this report? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/reports/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        alert('Report deleted successfully');
        fetchReports();
        fetchStats();
      } else {
        alert(data.error || 'Failed to delete report');
      }
    } catch (error) {
      console.error('Error deleting report:', error);
      alert('Failed to delete report');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const getReportTypeColor = (type: string) => {
    const colors: any = {
      FINANCIAL: 'bg-blue-100 text-blue-700 border-blue-300',
      ANNUAL: 'bg-purple-100 text-purple-700 border-purple-300',
      AUDIT: 'bg-orange-100 text-orange-700 border-orange-300',
      IMPACT: 'bg-emerald-100 text-emerald-700 border-emerald-300',
      QUARTERLY: 'bg-pink-100 text-pink-700 border-pink-300',
      OTHER: 'bg-gray-100 text-gray-700 border-gray-300',
    };
    return colors[type] || colors.OTHER;
  };

  const getStatusBadge = (status: string) => {
    const config: any = {
      PUBLISHED: 'bg-emerald-100 text-emerald-700 border-emerald-300',
      DRAFT: 'bg-amber-100 text-amber-700 border-amber-300',
      ARCHIVED: 'bg-gray-100 text-gray-700 border-gray-300',
    };
    return config[status] || config.DRAFT;
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.fiscalYear?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b-2 border-blue-200 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <Skeleton className="w-full h-20" />
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Skeleton className="w-full h-96" />
          </main>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b-2 border-blue-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/admin')}
                  className="hover:bg-blue-100"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Reports Management
                    </h1>
                    <p className="text-sm text-gray-600 font-medium">
                      Upload and manage transparency reports
                    </p>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => setShowUploadDialog(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                <Plus className="w-4 h-4 mr-2" />
                Upload Report
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <Card className="bg-white/90 backdrop-blur border-2 border-blue-200 hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Total Reports</p>
                      <p className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {stats.totalReports}
                      </p>
                    </div>
                    <FileText className="w-10 h-10 text-blue-500 opacity-50" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur border-2 border-emerald-200 hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Published</p>
                      <p className="text-3xl font-extrabold text-emerald-600">
                        {stats.publishedReports}
                      </p>
                    </div>
                    <TrendingUp className="w-10 h-10 text-emerald-500 opacity-50" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur border-2 border-amber-200 hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Drafts</p>
                      <p className="text-3xl font-extrabold text-amber-600">
                        {stats.draftReports}
                      </p>
                    </div>
                    <Edit className="w-10 h-10 text-amber-500 opacity-50" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur border-2 border-gray-200 hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Archived</p>
                      <p className="text-3xl font-extrabold text-gray-600">
                        {stats.archivedReports}
                      </p>
                    </div>
                    <Calendar className="w-10 h-10 text-gray-500 opacity-50" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur border-2 border-purple-200 hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Total Views</p>
                      <p className="text-3xl font-extrabold text-purple-600">
                        {stats.totalViews}
                      </p>
                    </div>
                    <Eye className="w-10 h-10 text-purple-500 opacity-50" />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Filters */}
          <Card className="bg-white/90 backdrop-blur border-2 border-purple-200 mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-2 border-purple-200 focus:border-purple-400"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full md:w-48 border-2 border-purple-200">
                    <SelectValue placeholder="Filter by Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Types</SelectItem>
                    <SelectItem value="FINANCIAL">Financial</SelectItem>
                    <SelectItem value="ANNUAL">Annual</SelectItem>
                    <SelectItem value="AUDIT">Audit</SelectItem>
                    <SelectItem value="IMPACT">Impact</SelectItem>
                    <SelectItem value="QUARTERLY">Quarterly</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-48 border-2 border-purple-200">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Status</SelectItem>
                    <SelectItem value="PUBLISHED">Published</SelectItem>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="ARCHIVED">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Reports Table */}
          <Card className="bg-white/90 backdrop-blur border-2 border-purple-200">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Fiscal Year</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>File Size</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id} className="hover:bg-purple-50/50">
                      <TableCell className="font-medium">{report.title}</TableCell>
                      <TableCell>
                        <Badge className={getReportTypeColor(report.reportType)}>
                          {report.reportType}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.fiscalYear || '-'}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(report.status)}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatFileSize(report.fileSize)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4 text-gray-400" />
                          {report.viewCount}
                        </div>
                      </TableCell>
                      <TableCell>
                        {report.publishedAt ? formatDate(report.publishedAt) : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`${API_URL}${report.fileUrl}`, '_blank')}
                            className="text-blue-600 hover:bg-blue-50"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(report.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredReports.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                        No reports found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>

        {/* Upload Dialog */}
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Upload New Report</DialogTitle>
              <DialogDescription>
                Upload a PDF report for financial transparency. Max file size: 10MB
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpload}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={uploadForm.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setUploadForm({ ...uploadForm, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="reportType">Report Type *</Label>
                    <Select
                      value={uploadForm.reportType}
                      onValueChange={(value) => setUploadForm({ ...uploadForm, reportType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FINANCIAL">Financial</SelectItem>
                        <SelectItem value="ANNUAL">Annual</SelectItem>
                        <SelectItem value="AUDIT">Audit</SelectItem>
                        <SelectItem value="IMPACT">Impact</SelectItem>
                        <SelectItem value="QUARTERLY">Quarterly</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="fiscalYear">Fiscal Year</Label>
                    <Input
                      id="fiscalYear"
                      placeholder="e.g., 2024-2025"
                      value={uploadForm.fiscalYear}
                      onChange={(e) => setUploadForm({ ...uploadForm, fiscalYear: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={uploadForm.status}
                    onValueChange={(value) => setUploadForm({ ...uploadForm, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PUBLISHED">Published</SelectItem>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="ARCHIVED">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="file">PDF File *</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    required
                  />
                  {selectedFile && (
                    <p className="text-sm text-gray-600">
                      Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
                    </p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowUploadDialog(false)}
                  disabled={uploading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Upload Report'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </>
  );
};

export default ReportsManagement;
