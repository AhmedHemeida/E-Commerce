const mongoose = require("mongoose");

const product = new mongoose.Schema({
  
  title: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  Quantity: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
  },

  category: {
    type: mongoose.Schema.ObjectId,
    ref: "category",
    required: true,
  },

  description: {
    type: String,
    required: true 
  },

  sold: {
    type: Number,
    default: 0,
  },


});

module.exports = mongoose.model("product", product);

