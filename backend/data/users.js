import bcrypt from 'bcryptjs'
const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'john@email.com',
        password: bcrypt.hashSync('123456',10),
    },
    {
        name: 'Jane Doe',
        email: 'jane@email.com',
        password: bcrypt.hashSync('123456',10),
    },
]
export default users
// Compare this snippet from backend\seeder.js:
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import colors from "colors";
// import users from "./data/users.js";
// import products from "./data/products.js";
// import User from "./models/userModel.js";
// import Product from "./models/productModel.js";
// import Order from "./models/orderModel.js";
// import connectDB from "./config/db.js";
// dotenv.config();
// connectDB();
// const importData = async () => {
//     try {
//         await Order.deleteMany();
//         await Product.deleteMany();
//         await User.deleteMany();
//         const createdUsers = await User.insertMany(users);
//         const adminUser = createdUsers[0]._id;
//         const sampleProducts = products.map((product) => {
//             return { ...product, user: adminUser };
//         });
//         await Product.insertMany(sampleProducts);
//         console.log("Data Imported!".green.inverse);

//         process.exit();
//     } catch (error) {
//         console.error(`${error}`.red.inverse);
//         process.exit(1);
//     }
// };


