// import React from "react";
// import { useEffect ,useState } from "react";
// import { Row, Col } from "react-bootstrap";
// import Product from "../component/Product";
// import axios from 'axios';
// //  import products from "../products";

// const HomeScreen = () => {
//     const [products,setProducts]=useState([]);

//     useEffect(()=>{
//         const fetchProducts=async()=>{
//             const {data}=await axios.get('/api/products');
//             setProducts(data);
//         }
//         fetchProducts();
//     },[]);
//   return (
//     <>
//       <h1>Latest Products</h1>
//       <Row>
//         {products.map((product) => (
//           <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//             <Product  product={product} />
//           </Col>
//         ))}
//       </Row>
//     </>
//   );
// };

// export default HomeScreen;
import React from "react";
import { Row, Col } from "react-bootstrap";
// import products from '../product'
// import { useState,useEffect } from 'react';
import Product from "../component/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../component/Loader";
import Message from "../component/Message";
// import axios from 'axios';

const HomeScreen = () => {
  //  const [products,setProducts]=useState([]);

  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
       <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

// Path: frontend\src\screens\ProductScreen.jsx
export default HomeScreen;
