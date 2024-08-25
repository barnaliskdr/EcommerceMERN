import mongoose from "mongoose";

const connectDB = async () => {
    try {
       // console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
        mongoose.connect(`mongodb+srv://bsikdar:Barna1234@cluster0.7xnat.mongodb.net/Ecommerceshop?retryWrites=true&w=majority&appName=Cluster0`, {
            serverSelectionTimeoutMS: 30000,
          })
          console.log("MongoDB Connected");
    }
    catch(error)
    {
            console.log(error);
            // process.exit(1);
    }
}

export default connectDB;