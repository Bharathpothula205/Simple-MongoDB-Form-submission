const express=require('express')
const mongoose=require('mongoose')
const path=require('path')
const port= 5500                   //we need to give port number to run our application in a specified port
   

const app=express()  
app.use(express.static(path.join(__dirname,'..','Frontend')))   
app.use(express.urlencoded({extended:true})) //middleware function




mongoose.connect('mongodb://127.0.0.1:27017/students')  
const db=mongoose.connection  
db.once('open',()=>{
  console.log("mongodb succesfully connected") //from connection of db we r checking whther the db is connected sucssfully or not
})

const userschema=new mongoose.Schema({
    regd_no:String,
    name:String,
    email:String,
    branch:String
})

const users=mongoose.model("data",userschema)
app.get('/',(req,res)=>{
   // res.send('hello world')    
   res.sendFile(path.join(__dirname,'..','Frontend','form.html'))
})
app.post('/post',async (req,res)=>{
    const {regd_no,name,email,branch}=req.body
    const user=new users({
        regd_no,
        name,
        email,
        branch
    })
    await user.save()
  console.log(user)
  res.send("form submission Succesfull")
}) 
app.listen(port,()=>{
    console.log('server started '+ port)
})     












