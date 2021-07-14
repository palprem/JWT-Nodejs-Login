const mongoose = require('mongoose');
let  userSchema = new mongoose.Schema({
    name:String,
    email:String,
    address:String
});
module.exports=mongoose.model('Blog', userSchema)