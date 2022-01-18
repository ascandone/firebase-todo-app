<script setup lang="ts">
import { inputClass } from './inputClass'
export interface Props {
  modelValue: string
  id?: string
}
export interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

function update(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>
<template>
  <textarea
    :id="props.id"
    type="text"
    :rows="5"
    @input="update"
    :value="modelValue"
    :class="inputClass"
  />
</template>
