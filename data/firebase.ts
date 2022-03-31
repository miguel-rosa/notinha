// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAbvWmrnmtBN_CFyqBDHGTw1oiZy0tMvKE',
  authDomain: 'notinhas-37a5c.firebaseapp.com',
  projectId: 'notinhas-37a5c',
  storageBucket: 'notinhas-37a5c.appspot.com',
  messagingSenderId: '524706401335',
  appId: '1:524706401335:web:b2397cbdd5b30f56f743b2',
  measurementId: 'G-5SVGS8E3S6',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
