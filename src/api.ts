// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

import { User } from 'firebase/auth'
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  where,
  writeBatch,
} from 'firebase/firestore'
import { Payload } from './components/EditForm.vue'
import { ITodoItem } from './types'

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

const db = getFirestore()

export async function setFavorite(id: string, favorited: boolean) {
  const batch = writeBatch(db)

  batch.update(doc(db, 'todos', id), {
    favorited,
  })

  batch.commit()
}

export async function setCompleted(id: string, completed: boolean) {
  const batch = writeBatch(db)

  batch.update(doc(db, 'todos', id), {
    completed,
  })

  batch.commit()
}

export async function deleteTask(id: string) {
  deleteDoc(doc(db, 'todos', id))
}

export async function addTask(
  todosRef: CollectionReference<ITodoItem>,
  user: User,
  payload: Payload
) {
  addDoc(todosRef, {
    uid: user.uid,
    title: payload.title,
    createdAt: serverTimestamp(),
    completed: false,
    favorited: false,
    ...(payload.description === undefined
      ? {}
      : { description: payload.description }),
  })
}

export async function editTask(id: string, payload: Payload) {
  const batch = writeBatch(db)

  batch.update(doc(db, 'todos', id), {
    title: payload.title,
    ...(payload.description === undefined
      ? {}
      : { description: payload.description }),
  })

  batch.commit()
}
