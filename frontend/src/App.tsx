import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/public/HomePage';
import AboutUsPage from './pages/public/AboutUsPage';
import VisionMissionValuesPage from './pages/public/VisionMissionValuesPage';
import GovernancePage from './pages/public/GovernancePage';
import FinancialInformationPage from './pages/public/FinancialInformationPage';
import ChildSafeguardingPage from './pages/public/ChildSafeguardingPage';
import VirtualTourPage from './pages/public/VirtualTourPage';
import ProgrammesPage from './pages/public/ProgrammesPage';
import WhereWeWorkPage from './pages/public/WhereWeWorkPage';
import VocationalTrainingPage from './pages/public/VocationalTrainingPage';
import HigherEducationSupportPage from './pages/public/HigherEducationSupportPage';
import SponsorshipPage from './pages/public/SponsorshipPage';
import PartnershipPage from './pages/public/PartnershipPage';
import GiveCelebrationPage from './pages/public/GiveCelebrationPage';
import PhilanthropyPage from './pages/public/PhilanthropyPage';
import OtherWaysToGivePage from './pages/public/OtherWaysToGivePage';
import AnnualReportPage from './pages/public/AnnualReportPage';
import BlogPage from './pages/public/BlogPage';
import MediaPage from './pages/public/MediaPage';
import FAQsPage from './pages/public/FAQsPage';
import CareersPage from './pages/public/CareersPage';
import ContactPage from './pages/public/ContactPage';
import PrivacyPolicyPage from './pages/public/PrivacyPolicyPage';
import TermsConditionsPage from './pages/public/TermsConditionsPage';
import RefundPolicyPage from './pages/public/RefundPolicyPage';
import GrievanceRedressalPage from './pages/public/GrievanceRedressalPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DonorDashboard from './pages/donor/DonorDashboard';
import DonatePage from './pages/donor/DonatePage';

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
        <Route path="/vocational-training" element={<VocationalTrainingPage />} />
        <Route path="/higher-education-support" element={<HigherEducationSupportPage />} />
        
        {/* Ways to Give */}
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/sponsorship" element={<SponsorshipPage />} />
        <Route path="/partnership" element={<PartnershipPage />} />
        <Route path="/give-celebration" element={<GiveCelebrationPage />} />
        <Route path="/philanthropy" element={<PhilanthropyPage />} />
        <Route path="/other-ways-to-give" element={<OtherWaysToGivePage />} />
        
        {/* Resources */}
        <Route path="/annual-report" element={<AnnualReportPage />} />
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
        
        {/* Protected Routes */}
        <Route
          path="/donor/dashboard"
          element={
            <ProtectedRoute>
              <DonorDashboard />
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
    </BrowserRouter>
  );
}

export default App;
