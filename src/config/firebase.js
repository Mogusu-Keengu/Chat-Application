// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth"
import {doc, getFirestore, setDoc} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzYomNQgubcAAoEurUhrpYaOzSjdV2w4E",
  authDomain: "chat-app-d8d6b.firebaseapp.com",
  projectId: "chat-app-d8d6b",
  storageBucket: "chat-app-d8d6b.firebasestorage.app",
  messagingSenderId: "331460703767",
  appId: "1:331460703767:web:51110f744d4ab31b124e52",
  measurementId: "G-K6M5WD0XMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const analytics = getAnalytics(app);

const signup = async(username, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await setDoc(doc(db, "users", user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name: "",
            avatar: "",
            bio: "Hey, There i am using chat app",
            lastSeen: Date.now()
        })
        await setDoc(doc(db, "chats", user.uid),{
            chatData: []
        })
    } catch (error) {
        console.error(error)
    }
}