/* eslint-disable no-unused-vars */
import { signInWithPopup } from 'firebase/auth';
import { get, ref, set, query } from 'firebase/database';
import { auth, db, provider } from '../firebase/initFirebase.jsx';
import React, { useContext, useEffect, useState } from 'react';

const AuthContext = React.createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
      console.log('Auth state changed:', user?.displayName);
    });
    return () => unsubscribe();
  }, []);

  //set up database for every new user
  const setUpPrimaryDatabase = async user => {
    const userId = user.uid;
    var userRef = ref(db, `users/${userId}`);
    // console.log("Its working");
    var userConvoRef = ref(db, `${userId}`);

    try {
      const userData = {
        displayName: user.displayName,
        email: user.email,
      };

      const defaultConvo = {
        Default: {
          user: "what's the capital of Bangladesh?",
          system: 'Dhaka.',
        },
      };

      await set(userRef, userData);
      await set(userConvoRef, defaultConvo);

      console.log('Primary database set up successfully for user:', userId);
    } catch (error) {
      console.error('Error setting up primary database:', error);
      throw error; // Propagate error to caller
    }
  };

  // signup function
  const handleGoogleSignIn = async navigate => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (!result) return;

      // setCurrentUser(result.user);
      console.log(result.user.uid);
      //console.log(currentUser.user.uid); // current wont update immediately, schedules update for next render

      const userRef = ref(db, `${result.user.uid}/Threads`);
      const countQuery = query(userRef);
      const snapshot = await get(countQuery);

      if (!snapshot.exists()) {
        console.log('Setting up new user in database');
        setUpPrimaryDatabase(result.user);
      } else {
        console.log(snapshot.val());
        // const count = snapshot.size;
        // console.log("Number of threads:", count);
      }

      return result;
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  // logout function
  const handleGoogleSignOut = async () => {
    try {
      await auth.signOut();
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    currentUser,
    handleGoogleSignIn,
    handleGoogleSignOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
