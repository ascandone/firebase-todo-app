<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/solid'

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
  <input
    type="checkbox"
    :checked="props.modelValue"
    @input="update"
    class="hidden"
  />
  <div
    @click.prevent="update"
    :class="{
      'rounded-md border w-6 h-6 p-0.5 shadow inline-flex text-white': true,
      'hover:ring group-hover:ring ring-pink-100 cursor-pointer select-none': true,
      'transition-colors duration-100': true,
      'bg-pink-500': props.modelValue,
    }"
  >
    <CheckIcon v-if="props.modelValue" />
  </div>
</template>
