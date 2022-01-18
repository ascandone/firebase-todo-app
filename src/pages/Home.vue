<script setup lang="ts">
import { ref } from 'vue'

import TodoItem from '../components/TodoItem.vue'
import type { ITodoItem } from '../types'

export interface Props {
  todoItems: ITodoItem[]
}

const props = defineProps<Props>()
</script>

<template>
  <div class="w-screen h-screen bg-zinc-100 px-3">
    <div class="h-4"></div>
    <div>
      <h2 class="font-bold text-4xl">Today</h2>
      <div class="h-1"></div>
      <h4 class="text-gray-600">Friday, May 24</h4>
    </div>
    <div class="h-5"></div>
    <div class="flex flex-col gap-y-4">
      <TodoItem v-for="todoItem in props.todoItems" :item="todoItem" />
    </div>

    <div class="fixed bottom-0 inset-x-0 px-4 py-5">
      <div
        class="border shadow-xl px-5 py-3 rounded-3xl text-gray-400 text-semibold mx-auto max-w-xs"
      >
        Write a new task
      </div>
    </div>
  </div>
</template>
