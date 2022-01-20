<script setup lang="ts">
import { useTodoItems } from '@/stores/todoItems'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import EditForm, { Payload } from '../components/EditForm.vue'

const route = useRoute()
const router = useRouter()
const itemsStore = useTodoItems()

const item = computed(() =>
  itemsStore.todoItems.find((item) => String(item.id) === route.params.id)
)

function handleSubmit(payload: Payload) {
  itemsStore.updateTodo(route.params.id as string, payload)
  router.push('/')
}
</script>
<template>
  <div v-if="item !== undefined">
    <EditForm
      header="Edit task"
      submit-label="Save"
      :initial-title="item.title"
      :initial-description="item.description"
      @submit="handleSubmit"
    />
  </div>
  <div v-else>Item not found</div>
</template>
