<script setup lang="ts">
import { useTodoItems } from '../stores/todoItems'
import TodoItem from '../components/TodoItem.vue'
import ChevronIcon from '../components/ChevronIcon.vue'
import { useRouter } from 'vue-router'
import { ITodoItem } from '@/types'
import { ref } from 'vue'

const router = useRouter()
const itemsStore = useTodoItems()

function addNewTask() {
  router.push('/new')
}

function editTask(todoItem: ITodoItem) {
  router.push(`/edit/${todoItem.id}`)
}

const collapsedCompleted = ref(true)
</script>

<template>
  <div class="w-screen h-screen px-3">
    <div class="h-4"></div>
    <div>
      <h2 class="font-bold text-4xl">Today</h2>
      <div class="h-1"></div>
      <h4 class="text-gray-600">Friday, May 24</h4>
    </div>
    <div class="h-5"></div>
    <div class="flex flex-col gap-y-4">
      <TodoItem
        v-for="todoItem in itemsStore.activeItems"
        @clicked-edit="editTask(todoItem)"
        :item="todoItem"
      />
    </div>

    <div v-if="itemsStore.completedItems.length !== 0">
      <div class="flex">
        <h3 class="font-bold text-lg leading-none mt-5 mb-3">Completed</h3>
        <div class="flex-1"></div>
        <ChevronIcon v-model="collapsedCompleted" />
      </div>

      <div v-if="!collapsedCompleted" class="flex flex-col gap-y-4">
        <TodoItem
          v-for="todoItem in itemsStore.completedItems"
          @clicked-edit="editTask(todoItem)"
          :item="todoItem"
        />
      </div>
    </div>

    <div class="fixed bottom-0 inset-x-0 px-4 py-5">
      <div
        class="border shadow-xl px-5 py-3 rounded-3xl text-gray-400 text-semibold mx-auto max-w-xs"
      >
        <button @click="addNewTask">Write a new task</button>
      </div>
    </div>
  </div>
</template>
