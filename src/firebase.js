import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZF_0cVjUQzxcQWuiD5kaqoKMkaxHOuf0",
  authDomain: "netflix-clone-d3f23.firebaseapp.com",
  projectId: "netflix-clone-d3f23",
  storageBucket: "netflix-clone-d3f23.firebasestorage.app",
  messagingSenderId: "770024850721",
  appId: "1:770024850721:web:cea4ea64ac3614dda6aa60"
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
    alert(error.message); 
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User successfully logged in!");
  } catch (error) {
    console.error("Login error:", error.message);
    alert(error.message);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    console.log("User successfully logged out!");
  } catch (error) {
    console.error("Logout error:", error.message);
    alert(error.message);
  }
};

export { auth, db, login, signup, logout };
