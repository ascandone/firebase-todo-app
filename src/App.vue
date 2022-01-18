<script setup lang="ts">
import Home from './pages/Home.vue'
import Edit from './pages/Edit.vue'

import { ITodoItem } from '@/types'
import { ref } from 'vue'

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
  <Edit :item="todoItems[0]" />
</template>
