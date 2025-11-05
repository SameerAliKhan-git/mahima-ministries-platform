import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin123!', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@nonprofit.org' },
    update: {},
    create: {
      email: 'admin@nonprofit.org',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      emailVerified: true,
    },
  });
  console.log('✅ Created admin user:', admin.email);

  // Create sample donor
  const donorPassword = await bcrypt.hash('Donor123!', 12);
  const donor = await prisma.user.upsert({
    where: { email: 'donor@example.com' },
    update: {},
    create: {
      email: 'donor@example.com',
      password: donorPassword,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      role: 'DONOR',
      emailVerified: true,
      profile: {
        create: {
          address: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        },
      },
    },
  });
  console.log('✅ Created donor user:', donor.email);

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

  // Create sample donations
  const donation1 = await prisma.donation.create({
    data: {
      userId: donor.id,
      amount: 8000,
      currency: 'INR',
      status: 'COMPLETED',
      paymentMethod: 'card',
      paymentIntentId: 'pi_sample_001',
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
      paymentIntentId: 'pi_sample_002',
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
  console.log('📝 Test Credentials:');
  console.log('Admin - Email: admin@nonprofit.org, Password: Admin123!');
  console.log('Donor - Email: donor@example.com, Password: Donor123!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
