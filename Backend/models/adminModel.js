const mongoose = require("mongoose");

const admin = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    required: true,

  },
});

module.exports = mongoose.model("admin", admin);

