var jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

exports.generateToken = (user )=>{
    var token = jwt.sign({

        email: user.email , id: user._id , username:user.username , photo :user.photo ,JobTitle:user.JobTitle
       
    } , process.env.JWT_SECRET )
    return token;
} ;


exports.validateToken =(token)=>{




   // router.post("/vtoken",(req,res)=>{

       
        
  
        let data =jwt.verify(token,process.env.JWT_SECRET) ;
        return data ;
  
  
  

}




