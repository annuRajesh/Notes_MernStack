import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`connected to ${PORT}`);
});
const MongodbUrl = "mongodb://127.0.0.1:27017/Notes_App";
mongoose.connect(MongodbUrl).then(() => {
  console.log("connected to database");
});
//schema defined for users collection
const User = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
//model for the users created
const user = mongoose.model("users", User);
app.post("/api/createAccount", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const newuser = new user({ username, email, password: hashPassword });
    await newuser.save();
    console.log("Account created successfully");
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Email already exist" });
    }
    console.log("Error in creating account:", error);
  }
});
//login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginUser = await user.findOne({ email: email });

    if (!loginUser) {
      return res.json({ message: "user dosen't exist" });
    }
    const isMatch = await bcrypt.compare(password, loginUser.password);

    if (!isMatch) {
      return res.json({ message: "password incorrect" });
    }
    console.log(loginUser);
    return res
      .status(200)
      .json({ message: "login successfully", userId: loginUser._id,username:loginUser.username });
  } catch (error) {
    res.json({ message: "server error" });
    console.log("error: ", error);
  }
});
//schema for notes
const NotesSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const notesModel = new mongoose.model("notes_list", NotesSchema);
//add notes
app.post("/api/home", async (req, res) => {
  try {
    const { userId, title, content } = req.body;
    const newNote = await notesModel({ userId, title, content });
    await newNote.save();
    res.status(201).json({ message: "note created successfully" });
  } catch (error) {
    console.log("error in creating note", error);
  }
});
//fetch notes
app.get("/fetchitems/:id", async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.id);
    const notes = await notesModel.find({
      userId: userId,
    });
    res.json(notes);
  } catch (error) {
    console.log("error in fetching items");
  }
});
//delete note
app.delete("/delete/:id", async (req, res) => {
  const objId = new mongoose.Types.ObjectId(req.params.id);
  try {
    
    console.log(objId)
   
    const del = await notesModel.findByIdAndDelete(objId);
    if (del) {
      res.status(201).json({ message: "note deleted successfully" });
    }
  } catch (error) {
    console.log("error:",error,"id:",objId)
    res.status(400).json({ message: "error in deleting the note" });
    
  }
});
//fetch item to edit
app.get('/editFetch/:noteId',async(req,res)=>{
  try{

    const noteId=new mongoose.Types.ObjectId(req.params.noteId)
    const note=await notesModel.findById(noteId)
    if(note){
      res.json(note)
    }
  }
catch(error){
  console.log("error in fetching",error)
}
})
//update items
app.put('/editItems/:noteId',async(req,res)=>{
  try{
    const noteId=new mongoose.Types.ObjectId(req.params.noteId)
    const {title,content}=req.body
    const Edited=await notesModel.findByIdAndUpdate(noteId,{title,content},{new:true})
    if(Edited){
      res.json({message:"edited successfully"})
    }
  }
  catch(error){
    console.log("error in editing item")
  }
})

