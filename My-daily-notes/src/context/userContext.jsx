import { createContext, useState, useContext, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../config/firebase'

const UserContext = createContext();

export function UserProvider ({children}) {
    const [user, setUser] = useState();

    const signInGoogle = () => {
        const gooogleProvider = new GoogleAuthProvider();
          return signInWithPopup(auth, gooogleProvider);
          
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


    return (
        <UserContext.Provider value={{user, setUser, logOut, signInGoogle}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext); //hook personalizado 