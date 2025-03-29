import { initializeApp } from "firebase/app";
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut
} from 'firebase/auth'
import { 
  addDoc, 
  collection, 
  getFirestore 
} from 'firebase/firestore'
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBc9mKAtSWhHaivaqE67SJcsjSWTGqYvMc",
  authDomain: "netflix-shubhamraj-s.firebaseapp.com",
  projectId: "netflix-shubhamraj-s",
  storageBucket: "netflix-shubhamraj-s.firebasestorage.app",
  messagingSenderId: "814643007101",
  appId: "1:814643007101:web:d479a96cb83ded3973ab14"
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
  } catch (err) {
    console.log(err);
    toast.error(err.code.split('/')[1].split('-').join(" "));
  }
}

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    console.log(err)
    toast.error(err.code.split('/')[1].split('-').join(" "));
  }
}

const logout = () => {
  signOut(auth)
}

export {auth, db, login, signup, logout}