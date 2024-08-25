import { useState } from "react"
import NavBar from "./NavBar"
import validateEmail from "./Validate"
import { useNavigate } from "react-router-dom"
import { auth } from "./Firebase"
import { signInWithEmailAndPassword } from "firebase/auth"

const Login=()=>{
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[error,setError]=useState('')
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
          
           navigate(`/home/${User.uid}`)
        }
        catch(error){
           
            console.log("error in login:",error)
        }
    }
   const  handleNavigation=()=>{
        navigate('/signup')
    }
    return(
        <>
        <NavBar/>
        <div className="container mx-auto w-full flex flex-col text-center  justify-center my-20 shadow-2xl  border-RoyalBlue p-4 rounded-md">
            <div className="">

        <h1 className="text-2xl">LOGIN</h1>
            </div>
            <form onSubmit={handleLogin} className="flex flex-col justify-center mx-3 my-6">
                <table>
                    <tbody>
                        <tr>
                            <td><input type="text" placeholder="Email" className="px-4 py-2 bg-RoyalBlue m-1 outline-none" value={email} onChange={(e)=>setEmail(e.target.value)} />
                           </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="password" placeholder="password" className="bg-RoyalBlue px-4 py-2 outline-none " value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {
                                   error&& <p className="text-red-400">{error}</p>
                                }

                
                                <button className="bg-secondaryYellow m-2 px-24 py-2 mt-5 hover:shadow-2xl text-black  hover:bg-yellow-100 hover:border-secondaryYellow active:bg-slate-400">Login</button>
                                <h3 className="text-sm">Not registered Yet? <span className="text-secondaryYellow underline cursor-pointer" onClick={handleNavigation}>Create Account</span></h3>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>

        </div>
        </>
    )
}
export default Login