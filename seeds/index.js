const mongoose = require('mongoose');
const { seedDonors } = require('./donorSeed');
const { seedBloodBanks } = require('./bloodBankSeed');
require('dotenv').config();

const runAllSeeds = async () => {
  try {
    console.log('🌱 Starting database seeding...\n');
    
    // Connect to MongoDB using environment variable
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }
    
    await mongoose.connect(MONGODB_URI);
    console.log('📡 Connected to MongoDB Atlas\n');

    // Run donor seeding
    console.log('👥 Seeding Donors...');
    await seedDonors();
    console.log('✅ Donor seeding completed\n');

    // Run blood bank seeding
    console.log('🏥 Seeding Blood Banks...');
    await seedBloodBanks();
    console.log('✅ Blood bank seeding completed\n');

    await mongoose.connection.close();
    console.log('🎉 All seeding completed successfully!');
    console.log('\n📋 What was created:');
    console.log('• 12 Blood Donors across 5 districts');
    console.log('• 10 Blood Banks with full inventory');
    console.log('• Complete contact information and availability');
    console.log('• Realistic data for testing the application\n');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
};

// Run the seeding
runAllSeeds();