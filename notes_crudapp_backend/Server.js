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
const user=mongoose.Schema({
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