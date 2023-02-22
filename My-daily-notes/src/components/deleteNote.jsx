import { useUserContext } from '../context/userContext';
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../config/firebase'

export function DeleteNote ({idLi}) {
    const {User} = useUserContext();
    const userUid = User.uid;


    const handleBtnDelete = async () => {
        await deleteDoc(doc(db, `notesFrom${userUid}`, idLi))
    };
    return (
        <button id={`btnDelete${idLi}`} onClick={handleBtnDelete} className='btnNote'>Delete</button>
    )
}