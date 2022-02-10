var express=require('express')
const articleRouter=express.Router()
const article=require('../models/articles')
const jwt=require('jsonwebtoken')


function verifyToken(req,res,next){

    let authHeader=req.headers.authorization
    if(authHeader==undefined){
        res.status(401).send({error:"no token provided"})
    }
    let token=authHeader.split(" ")[1]
    jwt.verify(token,"secretkeytomakeajsonwebtokenforloginauthentication",(err)=>{
        if(err){
            res.status(500).send({error:"Authentication failed"})
        }

        else{
            next()
        }
    })


}

//posting an article
articleRouter.post('/addArticle',async(req,res)=>{
console.log('request')
    let image=req.files.image;
  console.log(image);
  image.mv(`./public/${image.name}`)    

try {
    const time=new Date(Date.now()).getTime()
    const newArticle=article({
        name:req.body.name,
        content:req.body.content,
        createdOn:time,
        imgUrl:`http://192.168.43.51:8080/public/${image.name}`,
        likes:0

    })
    const result=await newArticle.save()
    console.log(result)
    res.status(200).json(result)
} catch (error) {
    res.send(500).json({message:"internal server error"})
}
})

//get all articles
articleRouter.get('/',verifyToken,async(req,res)=>{
        try {
        const articles=await article.find()
const articleArray=[]
for(let i=0;i<articles.length;i++)
{
    const d = new Date(articles[0].createdOn);
        let data={
        name:articles[i].name,
        content:articles[i].content,
        imgUrl:articles[i].imgUrl,
        likes:articles[i].likes,
        id:articles[i]._id,
        createdOn:`${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
    }
    articleArray.push(data)
}

        res.status(200).json(articleArray)
    } catch (error) {
        res.status(500).json(error)
    }
    
})

//get a particular article
articleRouter.get('/:id',verifyToken,async(req,res)=>{
    console.log(req.params.id)
    try {        
        const articles=await article.findOne({_id:req.params.id})
        console.log(articles)
        res.status(200).json(articles)
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
    
})

//update an article
articleRouter.put('/update',verifyToken,async(req,res)=>{
   
    try {
         if(req.files){
        let image=req.files.image;
        console.log(image);
        image.mv(`./public/${image.name}`)    
        var updatedArticle={
            name:req.body.name,
            content:req.body.content,
            imgUrl:`http://192.168.43.51:8080/public/${image.name}`,
        }}
        else{
            var updatedArticle={
                name:req.body.name,
                content:req.body.content
            }
        }
const result=await article.findOneAndUpdate({_id:req.body.id},{$set:updatedArticle},{ new: true, useFindAndModify: false })
console.log(result)
res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    } 
})

//delete an article
articleRouter.delete('/delete/:id',verifyToken,async(req,res)=>{
    console.log(req.params.id)
    try {        
        const articles=await article.findOneAndDelete({_id:req.params.id})
        console.log(articles)
        res.status(200).json(articles)
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
    
})



module.exports=articleRouter