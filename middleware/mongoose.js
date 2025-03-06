import mongoose from 'mongoose';

const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectDb;

