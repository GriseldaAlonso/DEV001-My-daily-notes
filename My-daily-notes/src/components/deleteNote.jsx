import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../config/firebase'

export function DeleteNote ({idLi, userUid, state, setState}) {
    const handleBtnDelete = async () => {
        await deleteDoc(doc(db, `notesFrom${userUid}`, idLi));
        setState(false);
    };
    return (
        <button id={`btnDelete${idLi}`} onClick={handleBtnDelete} className='btnNote'>Delete</button>
    )
}