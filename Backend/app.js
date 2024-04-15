const express =require("express") ;
const app = express() ;
const port=process.env.PORT||3000 ;


app.use(express.static(__dirname));

app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Handle preflight requests
  }

  next();
});



const mongoose = require ("mongoose") ;

const cors = require('cors');
app.use(cors());

app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;


const bodyParser=require("body-parser") ;
const dotenv =require("dotenv") ;
dotenv.config();




app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const auth = require("./routes/auth")
const createPro = require("./routes/adminRoutes") ;
const userRoute = require("./routes/userRoutes") ;




app.use("/api",auth) ;
app.use("/api",createPro) ;
app.use("/api",userRoute) ;








mongoose.connect(process.env.Database_url ,{
    useNewUrlParser:true ,
  useUnifiedTopology:true ,
  useCreateIndex :true ,
  useFindAndModify:false  
}  


).then(()=>{
    console.log("Db Connect :)") ;
}).catch((err)=>{

    console.log("Error :(",err) ;
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});









