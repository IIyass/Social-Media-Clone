const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Postdb = new Schema({
    user:{ 
        type:Schema.Types.Object,
        required:true
        
    },
    text:{
        type:String,
        required:true,
        
    },
    
    
    
    Date:{
    type:Date,
    default:Date.now
    },
    likes:[]
    
});

module.exports=mongoose.model('post',Postdb);