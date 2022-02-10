var mongoose=require('mongoose')

const connection=()=>{
    try {
        mongoose.connect('mongodb+srv://indusudheesh:nilaindu@cluster0.amzv5.mongodb.net/dbBlog?retryWrites=true&w=majority',{UseNewUrlParser:true,UseUnifiedTopology:true})
        console.log('database connected')
    } catch (err) {
        console.log('error to connect database')
    }
}

module.exports=connection