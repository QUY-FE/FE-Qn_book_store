import { createContext, useContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword , GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config";


const AuthContext = createContext();
export const UseAuth = () => {
    return useContext(AuthContext);
}
const googleProvider = new GoogleAuthProvider();

export const AuthProvide = ({children}) => {
    const [currentUser , setCurrentUser] = useState(null);
    const [loadings, setLoandings] = useState(true);
    
    const registerUser = async (email,password) => {
        return await createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }
    const signInWithGoogle = async( ) => {
        return await signInWithPopup(auth, googleProvider);
    }
    const logout = async() => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth,(user) => {
            setCurrentUser(user);
            setLoandings(false)
            if(user) {
                const { email, displayName, photoURL} = user;
                const userData = {
                    email,
                    userName: displayName,
                    photo: photoURL,
                }
            }
        })
        return () => unsubcribe();
    },[])

    const value = {
        currentUser,
        loadings,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}