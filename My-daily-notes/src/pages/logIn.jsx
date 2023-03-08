import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import noteBook from "../assets/noteBook.jpg" 
import blockLogo from "../assets/notes.png";
import googleIcon from "../assets/googleIcon.svg";
import "./logIn.css";

export default function Login() {
  // VAriable de contexto
  const { signInGoogle } = useUserContext();

  // Variable para la nevagación entre rutas
  const navigate = useNavigate();

  // Función que maneja el evento click del boton de inicio de sesión
  const handleGoogleLogin = async () => {
    await signInGoogle();
    navigate("/notes");
  };

  return (
      <>
        <h1 className="welcome">Welcome to</h1>
        <img className="logo" src={blockLogo} alt="block of paper for notes" />
        <h1 className="mainTitle">My Daily Notes</h1>
        <button className="btn" onClick={handleGoogleLogin}>
          Signin with
          <img className="googleIcon" src={googleIcon} alt="google logo" />
        </button>
      </>
  );
}
