import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeFirebase, googleSignIn, emailSignIn, logOut, isLoggedIn, loggedInUser } from 'daitanjs/authentication';

// Create the Firebase context
const FirebaseContext = createContext();

// Firebase provider component
export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Store logged-in user
  const [loading, setLoading] = useState(true);  // Track loading state

  // Initialize Firebase when the provider is mounted
  useEffect(() => {
    initializeFirebase();

    // Check if user is logged in initially
    isLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        loggedInUser().then((userData) => {
          setUser(userData); // Set logged-in user
        });
      }
      setLoading(false); // Stop loading after checking auth status
    });
  }, []);

  // Sign in with email and password
  const signInWithEmail = async (email, password) => {
    const loggedInUser = await emailSignIn(email, password);
    setUser(loggedInUser);
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    const loggedInUser = await googleSignIn();
    setUser(loggedInUser);
  };

  // Logout
  const signOut = async () => {
    await logOut();
    setUser(null);  // Clear user on logout
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        loading,
        signInWithEmail,
        signInWithGoogle,
        signOut,
      }}
    >
      {!loading && children} {/* Render children after loading is done */}
    </FirebaseContext.Provider>
  );
};

// Custom hook to use the Firebase context
export const useFirebase = () => useContext(FirebaseContext);
