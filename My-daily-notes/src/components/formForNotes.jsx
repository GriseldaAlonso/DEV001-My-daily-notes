import { useState } from "react";
import { useUserContext } from "../context/userContext";

export function FormForNotes() {
  /*----------  Variables de contexto ----------*/
  const { User, saveNotes } = useUserContext();

  /*----------  Constantes necesarias para almacenar fecha y hora en que se creo la nota ----------*/
  const ts = new Date();
  const currentDate = ts.toLocaleString();

  /*----------  Valores Iniciales ----------*/
  const initialValue = {
    title: "",
    text: "",
    ts: "",
  };

  /*----------  Variable de estado ----------*/
  const [user, setUser] = useState(initialValue);

  /*----------  Función que captura contenido del input y textArea ----------*/
  const dataCapture = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, ts: currentDate });
  };

  /**
  ----------  Función para guardar las notas en firestore ----------
      *setUser({...initialValue}) -> resetea los campos del formulario
  */
  const saveData = (e) => {
    e.preventDefault();
    const userUid = User.uid;
    saveNotes(userUid, { ...user });
    setUser({ ...initialValue });
  };

  return (
    <>
      <form onSubmit={saveData}>
        <label htmlFor="title">Add new note</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          required="required"
          onChange={dataCapture}
          value={user.title}
        />
        <textarea
          name="text"
          id="text"
          cols="30"
          rows="10"
          placeholder="Note"
          required="required"
          onChange={dataCapture}
          value={user.text}
        />
        <button className="btn">Save</button>
      </form>
    </>
  );
}
