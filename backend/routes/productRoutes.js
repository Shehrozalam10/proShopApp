import express from 'express';
 const router=express.Router();
 import {getProducts,getProductById} from '../controllers/productController.js';


router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
export default router;



//  router.get('/', asyncHandler(async (req,res)=>{
//         const products=await Product.find({});
//         throw new Error('Some error');
//         res.json(products);
//     }
// ));
// router.get('/:id',asyncHandler(async(req,res)=>{
//     // const product=products.find((p)=>p._id===req.params.id);
//     const product=await Product.findById(req.params.id);
//     if(product){
//         res.json(product);
//     }
//     else{
//         // res.status(404).json({message:'product not found'});
//       res.status(404);
//       throw new Error('Product not found');

//     }

//     res.json(product);
// }
// ));
// export default router;
