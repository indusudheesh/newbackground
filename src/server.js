import express from 'express'
import {MongoClient} from 'mongodb' 
import cors from 'cors'


const app=express();

app.use(express.json())
app.use(cors())


var dbo
MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
            if(err)
                res.send('error')
               dbo=db.db("my_blog")
})

app.get('/api/article/:name',(req,res)=>{
    
        const articleName=req.params.name 
        console.log(articleName)       
           /*dbo.collection("articles").findOne({name:articleName},(err,data)=>{
                console.log(data.upvotes)
                res.status(200).json(data) 
            })  */
            new Promise(async(resolve,reject)=>{
                const articleinfo=await dbo.collection("articles").findOne({name:articleName})
                
                console.log(articleinfo)
                res.send(articleinfo) 
                
             })
            
                 
        })
                   

 app.post('/api/article/:name/upvote',(req,res)=>{

    const articleName=req.params.name   
    console.log(articleName) 
     
     new Promise(async(resolve,reject)=>{
        const articleinfo=await dbo.collection("articles").findOne({name:articleName})
        await dbo.collection('articles').findOneAndUpdate({name:articleName},{'$set':{upvotes:articleinfo.upvotes+1}})
        const updatedinfo=await dbo.collection("articles").findOne({name:articleName})
        res.status(200).json(updatedinfo)
     })  
      
})  

app.post('/api/article/:name/add-comment',(req,res)=>{
    const {username,text}=req.body
    const articleName=req.params.name
    new Promise(async(resolve,reject)=>{
        const articleinfo=await dbo.collection("articles").findOne({name:articleName})
        await dbo.collection('articles').findOneAndUpdate({name:articleName},
            {'$set':{comments:articleinfo.comments.concat({username,text})}})
        const updatedinfo=await dbo.collection("articles").findOne({name:articleName})
        res.status(200).json(updatedinfo)
     })   
})

app.listen(8000,()=>console.log('server started at port 8000'))