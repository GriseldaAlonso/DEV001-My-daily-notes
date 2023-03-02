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
  const [modalAdd, setModalAdd] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [subId, setSubId] = useState("");

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
  }, []);

  return (
    <>
      <ul className="dashboard">
        <div className="btnModalAdd">
          <p>Add new note</p>
          <button id="btnAdd" onClick={() => setModalAdd(!modalAdd)}>
            +
          </button>
        </div>
        <Modal state={modalAdd} setState={setModalAdd} title="">
          <FormForNotes setState={setModalAdd} getNotes={getNotes} />
        </Modal>
        {list.length !== 0 ? (
          list.map((el) => (
            <li key={`li${el.id}`} id={el.id}>
              <h2 className="title">{el.title}</h2>
              <p className="bodyNote">{el.text}</p>
              <p className="ts">{el.ts}</p>
              <div className="btns">
                <button
                  className="btnNote"
                  onClick={() => {
                    setSubId(el.id);
                    setModalEdit(!modalEdit);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btnNote"
                  onClick={() => setModalDelete(!modalDelete)}
                >
                  Delete
                </button>
              </div>
              {/*Modal para editar la nota*/}
              <Modal
                state={modalDelete}
                setState={setModalDelete}
                title="Delete Note"
              >
                <div className="content">
                  <p>Are you sure to delete this note?</p>
                  <div className="btns">
                    <button
                      className="btnCancel"
                      onClick={() => setModalDelete(false)}
                    >
                      Cancel
                    </button>
                    <DeleteNote
                      idLi={el.id}
                      state={modalDelete}
                      setState={setModalDelete}
                      userUid={userUid}
                      getNotes={getNotes}
                    />
                  </div>
                </div>
              </Modal>
              {/*Modal para editar la nota*/}
              <Modal state={modalEdit} setState={setModalEdit} title="">
                <FormForNotes
                  title="Edit Note"
                  subId={subId}
                  setId={setSubId}
                  setState={setModalEdit}
                  getNotes={getNotes}
                >
                  <button
                    className="btnCancel"
                    onClick={() => setModalEdit(false)}
                  >
                    Cancel
                  </button>
                </FormForNotes>
              </Modal>
            </li>
          ))
        ) : (
          <p>Notes you add will appear here</p>
        )}
      </ul>
    </>
  );
}
