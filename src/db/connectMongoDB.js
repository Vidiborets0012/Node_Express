import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl);

    // console.log(`Connected to database: ${mongoose.connection.name}`); //переконатися, що Mongoose "бачить" саме базу students

    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1); // аварійне завершення програми
  }
};
