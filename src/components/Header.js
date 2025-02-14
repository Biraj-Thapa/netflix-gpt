import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("error");
      });
  };
  useEffect(() => {

   const unSubscribe= onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return ()=>unSubscribe()
  }, []);
  return (
    <div className="absolute px-7 py-3 bg-gradient-to-b from-black to-transparent top-0 w-full z-10 flex justify-between items-center">
      <img
        className="w-40"
        src={LOGO}
        alt="logo"
      />
      {user && (
        <div className="flex items-center space-x-3">
          <img className="w-10" src={user?.photoURL} alt="user-Icon"></img>
          <button
            onClick={handleSignOut}
            className="text-white font-extrabold text-lg"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
