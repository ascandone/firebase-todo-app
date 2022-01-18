<script setup lang="ts">
import { StarIcon } from '@heroicons/vue/outline'

export interface Props {
  modelValue: boolean
}
export interface Emits {
  (e: 'update:modelValue', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

function update() {
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <button
    @click="update"
    class="hover:bg-yellow-50 rounded-full p-2 cursor-pointer text-gray-500 hover:text-yellow-500"
  >
    <StarIcon
      :class="{
        'h-7 w-7': true,
        'fill-yellow-500 text-yellow-500': props.modelValue,
      }"
    />
  </button>
</template>
