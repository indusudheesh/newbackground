const mongoose=require('mongoose')

const articleSchema=mongoose.Schema({
    name:String,
    content:String,
    createdOn:Number,
    imgUrl:String,
    likes:Number
})

module.exports=mongoose.model('article',articleSchema)