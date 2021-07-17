const mongoose = require("mongoose");
const userSchema =new mongoose.Schema({
  coverImg: {
    type: String,
    requied: true,
  },
  title: {
    type: String,
    // unique: true,
    requied: true,
  },
  about: {
    type: String,
    // unique: true,
    requied: true,
  },
  password: {
    type: String,
    requied: true,
  }
});
module.exports = mongoose.model('Login', userSchema)
