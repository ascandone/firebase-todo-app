<script setup lang="ts">
import { useTodoItems } from '@/stores/todoItems'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import EditForm from '../components/EditForm.vue'

const route = useRoute()
const itemsStore = useTodoItems()

const item = computed(() =>
  itemsStore.todoItems.find((item) => String(item.id) === route.params.id)
)
</script>
<template>
  <div v-if="item !== undefined">
    <div class="px-4 py-4 max-w-md">
      <h2 class="font-bold text-2xl">Create task</h2>

      <div class="h-3"></div>

      <EditForm
        submit-label="Save"
        :initial-title="item.title"
        :initial-description="item.description"
      />
    </div>
  </div>
  <div v-else>Item not found</div>
</template>
