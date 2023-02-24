import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useUserContext } from "../context/userContext";
import { db } from "../config/firebase";
import { DeleteNote } from "./deleteNote";
import Modal from "./Modal";
import { FormForNotes } from "./formForNotes";

export default function ShowNotes() {
  /*----------  Variables de contexto ----------*/
  const { User } = useUserContext();
  const userUid = User.uid;

  /*----------  Variables de estado ----------*/
  const [list, setList] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [subId, SetSubId] = useState("");

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

  /*----------  Función para obtener la nota a editar ----------*/

  return (
    <ul className="dashboard">
      {list.length !== 0 ? (
        list.map((el) => (
          <div key={`div${el.id}`}>
            <li key={`li${el.id}`} id={el.id}>
              <h2 className="title">{el.title}</h2>
              <p className="bodyNote">{el.text}</p>
              <p className="ts">{el.ts}</p>
              <div>
                <button onClick={() => setModalEdit(!modalEdit)}>Edit</button>
                <button onClick={() => setModalDelete(!modalDelete)}>
                  Delete
                </button>
              </div>
            </li>

            {/*Modal para editar la nota*/}
            <Modal
              state={modalDelete}
              setState={setModalDelete}
              title="Delete Note"
            >
              <div className="content">
                <p>Are you sure to delete this note?</p>
                <div className="btns">
                  <button onClick={() => setModalDelete(false)}>Cancel</button>
                  <DeleteNote
                    idLi={el.id}
                    state={modalDelete}
                    setState={setModalDelete}
                    userUid={userUid}
                  />
                </div>
              </div>
            </Modal>
            {/*Modal para editar la nota*/}
            <Modal
              state={modalEdit}
              setState={setModalEdit}
              title=""
            >
              <FormForNotes title="Edit Note">
                <button>Cancel</button>
              </FormForNotes>
            </Modal>
          </div>
        ))
      ) : (
        <p>Notes you add will appear here</p>
      )}
    </ul>
  );
}
