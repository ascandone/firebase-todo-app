<script setup lang="ts">
export type Variant = 'primary' | 'danger'

export interface Props {
  variant?: Variant
  type?: 'button' | 'submit'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  type: 'button',
})
</script>
<template>
  <button
    class="font-bold border leading-none px-3 py-2 rounded-md shadow bg-gray-50 hover:bg-gray-100 transition-colors duration-100"
    :type="props.type"
  >
    <slot />
  </button>
</template>
