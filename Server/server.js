const App = require("express");
const express =require("express")
const app = new App();
var bodyParser = require("body-parser");
var users =require('./Routes/Users');
var mongoose =require("mongoose");
var cors = require("cors");
var passport = require("passport");
var posts = require('./Routes/Post');


mongoose.connect("mongodb://localhost/UserDb",{useNewUrlParser:true})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/uploads',express.static('uploads'))
app.use(cors())
app.use(passport.initialize())
require('./config/passport')(passport)
app.use('/api/users',users)
app.use('/api/posts',posts)



app.listen(5000,function(){
	console.log("Server Has started");
});