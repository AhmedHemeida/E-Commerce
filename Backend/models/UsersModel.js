const mongoose = require("mongoose");
const users = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  address: {

    type : [{  street:String , apartment:String , zip:String , city:String  }],
    default : [] ,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports  = mongoose.model("user", users);

