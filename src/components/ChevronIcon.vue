<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/outline'

const props = defineProps<{ modelValue: boolean }>()

export interface Emits {
  (e: 'update:modelValue', value: boolean): void
}

const emits = defineEmits<Emits>()

function handleClick() {
  emits('update:modelValue', !props.modelValue)
}
</script>

<template>
  <button class="p-2" @click="handleClick">
    <ChevronDownIcon
      :class="{
        'h-6 w-6 transform transition-transform duration-150 ease-out ': true,
        'rotate-180': !props.modelValue,
      }"
    />
  </button>
</template>
