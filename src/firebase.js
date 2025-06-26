import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    console.log("User successfully signed up!");
  } catch (error) {
    console.error("Signup error:", error.message);
    toast.error(
      error.message.split('/')[1].split('-').join(" ").replace(/\).$/, "")
    );
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User successfully logged in!");
  } catch (error) {
    console.error("Login error:", error.message);
    toast.error(
      error.message.split('/')[1].split('-').join(" ").replace(/\).$/, "")
    );
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    console.log("User successfully logged out!");
  } catch (error) {
    console.error("Logout error:", error.message);
    toast.error(
      error.message.split('/')[1].split('-').join(" ").replace(/\).$/, "")
    );
  }
};

export { auth, db, login, signup, logout };
