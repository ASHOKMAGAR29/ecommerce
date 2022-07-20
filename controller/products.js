const products = require("../data.json");
const fs = require('fs');

const ProductModel = require('../models/Product');




const returnAllProducts = async (req, res) => {
//     const { category } = req.query;
//     if (category) {
//       const selectedProducts = products.filter((product) => {
//         return product.category === category;
//       });
//       res.json(selectedProducts);
//       return;
//     }
//     res.json(products);

    // down line of codes are for carrying out the same task using database 

    const { category,price}  = req.query;

    // use of comparison operator in a single line of code

    // if (category && price) {
    if (category || price) {
      const selectedProducts = await ProductModel.find({ $and :[
        {category : {$in : category}},
        {price :{$gt : price}}
      ]});
      res.json(selectedProducts);
      return;
      }
// use of comparison operator in multiple line of oceds for different parameters


      // if(price){
      //   const selectedProducts = await ProductModel.find({price :{$gt : price}})
      //   res.json(selectedProducts);
      //   return;
      // }
     
const products = await ProductModel.find().sort({category: 1});
res.json(products);

  }

const returnSingleProduct = async (req, res) => {
    const { productID } = req.params;
    // const selectedProduct = products.filter((product) => {
    //   return product.id === Number(productID);
    // });
    // res.json(selectedProduct);

    // different method 

    // const selectedProduct = products.filter((product) =>{
    //   return product.id === Number(productId);
    // });
    // res.json(selectedProduct);

    const selectedProduct = await ProductModel.findByid(productID);
    res.json(selectedProduct);
    
  }

 
const createProduct = async (req, res) => {
    // products.push(req.body);
    // console.log(products);
    // fs.writeFileSync('./data.json', JSON.stringify(products), () => {
    //   console.log("Data written")
    // })
    // res.send("Data received")
    try{
      // let product = new ProductModel(req.body);
      // await product.insertMany();
      // res.json({product});
      let product = req.body;
      product.map ((prod) =>{
        let productb = new ProductModel(prod);
      productb.save();
      

      })
      res.json(product);

    }
    catch(err){
      res.send(err);
    }
  }

  const updateAndReplaceProduct = async (req,res) =>{

    const {productID} = req.params;
    const updatedProduct = await ProductModel.findOneAndReplace(productID,req.body,{new:true});
    res.json(updatedProduct);


  }
  const updateProduct = async (req,res) =>{

    const {productID} = req.params;
    const updatedProduct = await ProductModel.findByIdAndUpdate(productID,req.body);
    res.json(updatedProduct);


  }
  const deleteProduct = async (req,res) =>{
    const {productID} = req.params;
    const deletedProduct = await ProductModel.findByIdAndRemove(productID,req.body);
    res.json(deletedProduct);
    
  }
  

  
  module.exports = {returnAllProducts, returnSingleProduct, createProduct,updateProduct,updateAndReplaceProduct,deleteProduct};
