import mongoose from 'mongoose';
import 'dotenv/config'; // Ensure this is at the top

const connectDB = async () => {
  try {
    // Debug: Log the connection string (remove after verification)
    console.log('Connecting to:', process.env.MONGO_URI); 
    
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;