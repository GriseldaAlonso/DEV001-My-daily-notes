import { createContext, useState, useContext, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc
} from "firebase/firestore";
import { auth, app } from "../config/firebase";

const UserContext = createContext();

export function UserProvider({ children }) {
  /*----------  variables de estado ----------*/
  const [User, setUser] = useState();

  /*----------  Función que permite autenticar al usuario con google a traves de firebase ----------*/
  const signInGoogle = async () => {
    const gooogleProvider = new GoogleAuthProvider();
    return await signInWithPopup(auth, gooogleProvider);
  };

  /*----------  Función que cierra la sesión del usuario ----------*/
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      const errorMessage = error.message;
      return errorMessage;
    }
  };

  /*----------  Función que observa el estado del usuario ----------*/
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
    });
  }, []);

  /*----------  Funciones y variables relacionadas con firestore ----------*/
  const db = getFirestore(app);

  // Función que guarda las notas en firestore
  const saveNotes = async (userUid, { ...user }) => {
    try {
      return await addDoc(collection(db, `notesFrom${userUid}`), {
        ...user,
      });
    } catch (error) {
      const errorMessage = error.message;
      return errorMessage;
    }
  };

  /*----------  Función para obtener el contenido de una sola nota ----------*/
  const getOneNote = async (userUid, id) => {
    try {
      const docRef = doc(db, `notesFrom${userUid}`, id);
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    } catch (error) {
      const errorMessage = error.message;
      return errorMessage;
    }
  };

  return (
    <UserContext.Provider
      value={{ User, setUser, logOut, signInGoogle, saveNotes, db, getOneNote}}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext); //hook personalizado
