import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.route("/:id/reviews").post(protect, createProductReview);
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
