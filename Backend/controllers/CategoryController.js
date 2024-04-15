
const Category = require("../models/categoryModel");
const Secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const createCategory = async (req, res) => {
  try {
    const  name  = req.body.name;
    const image =req.file.path ;

    if (!name || !image)
      return res.status(400).json({ msg: "required fields" });

    const catg = new Category({
      name: name,
      image: image,
    });

    await catg.save();
    res.status(201).json({ msg: "category created.." });
  } catch (err) {
    res.status(500).send("errorr in server" + err);
  }
};



const GetCategories = async (req,res)=>{

  try{

      const categ = await Category.find() ;
      if(!categ)
       return res.status(404).json("no categories found") ;

      res.status(200).json(categ) ;
  }
  catch(error){
      res.status(500).send("error") ;
      console.log(error) ;
  }

}

const GetOneCategory = async (req,res)=>{

  try{

      const ID = req.params.id ;
      const categ = await Category.findById(ID) ;
      if(!categ)
       return res.status(404).json("no categories found") ;

      res.status(200).json(categ) ;
  }
  catch(error){
      res.status(500).send("error") ;
      console.log(error) ;
  }
 
} ;

const updateCategory = async(req,res)=>{

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

const deleteCategory = async (req,res)=>{

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





module.exports = {createCategory , GetCategories , GetOneCategory ,updateCategory , deleteCategory};
