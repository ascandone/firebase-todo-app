<script setup lang="ts">
import { TransitionGroup } from 'vue'
import { useTodoItems } from '@/stores/todoItems'
import TodoItem from '@/components/TodoItem.vue'
import ChevronIcon from '@/components/ChevronIcon.vue'
import { PlusIcon } from '@heroicons/vue/solid'
import { useRouter } from 'vue-router'
import { ITodoItem } from '@/types'
import { ref } from 'vue'
import { User } from 'firebase/auth'

export interface Props {
  user: User
}

const props = defineProps<Props>()

const router = useRouter()
const itemsStore = useTodoItems()

function addNewTask() {
  router.push('/new')
}

function editTask(todoItem: ITodoItem) {
  router.push(`/edit/${todoItem.id}`)
}

const collapsedCompleted = ref(false)
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

    <TransitionGroup
      tag="div"
      class="flex flex-col gap-y-4"
      move-class="transition-all duration-500"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div v-for="todoItem in itemsStore.activeItems" :key="todoItem.id">
        <TodoItem @clicked-edit="editTask(todoItem)" :item="todoItem" />
      </div>

      <div
        v-if="itemsStore.completedItems.length !== 0"
        key="separator"
        class="flex transition-none z-10 bg-white"
      >
        <h3 class="font-bold text-lg leading-none mt-5 mb-3">Completed</h3>
        <div class="flex-1"></div>
        <ChevronIcon v-model="collapsedCompleted" />
      </div>

      <div
        v-for="todoItem in itemsStore.completedItems"
        :class="{ 'invisible ': !collapsedCompleted }"
        :key="todoItem.id"
      >
        <TodoItem @clicked-edit="editTask(todoItem)" :item="todoItem" />
      </div>
    </TransitionGroup>

    <div class="fixed bottom-0 right-0 px-4 py-4">
      <button
        @click="addNewTask"
        class="border shadow-xl h-14 w-14 rounded-full bg-pink-500 text-white flex items-center justify-center"
      >
        <PlusIcon class="h-8 w-8" />
      </button>
    </div>
  </div>
</template>
