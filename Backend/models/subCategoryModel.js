const mongoose = require("mongoose");

const subCategory = new mongoose.Schema({
  
  title: {
    type: String,
    required: true,
  },


  image: {
    type: String,
  },

  category: {
    type: mongoose.Schema.ObjectId,
    ref: "category",
    required: true
  },


});

module.exports = mongoose.model("subCategory", subCategory);

