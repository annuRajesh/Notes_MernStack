import axios from "axios";
const handleDelete = async (noteId,setItems) => {
 

  try {
    console.log(noteId);
    const response = await axios.delete(
      `http://localhost:5000/delete/${noteId}`
    );
    setItems((prevItems)=>prevItems.filter((item) => item._id != noteId));
    console.log(response.data.message);
  } catch (error) {
    console.log(noteId);
    console.log("error in deleting the note", error, "id:", noteId);
  }
};

export default handleDelete;
