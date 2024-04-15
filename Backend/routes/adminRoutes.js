const express = require ("express") ;
const router = express.Router() ;
const pro = require("../controllers/ProductController") ;
const catg = require("../controllers/CategoryController") ;
const path = require('path'); // Add this line

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req, file, cb) {
    let ext =path.extname(file.originalname)
    cb(null,Date.now()+ext)
  }
})

const upload = multer({ storage: storage })


router.post("/create-product" ,upload.single('file'), pro.createProduct);
router.get("/get-products", pro.GetProducts);
router.get("/get-prod/:id", pro.GetOneProduct);
router.put("/update-prod/:id", pro.updateProduct);
router.delete("/delete-prod/:id", pro.deleteProduct);


router.post("/create-categ" ,upload.single('file') , catg.createCategory);
router.get("/get-categ/:id", catg.GetOneCategory);
router.get("/get-categories", catg.GetCategories);
router.put("/update-categ/:id", pro.updateProduct);
router.delete("/delete-categ/:id", pro.deleteProduct);









module.exports=router ;