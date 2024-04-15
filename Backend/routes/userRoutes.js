const express = require ("express") ;
const router = express.Router() ;
const order = require("../controllers/OrderController") ;





router.post("/create-order" ,order.createOrder);
router.get("/getAll-orders" ,order.GetOrders);
router.get("/get-user-orders/:id" ,order.GetUserOrders);
router.get("/getOne-order/:id" ,order.GetOrders);












module.exports=router ;