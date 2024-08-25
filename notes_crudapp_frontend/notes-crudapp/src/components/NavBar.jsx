import { useNavigate } from "react-router-dom";
import GetInitials from "./GetInitials";
import {motion} from 'framer-motion'
import { useEffect } from "react";
import { useState } from "react";

const NavBar = () => {
 
 const [name,setName]=useState('')
  const navigate=useNavigate()
  useEffect(() => {
    // Fetch the username from localStorage when the component mounts
    const storedName = localStorage.getItem('username');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const initials=name?GetInitials(name):'user'
  const handleLogout=()=>{
    localStorage.removeItem('username');
    setName(''); // Clear the state
    navigate('/');
  }
  return (
    <>
      <div className="flex flex-row px-2 py-5 shadow-md w-full  bg-BasicBlue">
        <div className="">
          <h1 className="text-3xl">Notes</h1>
        </div>
        {name &&
        <motion.div 

        className="flex flex-row-reverse md:flex-row md:justify-end  justify-start w-full ">
          <div className="rounded-full bg-secondaryYellow text-center  text-black p-5 h-16 w-16">
            <h1>{initials}</h1>

          </div>
          <div className="p-4">
            <h1>{name}</h1>
            <h2 className="underline cursor-pointer" onClick={handleLogout}>LogOut</h2>
          </div>
        </motion.div>
}
      </div>
    </>
  );
};
export default NavBar;
