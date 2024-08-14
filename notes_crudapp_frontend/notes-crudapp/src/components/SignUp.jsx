import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useState } from "react";
import validateEmail from "./Validate";
import axios from "axios";



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

      const response = await axios.post(
        "http://localhost:5000/api/createAccount",
        { username:name, email:email,password: password }
        
      );
     
      console.log(response.data.message)
      setError("");
      if (response.status === 201) {
        alert(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log("error happened:", error);
     alert(error.response.data.message)
     
    }
  };
  const handleNavigation = () => {
    navigate("/");
  };
  return (
    <>
      <NavBar />
      <div className="container flex flex-col justify-center text-center  w-full my-10 border-2 p-3 max-w-screen-sm rounded-lg shadow-xl mx-auto border-RoyalBlue">
        <div className="text-2xl p-2">
          <h1>Registration</h1>
        </div>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col justify-center"
        >
          <table>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-RoyalBlue outline-none m-1 px-4 py-2"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-RoyalBlue px-4 py-2 outline-none"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-RoyalBlue m-1 px-4 py-2 outline-none"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="password"
                    placeholder="rewrite the password"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    className="bg-RoyalBlue px-4 py-2 outline-none"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <button className="bg-secondaryYellow m-4 text-black px-24 py-2">
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
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
};
export default SignUp;
