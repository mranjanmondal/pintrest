var express = require('express');
var router = express.Router();
var userModel = require("./users");
var localStratagy = require("passport-local");
const passport = require('passport');
passport.use(new localStratagy(userModel.authenticate()));


router.get('/', function(req, res, next) {
  res.render('index');
});

router.get("/profile",isloggedin,function(req,res){
  res.render("profile") 
});

router.post("/register", function(req,res){
  var userData = new userModel({
    username:req.body.username,
    fullname:req.body.fullname,
    email:req.body.email
    
  });
  userModel.register(userData, req.body.password).then(function(registereduser){
    passport.authenticate("local")(req,res,function(){
    res.redirect("/profile");
    })
  })
});

router.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/"
}) ,function(req,res){});

router.get("/logout",function(req,res,next){
  req.logOut(function(err){
    if(err){return next(err); }
    res.redirect("/")
  });

});

function isloggedin(req,res,next){
  if(req.authenticated()) return next();
  res.redirect("/");
}

module.exports = router;
