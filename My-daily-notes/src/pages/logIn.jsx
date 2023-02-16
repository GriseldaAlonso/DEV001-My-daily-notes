import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

import blockLogo from "../assets/notes.png";
import googleIcon from "../assets/googleIcon.svg";
import "./logIn.css";

export default function Login () {
  const { user, signInGoogle } = useUserContext();
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    await signInGoogle();
    navigate('/home');
  };

  return (
    <>
      <h1 className="welcome">Welcome to</h1>
      <img className="logo" src={blockLogo} alt="block of paper for notes" />
      <h1 className="mainTitle">My Daily Notes</h1>
      <button className="btn">
        Signin with
        <img
          onClick={handleGoogleLogin}
          className="googleIcon"
          src={googleIcon}
          alt="google logo"
        />
      </button>
    </>
  )
}