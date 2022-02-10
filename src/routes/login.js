const express=require('express')
const loginRouter=express.Router()
const user=require('../models/user',{ useNewUrlParser: true, useUnifiedTopology: true })
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

function generateToken(data){
    const token=jwt.sign(data,'secretkeytomakeajsonwebtokenforloginauthentication')
    return token
}


loginRouter.post('/',async(req,res)=>{
try {
    const login=await user.findOne({email:req.body.email})
    console.log(login)
     if(login){
    let result=await bcrypt.compare(req.body.password,login.password)
     if(result){
        const token=generateToken(req.body.email)
        console.log(token)
        const data={
            token:token,
            user:login.userType,
            message:'login Successful'
        }
        res.status(200).send(data)   
    } 
    else
    {
        res.status(402).json({message:'password mismatch'})

    }
}
else{
    res.status(402).json({message:'Invalid login data'})
}
    
} catch (error) {
    console.log(error)
    res.status(500).json(error)
}

})









module.exports=loginRouter