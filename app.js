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

app.use(express.static(path.resolve(__dirname, "./build")));
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
  
    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,OPTIONS,PUT,PATCH,DELETE"
    );
  
    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-with,content-type"
    );
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
  
    // Pass to next layer of middleware
    next();
  });

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

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./build','index.html'))
})

app.listen(PORT,()=>{
    console.log(`server started at port no:${PORT}`)
})