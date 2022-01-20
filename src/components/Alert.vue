<script setup lang="ts">
export type Type = 'default' | 'error'

export interface Props {
  type?: Type
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
})
</script>
<template>
  <div
    :class="{
      'border-l-4 px-4 py-3 rounded-r': true,
      'border-blue-900 text-blue-900 bg-blue-100': props.type === 'default',
      'border-red-900 text-red-900 bg-red-100': props.type === 'error',
    }"
  >
    <slot />
  </div>
</template>
