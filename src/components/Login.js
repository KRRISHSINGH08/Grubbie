import {
  signInWithPopup,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { app } from "../auth/Firebase";
import { useEffect, useState } from "react";
import { ProfileButton } from "./ProfileButton";
import { Sidebar } from "./Sidebar";

export const Login = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [userInfo, setUserInfo] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const signin = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        setUserInfo(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const signout = () => {
    signOut(auth)
      .then(() => {
        setUserInfo(null);
      })
      .catch((error) => {
      });
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(()=>{
    if(isOpen){
      document.body.classList.add("overflow-hidden");
    }
    else {
      document.body.classList.remove("overflow-hidden")
    }
    return () => document.body.classList.remove("overflow-hidden")
  }, [isOpen])

  return (
    <div className="flex items-center">
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={toggleSidebar}></div>
      )}
      <ProfileButton userInfo={userInfo} toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} userInfo={userInfo} signout={signout} signin={signin} />
    </div>
  );
};
