import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";
dotenv.config();
connectDB();
const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });
        await Product.insertMany(sampleProducts);
        console.log("Data Imported!".green.inverse);

        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}
const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log("Data Destroyed!".red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}



if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
// Path: backend\config\prod.js
// export default {
//     MONGODB_URI: process.env.MONGODB_URI,
//     JWT_SECRET: process.env.JWT_SECRET,
//     PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
// }
// Path: backend\config\dev.js
// export default {
//     MONGODB_URI: process.env.MONGODB_URI,
//     JWT_SECRET: process.env.JWT_SECRET,
//     PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
// }
// Path: backend\config\keys.js
// import prod from "./prod.js";
// import dev from "./dev.js";
// if (process.env.NODE_ENV === "production") {
//     module.exports = prod;
// } else {
//     module.exports = dev;
