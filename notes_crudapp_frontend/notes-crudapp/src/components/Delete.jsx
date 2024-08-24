
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./Firebase";
const handleDelete = async (noteId,setItems) => {
 

  try {
    const noteRef=doc(db,'notes',noteId)
    await deleteDoc(noteRef)
  
    setItems((prevItems)=>prevItems.filter((item) => item.id != noteId));
    
  } catch (error) {
    console.log(noteId);
    console.log("error in deleting the note", error, "id:", noteId);
  }
};

export default handleDelete;
