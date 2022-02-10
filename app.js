var express=require('express')
const app=new express
const connection=require('./connection')
const signupRouter=require('./src/routes/signUp')
const loginRouter=require('./src/routes/login')
const articleRouter=require('./src/routes/articleRoute')
const path=require('path')
const cors=require('cors')
const fileUpload=require('express-fileupload')
const PORT=process.env.port||8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/public',express.static('public'))
app.use(cors())
app.use(fileUpload())


//routers
app.use('/api/signup',signupRouter)
app.use('/api/login',loginRouter)
app.use('/api/article',articleRouter)


connection()
app.use(express.static(path.join(__dirname,'/build')))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'/build/index.html'))
})

app.listen(PORT,()=>{
    console.log(`server started at port no:${PORT}`)
})