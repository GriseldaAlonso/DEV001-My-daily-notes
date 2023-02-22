import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useUserContext } from "../context/userContext";
import { db } from "../config/firebase";
import { DeleteNote } from "./deleteNote";

export default function ShowNotes() {
    /*----------  Variables de contexto ----------*/
  const { User } = useUserContext();


  /*----------  Variables de estado ----------*/
  const [list, setList] = useState([]);
  const userUid = User.uid;


  /*----------  Función para obtener las notas ----------*/
  const getNotes = async () => {
    const docs = [];
    const querySnapshot = await getDocs(collection(db, `notesFrom${userUid}`));
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setList(docs);
  };

  useEffect(() => {
    getNotes();
  }, [list]);

  return (
    <ul className="dashboard">
      {list.length !== 0 ? (
        list.map((el) => (
          <li id={el.id}>
            <h2 className="title">{el.title}</h2>
            <p className="bodyNote">{el.text}</p>
            <p className="ts">{el.ts}</p>
            <div>
                <DeleteNote idLi={el.id}/>
            </div>
          </li>
        ))
      ) : (
        <p>Notes you add will appear here</p>
      )}
    </ul>
  );
}
