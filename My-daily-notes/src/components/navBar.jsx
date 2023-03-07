import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  /*----------  Variables de contexto y estado ----------*/
  const { User, logOut } = useUserContext();

  // Variable para la navegación entre rutas
  const navigate = useNavigate();

  // Función que maneja el evento click en el boton para cerrar sesión
  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  return (
    <nav>
      {/*Condicional que evalúa el estado de usuario para mostrar componentes en rutas protegidas */}
      {User && (
        <>
          <NavLink className="navLinks" to="/notes">
            My Daily Notes
          </NavLink>
          <button id="logOut" onClick={handleLogout}>
            Log Out
          </button>
        </>
      )}
    </nav>
  );
};
