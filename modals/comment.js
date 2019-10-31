const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const CommentSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:
    {
        type:Number
        
    },
    message:{
        type:String,
       
    }
});
const Comment=mongoose.model('comment',CommentSchema);
module.exports=Comment