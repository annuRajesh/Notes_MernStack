import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useState } from "react";
import validateEmail from "./Validate";
import axios from "axios";
import {auth } from './Firebase'
import { createUserWithEmailAndPassword,updateProfile} from "firebase/auth";

localStorage.removeItem('username')

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!email || !name || !password || !rePassword) {
        setError("all fields are required to fill");
        return;
      }
      if (!validateEmail(email)) {
        setError("Enter valid email address");
        return;
      }
      if (password.length < 8) {
        setError("password must have atleast 8 characters");
        return;
      }
      if (!/^[A-Z]/.test(password)) {
        setError("password must begin with a capital letter");
        return;
      }
      if (password != rePassword) {
        setError("password retyped not a match");
        return;
      }

     const userCredentials=await createUserWithEmailAndPassword(auth,email,password)
     const user=userCredentials.user
     await updateProfile(user, { displayName: name });
     console.log("User display name:", user.displayName);
      setError("");
      navigate('/')
    } catch (error) {
      alert("registration successful")
      console.log("error happened:", error);
     
     
    }
  };
  const handleNavigation = () => {
    navigate("/");
  };
  return (
    <>
      <NavBar />
      <div className="container flex flex-col justify-center text-center max-w-96 aspect-square  md:w-full my-10  p-3 w-fit rounded-lg shadow-xl mx-auto border-RoyalBlue">
        <div className="text-2xl p-2">
          <h1>Registration</h1>
        </div>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-2 "
        >
         
                  <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-RoyalBlue outline-none  px-4 py-2"
                  />
              
                  <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-RoyalBlue px-4 py-2 outline-none"
                  />
             
                  <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-RoyalBlue  px-4 py-2 outline-none"
                  />
             
                  <input
                    type="password"
                    placeholder="rewrite the password"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    className="bg-RoyalBlue px-4 py-2 outline-none"
                  />
              
                  <button className="bg-secondaryYellow mt-5 text-black px-24 py-2">
                    Sign Up
                  </button>
                  {error && <p className="text-sm text-red-400">{error}</p>}
                  <p className="text-sm">
                    Already registered?
                    <span
                      className="text-secondaryYellow underline cursor-pointer"
                      onClick={handleNavigation}
                    >
                      Login
                    </span>
                  </p>
             
        </form>
      </div>
    </>
  );
};
export default SignUp;
