// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider } from 'firebase/auth'

const authProvider = new GoogleAuthProvider()

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD7PX87C64nKwSBS4kOu5piuBwN7t9j740',
  authDomain: 'todoapp-76c9d.firebaseapp.com',
  projectId: 'todoapp-76c9d',
  storageBucket: 'todoapp-76c9d.appspot.com',
  messagingSenderId: '239179805147',
  appId: '1:239179805147:web:55ea0100d942e63f0077fe',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
