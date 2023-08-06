import path from 'path';

import express from 'express';//es6
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import connectDB from './config/db.js';
import {notFound,errorHandler} from './middleware/errorMiddleware.js';
const port=process.env.PORT || 5000;

connectDB();//connect db


//  import products from 'C:\Desktop\study material\react\PROSHOP\backend\data\products.js';


  
// const port=5000;
const app=express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//cookie parser middleware
app.use(cookieParser());

app.get('/',(req,res)=>{
    // res.send('server is ready');
    res.send("API is running...");
}
);
app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRoutes);
app.use('/api/config/paypal',(req,res)=>res.send({client_Id:process.env.PAYPAL_CLIENT_ID}));
// app.get(
//     '/api/products',(req,res)=>{
//         res.json(products);
//         //res.send("hh");
//     }
// )
// app.get(
//     '/api/products/:id',(req,res)=>{
//         const product=products.find((p)=>p._id===req.params.id);
//         res.json(product);
//     }
// )

const __dirname=path.resolve();
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));
    
app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`server at http://localhost:${port}`);
}
);
// Path: backend\package.json
// {
