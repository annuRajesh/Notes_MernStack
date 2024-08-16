import axios from "axios"

const handleEdit=async(noteId,seteditItems,setEditModal)=>{
    try{

      const response=await axios.get(`http://localhost:5000/editFetch/${noteId}`)
      seteditItems(response.data)
      console.log(response.data.title)
      setEditModal(true)


    }
    catch(error){
      console.log("error in fetching item:",error)
    }

  }
  export default handleEdit