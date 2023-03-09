import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../config/firebase.js";
import { DeleteNote } from "./deleteNote";
import Modal from "./Modal";
import { FormForNotes } from "./formForNotes";

export default function ShowNotes({ nameUser, userUid }) {

  /*----------  Variables de estado ----------*/
  const [list, setList] = useState([]);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [subId, setSubId] = useState("");

  /*----------  Función para obtener las notas ----------*/
  const getNotes = async () => {
    const docs = [];
    const notesRef = collection(db, `notesFrom${userUid}`);
    const querySnapshot = await getDocs(query(notesRef, orderBy("ts")));
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
      <div id="firstLevel">
        <p id="greeting">Hello, {nameUser}</p>
        <div className="btnModalAdd">
          <label id="labelBtn" htmlFor="btnAdd">Add new note</label>
          <button id="btnAdd" name="btnAdd" onClick={() => setModalAdd(!modalAdd)}>
          <i className='bx bx-plus'></i>
          </button>
        </div>
        <Modal state={modalAdd} setState={setModalAdd} title="">
          <FormForNotes setState={setModalAdd} getNotes={getNotes} />
        </Modal>
      </div>
      {list.length === 0 && <p id="textUl">Notes you add will appear here</p>}
      <ul role={"listitem"}>
        {list.map((el) => (
          <li key={`li${el.id}`} id={el.id}>
            <h2 className="title">{el.title}</h2>
            <pre>
              <p className="bodyNote">{el.text}</p>
            </pre>
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
                onClick={() => {
                  setSubId(el.id);
                  setModalDelete(!modalDelete);
                }}
              >
                Delete
              </button>
            </div>
            {/*Modal para eliminar la nota*/}
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
                    onClick={() => {
                      setModalDelete(false);
                    }}
                  >
                    Cancel
                  </button>
                  <DeleteNote
                    subId={subId}
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
        ))}
      </ul>
    </>
  );
}
