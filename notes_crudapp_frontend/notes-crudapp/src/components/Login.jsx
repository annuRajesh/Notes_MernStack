import { useState } from "react"
import NavBar from "./NavBar"
import validateEmail from "./Validate"
import { useNavigate } from "react-router-dom"
import { auth } from "./Firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login=()=>{
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[error,setError]=useState('')
const notify=()=>toast('User not found')
    localStorage.removeItem('username')

    const handleLogin=async(e)=>{
        try{

            e.preventDefault()
            if(!validateEmail(email)){
                setError("enter a valid email address")
                return;
            }
            if(password===""){
                setError("enter password")
                return;
            }
           const UserCredentials=await signInWithEmailAndPassword(auth,email,password)
           const User=UserCredentials.user
           localStorage.setItem('username',User.displayName)
           if(User)
          {
           navigate(`/home/${User.uid}`)
          }
          else{
            notify()

          }
        }
        catch(error){
            notify(); 
            console.log("error in login:",error)
        }
    }
   const  handleNavigation=()=>{
        navigate('/signup')
    }
    return(
        <>
        <NavBar/>
        <div className="container mx-auto max-w-96 md:w-full w-fit flex flex-col text-center aspect-square justify-center my-7 shadow-2xl  border-RoyalBlue p-3 rounded-md">
            <div className="">

        <h1 className="text-2xl">LOGIN</h1>
            </div>
            <form onSubmit={handleLogin} className="flex flex-col gap-2 justify-center mx-3 my-6">
              
                            <input type="text" placeholder="Email" className="px-4 py-2 bg-RoyalBlue  outline-none" value={email} onChange={(e)=>setEmail(e.target.value)} />
                          
                                <input type="password" placeholder="password" className="bg-RoyalBlue px-4 py-2  outline-none " value={password} onChange={(e)=>setPassword(e.target.value)}/>
                       
                                {
                                   error&& <p className="text-red-400">{error}</p>
                                }

                
                                <button className="bg-secondaryYellow  px-24 py-2 mt-3 hover:shadow-2xl text-black  hover:bg-yellow-100 hover:border-secondaryYellow active:bg-slate-400">Login</button>
                                <h3 className="text-sm">Not registered Yet? <span className="text-secondaryYellow underline cursor-pointer" onClick={handleNavigation}>Create Account</span></h3>
                      
            </form>

        </div>
        <ToastContainer position="bottom-center"
        draggable
        autoClose={2000}/>
        </>
    )
}
export default Login