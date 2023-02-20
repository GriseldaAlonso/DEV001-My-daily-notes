import { createContext, useState, useContext, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore'; /**'getDocs' para petición por get, 'doc' para hacer una sola petición, 'deleteDoc' para eliminar el documento, 'getDoc' petición a un solo documento, 'setDoc' para solicitar la actualización */
import { auth, app } from '../config/firebase';

const UserContext = createContext();

export function UserProvider ({children}) {
    const [user, setUser] = useState();

    const signInGoogle = async () => {
        const gooogleProvider = new GoogleAuthProvider();
          return await signInWithPopup(auth, gooogleProvider);
          
      };

    const logOut = async () => {
        try {
          await signOut(auth);
        } catch (error) {
          const errorMessage = error.message;
          return errorMessage;
        }
      } 
    
    useEffect(() => {
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log(currentUser);
        });
    }, []);

    const db = getFirestore(app);

    const saveNotes = async ({...user}) => {
      try {
        return await addDoc(collection(db, 'notes'), {
          ...user
        });
      } catch (error) {
        const errorMessage = error.message;
        return errorMessage; 
      }
    }


    return (
        <UserContext.Provider value={{user, setUser, logOut, signInGoogle, saveNotes}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext); //hook personalizado 