import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Loading Component
const PageLoader = () => (
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
      <p className="text-gray-600 text-lg font-medium">Loading...</p>
    </motion.div>
  </div>
);

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/public/HomePage'));
const AboutUsPage = lazy(() => import('./pages/public/AboutUsPage'));
const VisionMissionValuesPage = lazy(() => import('./pages/public/VisionMissionValuesPage'));
const GovernancePage = lazy(() => import('./pages/public/GovernancePage'));
const FinancialInformationPage = lazy(() => import('./pages/public/FinancialInformationPage'));
const ChildSafeguardingPage = lazy(() => import('./pages/public/ChildSafeguardingPage'));
const VirtualTourPage = lazy(() => import('./pages/public/VirtualTourPage'));
const ProgrammesPage = lazy(() => import('./pages/public/ProgrammesPage'));
const WhereWeWorkPage = lazy(() => import('./pages/public/WhereWeWorkPage'));
const VocationalTrainingPage = lazy(() => import('./pages/public/VocationalTrainingPage'));
const HigherEducationSupportPage = lazy(() => import('./pages/public/HigherEducationSupportPage'));
const SponsorshipPage = lazy(() => import('./pages/public/SponsorshipPage'));
const PartnershipPage = lazy(() => import('./pages/public/PartnershipPage'));
const GiveCelebrationPage = lazy(() => import('./pages/public/GiveCelebrationPage'));
const PhilanthropyPage = lazy(() => import('./pages/public/PhilanthropyPage'));
const OtherWaysToGivePage = lazy(() => import('./pages/public/OtherWaysToGivePage'));
const AnnualReportPage = lazy(() => import('./pages/public/AnnualReportPage'));
const BlogPage = lazy(() => import('./pages/public/BlogPage'));
const MediaPage = lazy(() => import('./pages/public/MediaPage'));
const FAQsPage = lazy(() => import('./pages/public/FAQsPage'));
const CareersPage = lazy(() => import('./pages/public/CareersPage'));
const ContactPage = lazy(() => import('./pages/public/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/public/PrivacyPolicyPage'));
const TermsConditionsPage = lazy(() => import('./pages/public/TermsConditionsPage'));
const RefundPolicyPage = lazy(() => import('./pages/public/RefundPolicyPage'));
const GrievanceRedressalPage = lazy(() => import('./pages/public/GrievanceRedressalPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPasswordPage'));
const DonorDashboard = lazy(() => import('./pages/donor/DonorDashboard'));
const DonatePage = lazy(() => import('./pages/donor/DonatePage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AnalyticsPage = lazy(() => import('./pages/admin/AnalyticsPage'));
const UsersManagement = lazy(() => import('./pages/admin/UsersManagement'));
const DonationsManagement = lazy(() => import('./pages/admin/DonationsManagement'));
const ReportsManagement = lazy(() => import('./pages/admin/ReportsManagement'));
const ReportsPage = lazy(() => import('./pages/public/ReportsPage'));
const PartnerDashboard = lazy(() => import('./pages/partner/PartnerDashboard'));
const SchoolsInstitutionsPage = lazy(() => import('./pages/public/SchoolsInstitutionsPage'));
const PaytmPayment = lazy(() => import('./components/payment/PaytmPayment'));
const PaymentSuccess = lazy(() => import('./pages/donations/PaymentSuccess'));
const PaymentFailure = lazy(() => import('./pages/donations/PaymentFailure'));

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('accessToken');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
        
        {/* Who We Are */}
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/vision-mission-values" element={<VisionMissionValuesPage />} />
        <Route path="/governance" element={<GovernancePage />} />
        <Route path="/financial-information" element={<FinancialInformationPage />} />
        <Route path="/child-safeguarding" element={<ChildSafeguardingPage />} />
        <Route path="/virtual-tour" element={<VirtualTourPage />} />
        
        {/* Our Work */}
        <Route path="/programmes" element={<ProgrammesPage />} />
        <Route path="/where-we-work" element={<WhereWeWorkPage />} />
        <Route path="/schools-institutions" element={<SchoolsInstitutionsPage />} />
        <Route path="/vocational-training" element={<VocationalTrainingPage />} />
        <Route path="/higher-education-support" element={<HigherEducationSupportPage />} />
        
        {/* Ways to Give */}
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/pay" element={<PaytmPayment />} />
        <Route path="/donations/payment-success" element={<PaymentSuccess />} />
        <Route path="/donations/payment-failed" element={<PaymentFailure />} />
        <Route path="/sponsorship" element={<SponsorshipPage />} />
        <Route path="/partnership" element={<PartnershipPage />} />
        <Route path="/give-celebration" element={<GiveCelebrationPage />} />
        <Route path="/philanthropy" element={<PhilanthropyPage />} />
        <Route path="/other-ways-to-give" element={<OtherWaysToGivePage />} />
        
        {/* Resources */}
        <Route path="/annual-report" element={<AnnualReportPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/faqs" element={<FAQsPage />} />
        <Route path="/careers" element={<CareersPage />} />
        
        {/* Contact */}
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Legal & Compliance */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-conditions" element={<TermsConditionsPage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/grievance-redressal" element={<GrievanceRedressalPage />} />
        
        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        
        {/* Protected Routes */}
        <Route
          path="/donor/dashboard"
          element={
            <ProtectedRoute>
              <DonorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/partner/dashboard"
          element={
            <ProtectedRoute>
              <PartnerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <UsersManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/donations"
          element={
            <ProtectedRoute>
              <DonationsManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute>
              <ReportsManagement />
            </ProtectedRoute>
          }
        />
        
        {/* 404 Not Found */}
        <Route path="*" element={<div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-gray-600">Page not found</p>
          </div>
        </div>} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
