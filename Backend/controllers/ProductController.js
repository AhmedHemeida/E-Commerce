const Product = require("../models/productModel");

const Admin = require("../models/adminModel");
const Category = require("../models/categoryModel");
const Secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");


const createProduct = async (req, res) => {
  try {
    const { title, price, description, Quantity, category } = req.body;
    const image = req.file.path ;

    if (!title || !price || !description || !image || !Quantity || !category)
      return res.status(400).json({ msg: "required fields" });

    const pro = new Product({
      title: title,
      price: price,
      description: description,
      image:image ,
      Quantity: Quantity,
      category: category,
    });

    await pro.save();

    res.status(201).json({ msg: "product created.." });
  } catch (error) {
    res.status(500).send("errorr in server" + error);
  }
};



const GetProducts = async (req,res)=>{

  try{

      const pro = await Product.find().populate("category", "_id name") ;

      if(!pro.length)
       return res.status(404).json("no products found") ;

      res.status(200).json(pro) ;
  }
  catch(error){
      res.status(500).send("error") ;
      console.log(error) ;
  }

} ;


const GetOneProduct = async (req,res)=>{

  try{

      const ID = req.params.id ;
      const pro = await Product.findById(ID).populate("category", "_id name") ;

      if(!pro)
       return res.status(404).json("no products found") ;

      res.status(200).json(pro) ;
  }
  catch(error){
      res.status(500).send("error") ;
      console.log(error) ;
  }

}

const updateProduct = async(req,res)=>{

  try{

    const { title, price, description, Quantity, category } = req.body;
    const image = req.file.path ;

    if (!title || !price || !description || !image || !Quantity || !category)
      return res.status(400).json({ msg: "required fields" });

    const product = await Product.findByIdAndUpdate(req.params.id, {
      title: title,
      price: price,
      description: description,
      image: image,
      Quantity: Quantity,
      category: category,
  }, {
      new: true
  })

    if(!product)
     return res.status(404).json("no products found") ;

    res.status(200).send(product) ;
}
catch(error){
    res.status(500).send("error") ;
    console.log(error) ;
}


}

const deleteProduct = async (req,res)=>{

  try{

      const ID = req.params.id ;
      const pro = await Product.findOneAndDelete(ID) ;

      if(!pro)
       return res.status(404).json("no products found") ;

      res.status(200).json("product deleted..") ;
  }
  catch(error){
      res.status(500).send("error") ;
      console.log(error) ;
  }

}



module.exports = { createProduct ,GetProducts ,GetOneProduct , updateProduct ,deleteProduct};
