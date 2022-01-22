<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { doc, getDoc, getFirestore, writeBatch } from 'firebase/firestore'

import EditForm, { Payload } from '../components/EditForm.vue'
import { ITodoItem } from '@/types'

const route = useRoute()
const router = useRouter()

const db = getFirestore()
const itemRef = doc(db, 'todos', route.params.id as string)
const itemData = ref<ITodoItem | undefined>(undefined)

onMounted(async () => {
  // TODO handle err
  const res = await getDoc(itemRef)
  const d = res.data()
  itemData.value = d as ITodoItem
})

function handleSubmit(payload: Payload) {
  const batch = writeBatch(db)

  batch.update(itemRef, {
    title: payload.title,
    ...(payload.description === undefined
      ? {}
      : { description: payload.description }),
  })

  batch.commit()
  router.push('/')
}
</script>
<template>
  <div v-if="itemData !== undefined">
    <EditForm
      header="Edit task"
      submit-label="Save"
      :initial-title="itemData.title"
      :initial-description="itemData.description"
      @submit="handleSubmit"
    />
  </div>
  <div v-else>Item not found</div>
</template>
