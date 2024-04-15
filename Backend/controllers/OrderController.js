
const Order = require("../models/ordersModel");
const Product = require("../models/productModel");

const Secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const createOrder = async (req, res) => {
  try {

    const {name , phone ,address , cart ,userId } = req.body ;

    if (!name || !phone || !address || !cart || !userId)
      return res.status(400).json({ msg: "required fields" });


      let totalPrice = 0;
      for (const item of cart) {
        const prod = await  Product.findById(item.product) ;
        totalPrice += prod.price * item.quantity;
    };
    const order = new Order({
      name: name,
      phone: phone,
      address:address ,
      cart:cart ,
      userId:userId ,
      totalPrice :totalPrice
    });

    await order.save();
    res.status(201).json({ msg: "order created.." });
  } catch (err) {
    res.status(500).send("errorr in server" + err);
  }
};



const GetOrders = async (req,res)=>{

  try{

      const orders = await Order.find().populate('userId')
      .populate('cart.productId'); ;
      if(!orders)
       return res.status(404).json("no orders found") ;

      res.status(200).json(orders) ;
  }
  catch(error){
      res.status(500).send("error") ;
      console.log(error) ;
  }

}

const GetUserOrders = async (req,res)=>{

  try{

      const ID = req.params.id ;
      const orders = await Order.find({userId:ID}) ;
      if(!orders)
       return res.status(404).json("no orders found") ;

      res.status(200).json(orders) ;
  }
  catch(error){
      res.status(500).send("error") ;
      console.log(error) ;
  }
 
} ;

const GetOneOrder = async (req,res)=>{

  try{

      const ID = req.params.id ;
      const order = await Order.findById(ID) ;
      if(!order)
       return res.status(404).json("no orders found") ;

      res.status(200).json(orders) ;
  }
  catch(error){
      res.status(500).send("error") ;
      console.log(error) ;
  }
 
} ;

const updateOrder = async(req,res)=>{

  try{

    const  name  = req.body.name;
    const image = req.file.path ;
    if (!name || !image)
      return res.status(400).json({ msg: "required fields" });

    const categ = await Category.findByIdAndUpdate(req.params.id, {
      name: name,
      image: image,
    
  }, {
      new: true
  })

    if(!categ)
     return res.status(404).json("no products found") ;

    res.status(200).send(categ) ;
}
catch(error){
    res.status(500).send("error") ;
    console.log(error) ;
}


}

const deleteOrder = async (req,res)=>{

  try{

      const ID = req.params.id ;
      const categ = await Category.findOneAndDelete(ID) ;

      if(!categ)
       return res.status(404).json("no products found") ;

      res.status(200).json("product deleted..") ;
  }
  catch(error){
      res.status(500).send("error") ;
      console.log(error) ;
  }

}





module.exports = {createOrder ,GetOrders ,GetUserOrders,GetOneOrder};
