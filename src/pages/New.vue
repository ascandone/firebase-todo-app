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
import { RemoteLoading } from '@/remoteLoading'

const db = getFirestore()
const todosRef = collection(db, 'todos')

const creationResponse = ref<RemoteLoading>({ type: 'NOT_ASKED' })

const itemsStore = useTodoItems()
const router = useRouter()
async function handleSubmit(user: User, payload: Payload) {
  creationResponse.value = { type: 'LOADING' }

  // TODO handle err
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
