<script setup lang="ts">
import { inputClass } from './inputClass'

export type Type = 'text' | 'email' | 'password'

export interface Props {
  modelValue: string
  id?: string
  type?: Type
  validationMsg?: string
}

export interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
})

const emit = defineEmits<Emits>()

function update(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>
<template>
  <input
    autocomplete="off"
    :id="props.id"
    :type="props.type"
    @input="update"
    @blur="emit('blur')"
    :value="modelValue"
    :class="inputClass(props.validationMsg !== undefined)"
  />
  <span
    v-if="props.validationMsg"
    class="text-red-700 font-semibold leading-none text-xs"
  >
    {{ props.validationMsg }}
  </span>
</template>
