# Reports Management System - User Guide

## Overview
The Reports Management System allows administrators to upload and manage financial transparency reports, including Financial Reports, Annual Reports, Audit Reports, Impact Reports, Quarterly Reports, and other documents in PDF format.

## Features

### For Administrators
- **Upload Reports**: Upload PDF files up to 10MB
- **Manage Metadata**: Add title, description, report type, and fiscal year
- **Status Control**: Publish, draft, or archive reports
- **View Statistics**: Track total reports, published reports, views, etc.
- **Delete Reports**: Remove outdated or incorrect reports

### For Public Users
- **Browse Reports**: View all published reports organized by type
- **Search & Filter**: Find specific reports by keyword or category
- **Download PDFs**: Direct PDF download with view tracking
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## How to Upload a Report (Admin Guide)

### Step 1: Access Reports Management
1. Login to your admin account
2. Navigate to Admin Dashboard
3. Click on "Manage Reports" in the Quick Actions section
   - Or go directly to: `/admin/reports`

### Step 2: Upload a New Report
1. Click the "Upload Report" button (top-right corner)
2. Fill in the required information:

#### Required Fields:
- **Title**: Report name (e.g., "Annual Financial Report 2024")
- **Report Type**: Select from dropdown:
  - Financial
  - Annual
  - Audit
  - Impact
  - Quarterly
  - Other
- **Status**: Choose report visibility:
  - **Published**: Visible to public immediately
  - **Draft**: Saved but not visible to public
  - **Archived**: Hidden from public view
- **PDF File**: Upload your report (PDF only, max 10MB)

#### Optional Fields:
- **Description**: Additional details about the report
- **Fiscal Year**: Year or period covered (e.g., "2024-2025", "Q1-2024")

### Step 3: Submit the Upload
1. Click "Upload Report" button
2. Wait for confirmation message
3. Report will appear in the management table

## Managing Existing Reports

### View Report Statistics
The dashboard shows:
- Total Reports
- Published Reports
- Draft Reports
- Archived Reports
- Total Views across all reports

### Filter and Search
- **Search Box**: Enter keywords to find specific reports
- **Filter by Type**: Select report category from dropdown
- **Filter by Status**: Show only Published, Draft, or Archived reports

### Download Reports
- Click the download icon (↓) next to any report
- PDF will open in a new tab
- Each download increments the view count

### Delete Reports
1. Click the trash icon (🗑️) next to the report
2. Confirm the deletion
3. Report and associated PDF file will be permanently deleted

**⚠️ Warning**: Deletion is permanent and cannot be undone!

## Public Access

### Where Users Can Find Reports

#### Navigation Menu
Users can access reports from the main website header:
- **Resources** → **Financial Reports**
- Direct URL: `/reports`

#### Report Display
- Reports are grouped by type (Financial, Annual, Audit, etc.)
- Each report card shows:
  - Title and description
  - Report type badge
  - Fiscal year (if provided)
  - Publication date
  - View count
  - File size
  - Download button

### Download Tracking
- Every time a user downloads a report, the view count increases
- Admins can track report popularity via view counts

## File Requirements

### PDF Specifications
- **Format**: PDF only (.pdf)
- **Max Size**: 10 MB
- **Naming**: Files are automatically renamed with timestamps
- **Storage**: Files stored in `backend/uploads/reports/`

### Best Practices
1. **File Size**: Compress large PDFs before uploading
2. **Naming Convention**: Use clear, descriptive titles
3. **Descriptions**: Add context to help users understand content
4. **Fiscal Year**: Always include for annual/quarterly reports
5. **Status**: Use Draft for review before publishing

## Report Types Explained

### Financial Reports
- Monthly/quarterly financial statements
- Income and expense summaries
- Budget reports
- Donation summaries

### Annual Reports
- Complete yearly overview
- Program highlights and achievements
- Financial summary for the year
- Impact stories and statistics

### Audit Reports
- Third-party audit results
- Compliance certifications
- Financial verification documents
- Regulatory filings

### Impact Reports
- Program outcomes and metrics
- Beneficiary stories and testimonials
- Social impact measurements
- Long-term effectiveness studies

### Quarterly Reports
- 3-month performance summaries
- Seasonal updates
- Progress toward annual goals

### Other Reports
- Special reports
- Research findings
- Case studies
- Policy documents

## Troubleshooting

### Upload Failed
- **Check file size**: Must be under 10MB
- **Check file type**: Only PDF files allowed
- **Check internet**: Ensure stable connection
- **Try again**: Refresh page and retry

### Report Not Showing on Public Site
- **Check status**: Must be set to "Published"
- **Refresh page**: Clear browser cache if needed
- **Check filters**: Ensure no filters are hiding it

### Cannot Delete Report
- **Check permissions**: Must be logged in as Admin
- **Try refreshing**: Reload the page
- **Contact support**: If issue persists

## Security & Privacy

### Access Control
- **Upload**: Admin accounts only
- **Edit**: Admin accounts only
- **Delete**: Admin accounts only
- **View/Download**: Public (for Published reports only)

### File Storage
- Files stored securely on server
- Served via protected URLs
- Only Published reports accessible to public

## API Endpoints (For Developers)

### Public Endpoints
- `GET /api/reports` - List all published reports
- `GET /api/reports/:id` - Get single report (increments view count)
- `GET /api/reports/by-type` - Get reports grouped by type

### Admin Endpoints (Require Authentication)
- `POST /api/reports` - Upload new report
- `PUT /api/reports/:id` - Update report metadata
- `DELETE /api/reports/:id` - Delete report
- `GET /api/reports-stats` - Get statistics

### File Access
- `GET /uploads/reports/:filename` - Download PDF file

## Support

For technical issues or questions:
- Contact: admin@mahima.org
- Support Hours: Monday-Friday, 9 AM - 5 PM IST

## Version History

**Version 1.0** (November 2024)
- Initial release
- PDF upload functionality
- Public report browsing
- View tracking
- Admin management interface

---

**Last Updated**: November 12, 2024
**Maintained By**: Mahima Ministries IT Team
