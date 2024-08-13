import { useNavigate } from "react-router-dom"
import NavBar from "./NavBar"

const SignUp=()=>{
    const navigate=useNavigate()
    const handleNavigation=()=>{
     navigate('/login')

    }
    return(
        <>
        <NavBar/>
        <div className="container flex flex-col justify-center text-center mx-auto my-10 border-2 p-3 max-w-screen-sm rounded-lg shadow-xl border-RoyalBlue">
            <div className="text-2xl p-2">

            <h1>Registration</h1>
            </div>
            <form action="" className="flex flex-col justify-center">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" placeholder="name" className="bg-RoyalBlue outline-none m-1 px-4 py-2"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" placeholder="email" className="bg-RoyalBlue px-4 py-2 outline-none"/>
                            </td>
                        </tr>
                        <tr>
                            <td>

                            <input type="password" placeholder="password" className="bg-RoyalBlue m-1 px-4 py-2 outline-none"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="password" placeholder="rewrite the password" className="bg-RoyalBlue px-4 py-2 outline-none" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className="bg-secondaryYellow m-4 text-black px-24 py-2">Sign Up</button>
                                <p className="text-sm">Already registered?<span className="text-secondaryYellow underline cursor-pointer" onClick={handleNavigation}>Login</span></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
        </>
    )
}
export default SignUp