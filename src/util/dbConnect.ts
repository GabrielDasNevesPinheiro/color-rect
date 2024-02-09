import mongoose from 'mongoose';

const connectDatabase = async () => {


    if (mongoose.STATES[mongoose.connection.readyState] !== "connected")
        mongoose.connect(process.env.MONGO_URL as string);
};

export default connectDatabase;