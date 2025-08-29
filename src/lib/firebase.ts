import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  "projectId": "giggle-garden-cwqmt",
  "appId": "1:648582438278:web:a727b59add98f90f406007",
  "storageBucket": "giggle-garden-cwqmt.firebasestorage.app",
  "apiKey": "AIzaSyBtFhlHg08Gu3z9RoGUZtKtKpDqPb2pDXc",
  "authDomain": "giggle-garden-cwqmt.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "648582438278"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
