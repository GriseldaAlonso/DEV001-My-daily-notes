import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase.js";

export function DeleteNote({ subId, userUid, setState, getNotes }) {
  const handleBtnDelete = async () => {
    await deleteDoc(doc(db, `notesFrom${userUid}`, subId));
    getNotes();
    setState(false);
  };
  return (
    <button
      id={`btnDelete${subId}`}
      onClick={handleBtnDelete}
      className="btnAction"
    >
      Delete
    </button>
  );
}
