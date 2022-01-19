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
  <div class="px-4 py-4 max-w-md">
    <h2 class="font-bold text-2xl">Create task</h2>

    <div class="h-3"></div>

    <EditForm
      @submit="handleSubmit"
      submit-label="Create"
      initial-title=""
      initial-description=""
    />
  </div>
</template>
