const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserDb = new mongoose.Schema({
    Email:{
        type:String,
        require:true,
        unique:true
    },

    firstname:{
        type:String,
        require:true,
        
    },
    lastname:{ 
        type:String,
        require:true,
        
    },
   
    Password:{
        type:String,
        require:true,
        
    },
    followers:[],
    following:[],
   
   
});

module.exports=mongoose.model('user',UserDb);