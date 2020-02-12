const express = require('express');
const router = express.Router();
const User=require('../../modals/users');
const auth=require('../../routes/middleware/auth')


const Item = require('../../modals/Items');


router.get('/:userId', (req, res) => {
  const {userId}=req.params;
  User.findById(userId).then((result)=>{
    res.status(200).json(result.item);
  }).catch(()=>{
    res.status(400).json({error:"not able to get the list"})
  })
});



router.post('/:userId',(req,res)=>{
  const {userId}=req.params;
  const {name}=req.body;
  console.log(name);
  User.findByIdAndUpdate(userId,
    {
      $push:{item:{name:name}}
    },function(err,model){
      if(err)
      {
        console.log(err);
        return res.status(400).json({
          error:"error occured while fetching data"
        })
      }
      return res.json(model.item);
    })
})
router.post('/del/:userId',(req,res)=>{
  const {userId}=req.params;
  const {name}=req.body;
  User.findByIdAndUpdate(userId,
    {
      $pull:{item:{name:name}}
    },function(err,model){
      if(err)
      {
        console.log(err);
        return res.send(err)
      }
      return res.json(model);
    })
})




module.exports = router;