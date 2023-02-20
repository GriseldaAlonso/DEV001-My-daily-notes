import { useState } from 'react';
import { useUserContext } from '../context/userContext'

export function FormForNotes () {

  const {saveNotes} = useUserContext();
  
  /*----------  Constantes necesarias para almacenar fecha y hora en que se creo la nota ----------*/
  const ts = new Date();
  const currentDate = ts.toLocaleString();

  const initialValue = {
    title: '',
    text: '',
    ts: '',
  };

  const [user, setUser] = useState(initialValue);

  const dataCapture = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]:value, ts: currentDate})
  }

  /**
  ----------  Función para guardar las notas en firestore ----------
      *setUser({...initialValue}) -> resetea los campos del formulario
  */
  const saveData = (e) => {
    e.preventDefault();
    saveNotes({...user});
    setUser({...initialValue})
  }

    return (
        <>
          <button></button>
          <form onSubmit={saveData}>
            <label htmlFor="title">Add new note</label>
            <input type="text" name="title" id="title" placeholder="Title" required='required' onChange={dataCapture} value={user.title} />
            <textarea name="text" id="text" cols="30" rows="10" placeholder="Note" required='required' onChange={dataCapture} value={user.text} />
            <button className="btn">Save</button>
          </form>
        </>
    );
}

