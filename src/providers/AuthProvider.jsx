/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import axios from 'axios'
import { app } from '../Firebase/firebase.config'
import useAxiosPublic from '../Hooks/useAxiosPublic'


export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const logIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const resetPassword = email => {
    setLoading(true)
    return sendPasswordResetEmail(auth, email)
  }

  const logOut = async () => {
    setLoading(true)
   
    return signOut(auth)
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }
  

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      // console.log('------>', currentUser);
      if (currentUser) {
        //get token and store client
        const userInfo = {email : currentUser.email};
        axiosPublic.post('/jwt', userInfo)
        .then(res =>{
          if(res.data.token){
              localStorage.setItem('access-token', res.data.token);
              setLoading(false);

          }
      })
        
      }else{
        localStorage.removeItem('access-token');
        setLoading(false);
      }
      
    })
    return () => {
      return unsubscribe()
    }
  }, [axiosPublic])

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    logIn,
    signInWithGoogle,
    resetPassword,
    logOut,
    updateUserProfile,
    setUser
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
      </AuthContext.Provider>
  )
}



export default AuthProvider