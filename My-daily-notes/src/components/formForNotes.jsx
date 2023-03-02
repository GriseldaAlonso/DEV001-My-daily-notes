import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useUserContext } from "../context/userContext";

export function FormForNotes({
  title = "Add new note",
  children,
  subId,
  setState,
  getNotes
}) {
  /*----------  Variables de contexto ----------*/
  const { User, saveNotes, db, upDateNote} = useUserContext();
  const userUid = User.uid;

  /*----------  Constantes necesarias para almacenar fecha y hora en que se creó la nota ----------*/
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
    saveNotes(userUid, { ...user });
    getNotes();
    setUser({ ...initialValue });
    setState(false)
  };

  /*----------  Función para obtener el contenido de una sola nota ----------*/
  const getOneNote = async (uid, id) => {
    try {
      const docRef = doc(db, `notesFrom${uid}`, id);
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data());
    } catch (error) {
      const errorMessage = error.message;
      return errorMessage;
    }
  };

  useEffect(() => {
    if (subId !== "") {
      getOneNote(userUid, subId);
    }
  }, [subId]);

  return (
    <>
      <form onSubmit={saveData}>
        <label htmlFor="title">{title}</label>
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
        {children ? (
          <div className="btns">
            {children}
            <button
              className="btnNote"
              onClick={() => {
                upDateNote(userUid, subId, { ...user });
                getNotes();
                setState(false);
              }}
            >
              Update
            </button>
          </div>
        ) : (
          <button className="btn">Save</button>
        )}
      </form>
    </>
  );
}
