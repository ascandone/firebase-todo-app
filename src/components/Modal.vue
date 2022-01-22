<script setup lang="ts">
import { XIcon } from '@heroicons/vue/solid'

export interface Props {
  header: string
}

export interface Emits {
  (e: 'closed-modal'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
</script>
<template>
  <div class="absolute bg-gray-800 bg-opacity-40 w-full inset-0 z-40 p-4">
    <div class="mx-auto max-w-md bg-white rounded-md px-4 py-3">
      <div class="flex">
        <h2 class="font-bold text-2xl">{{ props.header }}</h2>
        <div class="flex-1"></div>
        <button
          @click="emit('closed-modal')"
          class="hover:bg-gray-50 rounded-full p-2 -m-2"
        >
          <XIcon class="h-8 w-8 text-gray-800" />
        </button>
      </div>
      <div class="h-4"></div>

      <slot />
    </div>
  </div>
</template>
