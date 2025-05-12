import mongoose from 'mongoose';

const connectMongoDB = async (url) => {
    await mongoose.connect(url, {
      serverSelectionTimeoutMS: 5000,
    });
};

export default connectMongoDB