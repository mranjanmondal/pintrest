var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var plm = require("passport-local-mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/printext");
var userSchema = mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
 password:{
  type:String,
  required:true,
 },
 posts:[{
  type:mongoose.Schema.Types.ObjectId, 
  ref:"post"
 }],
 dp:{
  type:String,
 },
 email:{
  type:String,
  unique:true,
  required:true,
 },
 fullname:{
  type:String,
  required:true,
 },

});

userSchema.plugin(plm);
module.exports = mongoose.model("user", userSchema) ;
