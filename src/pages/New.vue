<script setup lang="ts">
import { useTodoItems } from '@/stores/todoItems'
import { useRouter } from 'vue-router'
import EditForm, { Payload } from '../components/EditForm.vue'

const itemsStore = useTodoItems()
const router = useRouter()
function handleSubmit(payload: Payload) {
  itemsStore.addTodo(payload.title, payload.description)
  router.push('/')
}
</script>
<template>
  <EditForm
    header="Create task"
    submit-label="Create"
    initial-title=""
    initial-description=""
    @submit="handleSubmit"
  />
</template>
