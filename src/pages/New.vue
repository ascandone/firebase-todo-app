<script setup lang="ts">
import { useTodoItems } from '@/stores/todoItems'
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from 'firebase/firestore'
import { useRouter } from 'vue-router'
import EditForm, { Payload } from '../components/EditForm.vue'
import WithAuth from '@/components/WithAuth.vue'
import { User } from 'firebase/auth'
import { ref } from 'vue'

type AuthResponse =
  | { type: 'NOT_ASKED' }
  | { type: 'LOADING' }
  | { type: 'GOT_ERROR'; message: string }

const db = getFirestore()
const todosRef = collection(db, 'todos')

const creationResponse = ref<AuthResponse>({ type: 'NOT_ASKED' })

const itemsStore = useTodoItems()
const router = useRouter()
async function handleSubmit(user: User, payload: Payload) {
  creationResponse.value = { type: 'LOADING' }

  // TODO handle err
  const res = await addDoc(todosRef, {
    uid: user.uid,
    title: payload.title,
    description: payload.description,
    createdAt: serverTimestamp(),
    completed: false,
    favorited: false,
  })

  console.log(res)
  router.back()
}
</script>
<template>
  <WithAuth>
    <template #default="{ user }">
      <EditForm
        header="Create task"
        submit-label="Create"
        initial-title=""
        initial-description=""
        @submit="(payload) => handleSubmit(user, payload)"
      />
    </template>
  </WithAuth>
</template>
