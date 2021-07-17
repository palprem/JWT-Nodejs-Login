const mongoose = require("mongoose");
const userSchema =new mongoose.Schema({
  name: {
    type: String,
    requied: true,
  },
  email: {
    type: String,
    // unique: true,
    requied: true,
  },
  phone: {
    type: String,
    // unique: true,
    requied: true,
  },
  password: {
    type: String,
    requied: true,
  },
  tokens:[{
    token:{
      type:String,
    }
  }]
});
module.exports = mongoose.model('Login', userSchema)
