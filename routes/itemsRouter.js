const express=require('express')
const Item=require('../modals/Items')
const router= new express.Router();
router.get('/items',(req,res)=>{
    Item.find().sort({date:-1}).then(items=>res.json(items));
});

router.post('/items',(req,res)=>{
    const newItem=new Item({
        name:req.body.name
    })
    newItem.save().then(item=>res.json(item))
})
router.delete('/items/:id',(req,res)=>{
Item.findById(req.params.id)
.then((item)=>item.remove().then(
    ()=>res.json({
        success:true
    })
))
})
module.exports=router