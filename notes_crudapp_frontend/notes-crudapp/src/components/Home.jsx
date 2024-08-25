import Modal from "react-modal";
import NavBar from "./NavBar";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import handleDelete from "./Delete";
import handleEdit from "./EditModal";
import { db,auth} from "./Firebase";
import { addDoc, collection,where,getDocs,query,doc, getDoc } from "firebase/firestore";
const Home = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { userId } = useParams();
  const [items, setItems] = useState([]);
  const [editNote,setEditNote]=useState(false)
  const [editItems,seteditItems]=useState([])
  const [editModal,setEditModal]=useState(false)
  const [editTitle,seteditTitle]=useState(editItems.title||'')
  const [editContent,seteditContent]=useState(editItems.content||'')

  useEffect(() => {
    const fetchItems = async () => {
      try {
       
       const NotesRef=collection(db,'notes')
       const q=query(NotesRef, where('userId','==',userId))
       const querySnapshot=await getDocs(q)
       const Array=querySnapshot.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
       }))
       setItems(Array)
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  },[userId]);
  const editClose=()=>setEditModal(false)
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const user = auth.currentUser;
      if(user && title && content){
        await addDoc(collection(db,'notes'),{
          title:title,
          content:content,
          userId:userId,
          date:new Date().toISOString()
        })
        handleClose()

         const NotesRef=collection(db,'notes')
       const q=query(NotesRef, where('userId','==',userId))
       const querySnapshot=await getDocs(q)
       const Array=querySnapshot.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
       }))
       setItems(Array)
       setContent('')
       setTitle('')

      }
      
      
    } catch (error) {
      console.log("error:", error);
    }
  };
  
 const handleEditSave=(noteId)=>{
  try{
            

  }
  catch(error){
    console.log("error in updating item")

  }
 }
 const handleEdit=async(noteId)=>{
  try{
    const noteRef=doc(db,'notes',noteId)
    
    setEditModal(true)
    const noteSnapshot=await getDoc(noteRef)
    const noteData=noteSnapshot.data()
    seteditItems(noteData)
    console.log(editItems)

  }
  catch(error){

  }
 }
  return (
    <>
      <NavBar />
      <div className="container flex flex-col md:grid md:grid-cols-4 gap-4 mx-auto m-2 ">
        {items.map((item, index) => (
          <div className="outline rounded p-4 m-4" key={index}>
            <div className="text-xl pb-2 ">
              <h1>{item.title}</h1>
            </div>
            <div className="text-gray-400">{item.date.split('T')[0]}</div>
            <div className="text-justify ">
              <p className="note-content">{item.content}</p>
            </div>
            <div className="flex flex-row-reverse">
              <div className="pl-3 pr-3 ">
                <MdModeEdit className="scale-125" onClick={()=>handleEdit(item.id)}/>
              </div>
              <div className="">
                <MdDelete className="scale-125 cursor-pointer" onClick={()=>handleDelete(item.id,setItems)}></MdDelete>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row-reverse md:pr-32 md:justify-start justify-center pb-4">
   
        <Modal
          isOpen={open}
          onRequestClose={handleClose}
          appElement={document.getElementById("root")}
          className="flex flex-row gap-4 justify-center items-center min-w-min  outline-none w-full bg-RoyalBlue mx-12"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <form action="" onSubmit={handleSubmit} className="w-10/12 py-12">
            <div className="bg-RoyalBlue flex gap-4 flex-col   w-full ">
              <div className="">
                <input
                  type="text"
                  placeholder="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-RoyalBlue outline-none max-w- full text-2xl border w-full p-1"
                />
              </div>
              <div className="">
                <textarea
                  name=""
                  id=""
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="content"
                  className="bg-RoyalBlue outline-none  w-full border p-1"
                  rows={10}
                ></textarea>
              </div>

              <button className="bg-secondaryYellow text-black py-2  mx-auto w-8/12 shadow-2xl border border-secondaryYellow">
                Save
              </button>
            </div>
          </form>
        </Modal>
        
        <Modal
        isOpen={editModal}
        onRequestClose={editClose}
        className="flex flex-row gap-4 justify-center items-center min-w-min  outline-none w-full bg-RoyalBlue mx-12 p-4"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
        
            <form action="" onSubmit={()=>handleEditSave(editItems.id)}>
            <div className="bg-RoyalBlue flex gap-4 flex-col   w-full ">
              <div className="">
                <input
                  type="text"
                  placeholder="title"
                  value={editItems.title}
                  onChange={(e) => seteditTitle(e.target.value)}
                  className="bg-RoyalBlue outline-none max-w- full text-2xl border w-full p-1"
                />
              </div>
              <div className="">
                <textarea
                  name=""
                  id=""
                  value={editItems.content}
                  onChange={(e) => seteditContent(e.target.value)}
                  placeholder="content"
                  className="bg-RoyalBlue outline-none  w-full border p-1"
                  rows={10}
                ></textarea>
              </div>

              <button className="bg-secondaryYellow text-black py-2  mx-auto w-8/12 shadow-2xl border border-secondaryYellow">
                Save
              </button>
            </div>
            </form>
         
        </Modal>
        <div
          className="bg-RoyalBlue w-16 h-16 flex flex-col justify-center text-center rounded-lg shadow-xl cursor-pointer"
          onClick={handleOpen}
        >
          <h3 className="text-2xl">+</h3>
        </div>
      </div>
    </>
  );
};
export default Home;
