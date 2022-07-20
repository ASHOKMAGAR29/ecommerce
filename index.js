const express = require("express");
const router = require('./routes/productapi');
const cors = require("cors");
// const productAPIRoutes = require('./routes/productapi')
const products = require('./data.json');
const hbs = require('hbs');
const coonnectDatabase = require('./database/connection');

//connect databse
coonnectDatabase();

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(express.json());
app.set('view engine', 'hbs');
app.use("/static", express.static(__dirname + "/public"));
hbs.registerPartials(__dirname + '/views/partials')

app.get("/", (req, res) => {
  res.send("Welcome to E-commerce API");
// app.use((req,res, next) => {
//   console.log("This is a middleware");
//   next();
})

const logger = (req, res, next)=> {
  req.name = "Aabiskar"
  console.log("This is a middleware");
  next();
}
const logger2 = (req, res, next)=> {
  console.log("This is next middleware");
  next();
}

app.get("/" , [logger, logger2], (req, res) => {
  console.log(req.name);
  res.render('index', {products});
});

app.use('/api/products', router)

app.listen (5000, () =>{
    console.log("Server started listening in the port 5000");
})