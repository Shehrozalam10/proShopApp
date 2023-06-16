import expreess from 'express';//es6
import dotenv from 'dotenv';
dotenv.config();
import products from './data/products.js';
// import connectDB from './config/db.js';
// connectDB();//connect db
//  import products from 'C:\Desktop\study material\react\PROSHOP\backend\data\products.js';


  
// const port=process.env.PORT || 5000;
const port=5000;
const app=expreess();
app.get('/',(req,res)=>{
    // res.send('server is ready');
    res.send("API is running...`");
}
);
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
app.listen(port,()=>{
    console.log(`server at http://localhost:${port}`);
}
);
// Path: backend\package.json
// {
