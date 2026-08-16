// ============================================================
// STEP: Paste your own Firebase keys here.
// You will get these from the Firebase Console (see README.md).
// Do NOT change anything else in this file.
// ============================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyB_Tzpt67BM52Egb9XNrDMFQgfUMlVtZsU",
  authDomain: "srsfmhca-portal.firebaseapp.com",
  projectId: "srsfmhca-portal",
  storageBucket: "srsfmhca-portal.firebasestorage.app",
  messagingSenderId: "427923691545",
  appId: "1:427923691545:web:9202635d459e98128ff288"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp
};
