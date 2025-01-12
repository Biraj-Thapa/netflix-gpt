import Header from "./Header";
import { useState } from "react";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/2f5a878d-bbce-451b-836a-398227a34fbf/web/NP-en-20241230-TRIFECTA-perspective_acd1cbae-4550-4b2e-8c13-9e34d37c2300_large.jpg"
          alt="background"
        />
      </div>
      <form className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 z-10 bg-opacity-80 text-white ">
        <h1 className="font-extrabold font text-3xl py-3 ">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
       { !isSignInForm &&<input
          type="text"
          placeholder="Enter your name"
          className="p-4 my-4 w-full bg-gray-600 rounded-lg"
        />}
        <input
          type="text"
          placeholder="Email or mobile number"
          className="p-4 my-4 w-full bg-gray-600 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-600 rounded-lg"
        />
        <button className="text-center p-4 my-6 bg-red-800 opacity-100 w-full rounded-lg">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer " onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign up now."
            : "Already a User? sign in now"}
        </p>
      </form>
    </div>
  );
};
export default Login;
