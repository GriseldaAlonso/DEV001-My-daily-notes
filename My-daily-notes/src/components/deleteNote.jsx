import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../config/firebase'

export function DeleteNote ({idLi, userUid, state, setState, getNotes}) {
    const handleBtnDelete = async () => {
        await deleteDoc(doc(db, `notesFrom${userUid}`, idLi));
        getNotes();
        setState(false);
    };
    return (
        <button id={`btnDelete${idLi}`} onClick={handleBtnDelete} className='btnNote'>Delete</button>
    )
}