import checkValidData from "../utils/validate";
import Header from "./Header";
import { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND } from "../utils/constants";
import { USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch=useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);


  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value,
      photoURL: {USER_AVATAR},
    })
      .then(() => {
        const {uid,email,displayName,photoURL}=auth.currentUser;
        dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))

      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
    console.log(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + errorMessage);
  });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={BACKGROUND}
          alt="background"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 z-10 bg-opacity-80 text-white "
      >
        <h1 className="font-extrabold font text-3xl py-3 ">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
          ref={name}
            type="text"
            placeholder="Enter your name"
            className="p-4 my-3 w-full bg-gray-600 rounded-lg"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email or mobile number"
          className="p-4 my-3 w-full bg-gray-600 rounded-lg"
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-4 my-3 w-full bg-gray-600 rounded-lg"
        />
        <p className="text-red-700 font-bold text-center">{errorMessage}</p>
        <button
          className="text-center p-4 my-6 bg-red-800 opacity-100 w-full rounded-lg"
          onClick={handleButtonClick}
        >
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
