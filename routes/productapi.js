const express = require('express');
const router = express.Router();
const products = require("../data.json");

const {returnAllProducts,returnSingleProduct,createProduct,updateAndReplaceProduct,updateProduct,deleteProduct} = require('../controller/products');

router.get("/",returnAllProducts);
router.get("/:productID",returnSingleProduct);
router.post('/',createProduct);

router.put('/productId',updateAndReplaceProduct)
router.patch('/productID',updateProduct)
router.delete('/:productID',deleteProduct);



// router.get('/',(req,res)=>{
//     const {category} = req.query;
//     if(category){
//         const selectedProduct = products.filter((product) =>{
//             return product.category === category
//         });
//         res.json(selectedProduct);
//         return;
//     }

//     res.json(products);

// });


   
//  //dynamically viewing the itemms by :productId which is variable
// router.get('/:productId',(req,res)=>{
//     // console.log(req.params);
//         const {productId} = req.params // destrudturing the key value pair
//        const selectedProduct =  products.filter((product) =>{
//         return product.id === Number(productId)
//        })



//         res.json(selectedProduct);
// })


module.exports = router;