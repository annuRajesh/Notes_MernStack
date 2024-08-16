import Modal from "react-modal";
import NavBar from "./NavBar";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import handleDelete from "./Delete";
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

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/fetchitems/${userId}`
        );
        setItems(response.data);
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
      const response = await axios.post(`http://localhost:5000/api/home`, {
        userId,
        title,
        content,
      });
      if (response.status === 201) {
        const updatedResponse = await axios.get(
          `http://localhost:5000/fetchitems/${userId}`
        );
        setItems(updatedResponse.data);
        setTitle('')
        setContent('')
        handleClose();
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  
  const handleEdit=async(noteId)=>{
    try{

      const response=await axios.get(`http://localhost:5000/editFetch/${noteId}`)
      seteditItems(response.data)
      setEditModal(true)


    }
    catch(error){
      console.log("error in fetching item:",error)
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
                <MdModeEdit className="scale-125" onClick={()=>handleEdit(item._id)}/>
              </div>
              <div className="">
                <MdDelete className="scale-125 cursor-pointer" onClick={()=>handleDelete(item._id,setItems)}></MdDelete>
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
        
            <form action="">
            <div className="bg-RoyalBlue flex gap-4 flex-col   w-full ">
              <div className="">
                <input
                  type="text"
                  placeholder="title"
                  value={editItems.title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-RoyalBlue outline-none max-w- full text-2xl border w-full p-1"
                />
              </div>
              <div className="">
                <textarea
                  name=""
                  id=""
                  value={editItems.content}
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
