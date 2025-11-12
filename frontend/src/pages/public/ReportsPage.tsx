import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  FileText, 
  Download,
  Calendar,
  Eye,
  Search,
  Filter,
  TrendingUp,
  DollarSign,
  BarChart3,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';

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
  viewCount: number;
  publishedAt: string;
  createdAt: string;
}

const ReportsPage = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchReports();
  }, [filterType]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('status', 'PUBLISHED');
      
      if (filterType !== 'ALL') {
        params.append('reportType', filterType);
      }

      const response = await fetch(`${API_URL}/api/reports?${params.toString()}`);
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

  const handleDownload = async (report: Report) => {
    try {
      // Track view
      await fetch(`${API_URL}/api/reports/${report.id}`);
      
      // Open PDF in new tab
      window.open(`${API_URL}${report.fileUrl}`, '_blank');
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const getReportIcon = (type: string) => {
    const icons: any = {
      FINANCIAL: DollarSign,
      ANNUAL: Calendar,
      AUDIT: BarChart3,
      IMPACT: TrendingUp,
      QUARTERLY: Calendar,
      OTHER: FileText,
    };
    return icons[type] || FileText;
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

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.fiscalYear?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  // Group reports by type
  const groupedReports: any = {
    FINANCIAL: [],
    ANNUAL: [],
    AUDIT: [],
    IMPACT: [],
    QUARTERLY: [],
    OTHER: [],
  };

  filteredReports.forEach(report => {
    groupedReports[report.reportType]?.push(report);
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Award className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                Financial Transparency Reports
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Access our comprehensive financial reports, annual reviews, and audit documents. 
                We believe in complete transparency with our donors and stakeholders.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/90 backdrop-blur border-2 border-purple-200 mb-8">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search reports..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-2 border-purple-200 focus:border-purple-400"
                    />
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full md:w-64 border-2 border-purple-200">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Reports</SelectItem>
                      <SelectItem value="FINANCIAL">Financial Reports</SelectItem>
                      <SelectItem value="ANNUAL">Annual Reports</SelectItem>
                      <SelectItem value="AUDIT">Audit Reports</SelectItem>
                      <SelectItem value="IMPACT">Impact Reports</SelectItem>
                      <SelectItem value="QUARTERLY">Quarterly Reports</SelectItem>
                      <SelectItem value="OTHER">Other Reports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading reports...</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {Object.entries(groupedReports).map(([type, typeReports]: [string, any]) => {
                if (typeReports.length === 0) return null;

                const Icon = getReportIcon(type);

                return (
                  <motion.div key={type} variants={itemVariants}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg ${getReportTypeColor(type)}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {type.charAt(0) + type.slice(1).toLowerCase()} Reports
                      </h2>
                      <Badge className={getReportTypeColor(type)}>
                        {typeReports.length}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {typeReports.map((report: Report) => (
                        <motion.div
                          key={report.id}
                          whileHover={{ scale: 1.02, y: -5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Card className="bg-white/90 backdrop-blur border-2 border-purple-200 hover:shadow-xl transition-all h-full">
                            <CardHeader>
                              <div className="flex items-start justify-between mb-2">
                                <Badge className={getReportTypeColor(report.reportType)}>
                                  {report.reportType}
                                </Badge>
                                {report.fiscalYear && (
                                  <Badge variant="outline" className="ml-2">
                                    {report.fiscalYear}
                                  </Badge>
                                )}
                              </div>
                              <CardTitle className="text-lg">{report.title}</CardTitle>
                              {report.description && (
                                <CardDescription className="line-clamp-2">
                                  {report.description}
                                </CardDescription>
                              )}
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm text-gray-600">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{formatDate(report.publishedAt)}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    <span>{report.viewCount} views</span>
                                  </div>
                                </div>
                                <div className="text-sm text-gray-500">
                                  Size: {formatFileSize(report.fileSize)}
                                </div>
                                <Button
                                  onClick={() => handleDownload(report)}
                                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all"
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Download PDF
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}

              {filteredReports.length === 0 && (
                <motion.div variants={itemVariants}>
                  <Card className="bg-white/90 backdrop-blur border-2 border-purple-200">
                    <CardContent className="py-16 text-center">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        No Reports Found
                      </h3>
                      <p className="text-gray-600">
                        {searchQuery
                          ? 'Try adjusting your search or filters'
                          : 'No reports have been published yet'}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReportsPage;
