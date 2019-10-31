const express = require('express');
const router = new express.Router();
const auth=require('../middleware/auth')
const Comment=require('../../modals/comment');
router.post('/',auth,(req,res)=>{
    const {name,email,phone,message}=req.body;
    const newComment=new Comment({
        name,email,phone,message
    })
    newComment.save().then(()=>{
        res.json({
            message:"submitted"
        })
    })
})
module.exports=router