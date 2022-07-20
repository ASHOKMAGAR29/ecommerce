const mongoose = require("mongoose");

//database connection
const coonnectDatabase = async() =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/ecom");
        console.log("database connected successfully");
    }
    catch(err){
            console.log("errror occured");
    }
}

module.exports = coonnectDatabase;

