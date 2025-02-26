'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './../../lib/firabase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Define the authentication context type
interface AuthContextType {
  user: User | null;
  role: string | null;
  registerUser: (email: string, password: string, role: string) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => Promise<void>;
  getUserRole: (uid: string) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);

  // Listen to auth state changes and set the user and role
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRole = await getUserRole(currentUser.uid);
      } else {
        setRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Register a new user and save their role to Firestore
  const registerUser = async (email: string, password: string, role: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role,
      });
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  // Log in an existing user and fetch their role
  const loginUser = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userRole = await getUserRole(user.uid);

      setUser(user);
      setRole(userRole);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  // Log out the current user
  const logoutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setRole(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Fetch the user's role from Firestore
  const getUserRole = async (uid: string): Promise<string | null> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data().role;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
  };
  return (
    <AuthContext.Provider value={{ user, role, registerUser, loginUser, logoutUser, getUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
