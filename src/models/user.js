const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    fname:String,
    lname:String,
    email:{type:String,unique:true},
    password:String,
    userType:String
})

module.exports=mongoose.model('user',userSchema)