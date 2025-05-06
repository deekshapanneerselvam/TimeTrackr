// insertSample.js
const dotenv = require('dotenv');
const connectDB = require('./db/connect');
const User = require('./models/user');

dotenv.config();

const insertUser = async () => {
  try {
    await connectDB();

    const newUser = new User({
      name: 'Deeksha P.',
      email: 'deeksha@example.com',
      password: 'securepassword123',
    });

    await newUser.save();
    console.log('✅ User inserted successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Failed to insert user:', error);
    process.exit(1);
  }
};

insertUser();
