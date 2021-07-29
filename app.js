const { json } = require("express");
const express = require("express");
const { request } = require("http");
const path = require("path");
const app = express();
const { MongoClient } = require("mongodb");
require("./src/db/conn");

const Product = require("./src/models/product");
const Category = require("./src/models/category");

const { isValidObjectId } = require("mongoose");

const port = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const static_path = path.join(__dirname, "../");
app.use(express.static(static_path))


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/edit.html', function (req, res) {
  res.sendFile(__dirname + '/views/edit.html')
})

app.get('/category.html', function (req, res) {
  res.sendFile(__dirname + '/views/category.html')
})

// product update api
app.post("/edit", async (req, res)=>{
  try {
      const updateDocument = async(_id)=>{
          try{
              const result = await Product.findByIdAndUpdate({_id},{
                  $set : {
                    productId: req.body.productId,
                    productName: req.body.productName,
                    qtyPerUnit: req.body.qtyPerUnit,
                    unitPrice: req.body.unitPrice,
                    unitInStock: req.body.unitInStock,
                    discontinued: req.body.discontinued,
                    categoryId: req.body.categoryId
                  }
              },{
                  new :true,
                  useFindAndModify : false
              });
              res.redirect("/")
              console.log("Updated");
          }
          catch(err){
              console.log("error");
          }
      }
      updateDocument(req.body.id);
  } 
  catch (error) {
      console.log("error");    
  }
})
// category update api
app.post("/edit2", async (req, res)=>{
  try {
      const updateDocument2 = async(_id)=>{
          try{
              const result = await Category.findByIdAndUpdate({_id},{
                  $set : {
                    categoryId: req.body.categoryId,
                    categoryName: req.body.categoryName
                  }
              },{
                  new :true,
                  useFindAndModify : false
              });
              res.redirect("/")
              console.log("Updated");
          }
          catch(err){
              console.log("error 6 ne");
          }
      }
      updateDocument2(req.body.id);
  } 
  catch (error) {
      console.log("aato error ni 6");    
  }
})
// product delete api
app.post("/delete", async (req, res)=>{
  try {
      const deleteDocument = async(_id)=>{
          try{
              const result = await Product.findByIdAndDelete({_id});
              res.redirect("/")
              console.log("Updated");
          }
          catch(err){
              console.log("error 6 ne");
          }
      }
      deleteDocument(req.body.id);
  } 
  catch (error) {
      console.log("aato error ni 6");    
  }
})
// category delete api
app.post("/delete2", async (req, res)=>{
  try {
      const deleteDocument = async(_id)=>{
          try{
              const result = await Category.findByIdAndDelete({_id});
              res.redirect("/")
              console.log("Deleted");
          }
          catch(err){
              console.log("error");
          }
      }
      deleteDocument(req.body.id);
  } 
  catch (error) {
      console.log("error");    
  }
})
// product create api
app.post("/product", async (req, res) => {
  try {
    const productDetail = new Product({
      productId: req.body.productId,
      productName: req.body.productName,
      qtyPerUnit: req.body.qtyPerUnit,
      unitPrice: req.body.unitPrice,
      unitInStock: req.body.unitInStock,
      discontinued: req.body.discontinued,
      categoryId: req.body.categoryId
    })

    const producted = await productDetail.save();
    res.redirect("/");
  }
  catch (error) {
    res.redirect("/")
  }

});
// category create api
app.post("/category", async (req, res) => {
  try {
    const categoryDetail = new Category({
      categoryId: req.body.categoryId,
      categoryName: req.body.categoryName
    })
    const categoryed = await categoryDetail.save();
    res.redirect("/");
  }
  catch (error) {
    res.redirect("/")
  }

});
// product read api
app.get("/find", async (req, res) => {
  var url = "mongodb://localhost:27017/crud";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("crud");
    dbo.collection("products").find().toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
});
// category read api
app.get("/find2", async (req, res) => {
  var url = "mongodb://localhost:27017/crud";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("crud");
    dbo.collection("categories").find().toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
});

app.listen(port, () => {
  console.log('server is running now');
})