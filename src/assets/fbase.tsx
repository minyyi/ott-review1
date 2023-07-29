import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // apiKey: "AIzaSyAb0gIcPPglh5lrjw0V63PBu_Wq-KZsPe0",
  // authDomain: "miny-1.firebaseapp.com",
  // projectId: "miny-1",
  // storageBucket: "miny-1.appspot.com",
  // messagingSenderId: "272478030559",
  // appId: "1:272478030559:web:198f916cd265d41c70376a",
  // measurementId: "G-0NK1DF7CB0",
  apiKey: 'AIzaSyDk9MlZL-KjPXKHNEnQtE0d4dGsLJCynR8',
  authDomain: 'otttest-7a437.firebaseapp.com',
  projectId: 'otttest-7a437',
  storageBucket: 'otttest-7a437.appspot.com',
  messagingSenderId: '818827160916',
  appId: '1:818827160916:web:8ee883b63075b7e4802cc1',
  measurementId: 'G-DKZ0N1C30E',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, db, storage };
