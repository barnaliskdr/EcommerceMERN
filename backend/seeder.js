// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import colors from "colors";
// import users from "./data/user.js";
// import products from "./data/products.js";
// import User from "./model/userModel.js";
// import Product from "./model/productModel.js";
// import Order from "./model/orderModel.js";
// import connectDB from "./config/db.js";

// dotenv.config();

// connectDB();
// // the moto of this file is to seed all our data to the database
// const importData = async () => {
//     try {
//         await Order.deleteMany();
//         await Product.deleteMany();
//         await User.deleteMany();

//         const createdUsers = await User.insertMany(users);

//         const adminUser = createdUsers[0]._id;

//         const sampleProducts = products.map((product) => {
//             return { ...product, user: adminUser }; //user: adminUser   
//         });
//         console.log("imported data");
//     }
//     catch(error)
//     {
//         console.log(error);
//         // process.exit(1);
//     }
// }

// const destroyData = async () => {
//     try {
//         await Order.deleteMany();
//         await Product.deleteMany();
//         await User.deleteMany();
//     }
//     catch(error)
//     {
//         console.log(error);
//         // process.exit(1);
//     }
// }


// importData();

import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/user.js";
import products from "./data/products.js";
import User from "./model/userModel.js";
import Product from "./model/productModel.js";
import Order from "./model/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        console.log('Users inserted:', createdUsers);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });
        const insertedProducts = await Product.insertMany(sampleProducts);
        console.log('Products inserted:', insertedProducts);

        console.log("Data imported successfully!".green.inverse);
        process.exit();  // Exit after successful import
    } catch (error) {
        console.error(`${error.message}`.red.inverse);
        process.exit(1);  // Exit with failure code
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data destroyed successfully!".green.inverse);
        process.exit();  // Exit after successful destruction
    } catch (error) {
        console.error(`${error.message}`.red.inverse);
        process.exit(1);  // Exit with failure code
    }
};

// Determine if we are importing or destroying data based on command-line arguments
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
