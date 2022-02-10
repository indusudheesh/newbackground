const express=require('express')
const signupRouter=express.Router()
const user=require('../models/user')
const bcrypt=require('bcrypt')

signupRouter.post('/',async(req,res)=>{
const salt=await bcrypt.genSalt(Number(10))
const hashPassword=await bcrypt.hash(req.body.password,salt)

console.log(req.body)    
    try {
        const newUser=new user({
            fname:req.body.fname,
            lname:req.body.lname,
            email:req.body.email,
            password:hashPassword,
            userType:'user'            
        })
        const result=await newUser.save() 
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message:'Email already taken.try a new one'})
    } 
})

signupRouter.post('/upload',async(req,res)=>{
    
})



module.exports=signupRouter