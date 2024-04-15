const express = require ("express") ;
const router = express.Router() ;
const regValidator =require("../middlewares/CustomerMwRegistValid") ;
const User =require("../models/UsersModel") ;
const Token = require("../controllers/Jwt")
const bcrypt = require ("bcrypt") ;
const dotenv =require("dotenv") ;
dotenv.config();




router.post("/signup"  , async(req,res)=> {

    try {

      const {name , email , password , phone ,address , isAdmin} = req.body ;

      if(!name || !email || !password  || !phone || !address || !isAdmin)
      return res.json("missed required fields") ;

     let usr = await User.findOne( { email : req.body.email }).exec() ;

      if(usr) {
      return res.status(400).send("user already exist..") ;
    } 

      let salt = await bcrypt.genSalt(10) ;
     let hashedPassword = await bcrypt.hash(req.body.password , salt) ;
     usr = new User({

        name       : name ,
        email      : email   ,
        password   : hashedPassword  ,
        phone      : phone ,
        address    : address ,
        isAdmin    : isAdmin

    }) ;
   
      await usr.save() ;

      res.status(201).json({msg:"User Regist Success.."}) ;

       

    }
    catch (err){
    res.status(500).send(`error happen bro -->  ${err}`);
    }
}) ;




router.post("/signin" , async(req,res)=>{

    
    try {

           let usr = await User.findOne( { email : req.body.email }).exec() ; 
           if(!usr) return res.status(400).json("inValid email or password..") ;

           const validpswrd = await bcrypt.compare(req.body.password , usr.password) ;
           if(!validpswrd) return res.status(400).json("inValid email or password..") ;

        

           const token = Token.generateToken(usr) ;
           res.json({msg:"Loged in sucsessfully.." });
           

       
                   
     }
     catch(err){
        res.status(500).json({msg:"error Bro"});
        console.log(err) ;
    }



}) ;






module.exports=router ;