const express = require('express');
const router = new express.Router();
const bcrypt=require('bcryptjs')
const config=require('config')
const jwt=require('jsonwebtoken')
// Item Model
const User = require('../../modals/users');

const auth=require('../../routes/middleware/auth')
const {sendCancelationEmail,sendWelcomeEmail}=require('../../email/account');
router.post('/',(req,res)=>{
   const {name,email,password}=req.body;
   if(!name || !email || !password)
   {
       res.status(400).json({msg:"Please enter all fieds"});
   }
   User.findOne({email}).then(user=>{
       if(user) return res.status(400).json({error:"user already exit"});
   });
   const newUser=new User({
       name,email,password
   });
  bcrypt.genSalt(8,(err,salt)=>{
      bcrypt.hash(newUser.password,salt,(err,hash)=>{
          if(err) throw err;
          newUser.password=hash;
          newUser.save().then(user=>{
              jwt.sign({
                  id:user.id
              },
              config.get("jwtSecret"),{
                  expiresIn:3600
              },
              (err,token)=>{
                  if(err) throw new err ;
                  res.json({
                      token:token,
                    user:{
                        id:user.id ,
                        name:user.name,
                        email:user.email
                    }
                })
              })
              
          })
      })
  })
  sendWelcomeEmail(newUser.email,newUser.name)
})


module.exports = router;