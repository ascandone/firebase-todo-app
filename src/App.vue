<script setup lang="ts">
import Checkbox from './components/TodoItem.vue'

import { ref } from 'vue'
import TodoItem from './components/TodoItem.vue'
import type { ITodoItem } from './types'

const createInputText = ref('')

const todoItems = ref<ITodoItem[]>([
  {
    title: 'Learn firestore',
    completed: false,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, nostrum ipsum dolor sit amet.',
    favorited: false,
  },
  {
    title: 'Learn firestore',
    completed: false,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, nostrum ipsum dolor sit amet.',
    favorited: true,
    date: 'TODO',
  },
  {
    title: 'Learn vue.js',
    completed: false,
    favorited: true,
  },
  {
    title: 'Implement my app',
    completed: false,
    favorited: true,
    date: 'TODO',
  },
])
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
      <TodoItem v-for="todoItem in todoItems" :item="todoItem" />
    </div>

    <!-- <label class="flex items-center gap-x-3 select-none group cursor-pointer">
      Checkbox label
    </label> -->

    <!-- <form @submit.prevent="onSubmit">
      <input type="text" v-model="createInputText" class="border" />
      <button type="submit">Submit</button>
    </form>
    <ul>
      <li>First item</li>
      <li>Second item</li>
    </ul> -->

    <div class="fixed bottom-0 inset-x-0 px-4 py-5">
      <div
        class="border shadow-xl px-5 py-3 rounded-3xl text-gray-400 text-semibold mx-auto max-w-xs"
      >
        Write a new task
      </div>
      <!-- <input type="text" class="border" /> -->
    </div>
  </div>
</template>
