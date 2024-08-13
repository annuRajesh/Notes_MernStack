import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const app=express()
app.use(cors({
    origin:"*"
}
))
app.use(express.json())
const PORT=5000
app.listen(PORT,()=>{
    console.log(`connected to ${PORT}`)
})
const MongodbUrl="mongodb://127.0.0.1:27017/Notes_App"
mongoose.connect(MongodbUrl).then(()=>{
    console.log("connected to database")
})
//schema defined for users collection
const User=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true

    }
})
//model for the users created
const user=mongoose.model("users",User)
app.post("/api/createAccount",async(req,res)=>{
    try{

        const {username,email,password}=req.body
        
        
        const newuser=new user({username,email,password})
        await newuser.save()
        console.log("Account created successfully")
        res.status(201).json({message:"Account created successfully"})
    }
    catch(error){
        if(error.code===11000){
            res.status(400).json({message:"Email already exist"})
        }
        console.log("Error in creating account:",error)
       
    }
})