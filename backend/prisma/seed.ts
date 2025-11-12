import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean up existing data
  console.log('🧹 Cleaning up existing data...');
  await prisma.donation.deleteMany({});
  await prisma.partnershipApplication.deleteMany({});
  await prisma.contactInquiry.deleteMany({});
  await prisma.campaign.deleteMany({});
  console.log('✅ Cleanup complete!');

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin@123456', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mahima.org' },
    update: {},
    create: {
      email: 'admin@mahima.org',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      isEmailVerified: true,
      profile: {
        create: {
          firstName: 'Admin',
          lastName: 'User',
        },
      },
    },
  });
  console.log('✅ Created admin user:', admin.email);

  // Create sample donor 1
  const donorPassword = await bcrypt.hash('Donor@123456', 12);
  const donor = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      email: 'john.doe@example.com',
      password: donorPassword,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+91 98765 43210',
      role: 'DONOR',
      isEmailVerified: true,
      profile: {
        create: {
          firstName: 'John',
          lastName: 'Doe',
          address: '123 Main St',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400001',
          country: 'India',
        },
      },
    },
  });
  console.log('✅ Created donor user:', donor.email);

  // Create sample donor 2
  const donor2 = await prisma.user.upsert({
    where: { email: 'jane.smith@example.com' },
    update: {},
    create: {
      email: 'jane.smith@example.com',
      password: donorPassword, // Same password for simplicity
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+91 98765 43211',
      role: 'DONOR',
      isEmailVerified: true,
      profile: {
        create: {
          firstName: 'Jane',
          lastName: 'Smith',
          address: '456 Park Avenue',
          city: 'Delhi',
          state: 'Delhi',
          zipCode: '110001',
          country: 'India',
        },
      },
    },
  });
  console.log('✅ Created donor user:', donor2.email);

  // Create sample campaign
  const campaign = await prisma.campaign.upsert({
    where: { id: 'sample-campaign-id' },
    update: {},
    create: {
      id: 'sample-campaign-id',
      name: 'Winter Relief Fund',
      description: 'Help families in need during the winter season',
      goal: 50000,
      raised: 12500,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-03-31'),
      isActive: true,
    },
  });
  console.log('✅ Created campaign:', campaign.name);

  // Create sample donations with unique payment intent IDs
  const timestamp = Date.now();
  const donation1 = await prisma.donation.create({
    data: {
      userId: donor.id,
      amount: 8000,
      currency: 'INR',
      status: 'COMPLETED',
      paymentMethod: 'card',
      paymentIntentId: `pi_sample_${timestamp}_001`,
      isRecurring: false,
      campaignId: campaign.id,
      message: 'Keep up the great work!',
      receiptSent: true,
    },
  });
  console.log('✅ Created donation:', donation1.id);

  const donation2 = await prisma.donation.create({
    data: {
      userId: donor.id,
      amount: 4000,
      currency: 'INR',
      status: 'COMPLETED',
      paymentMethod: 'card',
      paymentIntentId: `pi_sample_${timestamp}_002`,
      isRecurring: true,
      recurringInterval: 'MONTHLY',
      campaignId: campaign.id,
      receiptSent: true,
    },
  });
  console.log('✅ Created recurring donation:', donation2.id);

  // Create sample partnership application
  const partnership = await prisma.partnershipApplication.create({
    data: {
      userId: donor.id,
      organizationName: 'Acme Corporation',
      contactName: 'Jane Smith',
      contactEmail: 'jane@acme.com',
      contactPhone: '+1234567890',
      partnershipType: 'CORPORATE',
      proposalDetails: 'We would like to establish a corporate partnership...',
      status: 'PENDING',
    },
  });
  console.log('✅ Created partnership application:', partnership.id);

  // Create sample contact inquiry
  const inquiry = await prisma.contactInquiry.create({
    data: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      subject: 'Question about donations',
      message: 'I would like to know more about how donations are used...',
      status: 'NEW',
    },
  });
  console.log('✅ Created contact inquiry:', inquiry.id);

  console.log('🎉 Database seeded successfully!');
  console.log('');
  console.log('========================================');
  console.log('📝 Test Credentials');
  console.log('========================================');
  console.log('');
  console.log('👨‍💼 ADMIN ACCOUNT:');
  console.log('   Email: admin@mahima.org');
  console.log('   Password: Admin@123456');
  console.log('   Dashboard: /admin/dashboard');
  console.log('');
  console.log('👤 DONOR ACCOUNT 1:');
  console.log('   Email: john.doe@example.com');
  console.log('   Password: Donor@123456');
  console.log('   Dashboard: /donor/dashboard');
  console.log('');
  console.log('👤 DONOR ACCOUNT 2:');
  console.log('   Email: jane.smith@example.com');
  console.log('   Password: Donor@123456');
  console.log('   Dashboard: /donor/dashboard');
  console.log('');
  console.log('========================================');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
