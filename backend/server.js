import express from 'express';//es6
import dotenv from 'dotenv';
dotenv.config();
import productRoutes from './routes/productRoutes.js';
import connectDB from './config/db.js';
import {notFound,errorHandler} from './middleware/errorMiddleware.js';
const port=process.env.PORT || 5000;

connectDB();//connect db


//  import products from 'C:\Desktop\study material\react\PROSHOP\backend\data\products.js';


  
// const port=5000;
const app=express();
app.get('/',(req,res)=>{
    // res.send('server is ready');
    res.send("API is running...");
}
);
app.use('/api/products',productRoutes);

app.get(
    '/api/products',(req,res)=>{
        res.json(products);
        //res.send("hh");
    }
)
app.get(
    '/api/products/:id',(req,res)=>{
        const product=products.find((p)=>p._id===req.params.id);
        res.json(product);
    }
)
app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`server at http://localhost:${port}`);
}
);
// Path: backend\package.json
// {
