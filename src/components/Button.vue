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
    :class="{
      'font-semibold shadow border leading-none px-3 py-2 rounded-md transition-colors duration-100': true,
      ' bg-gray-50 hover:bg-gray-100': props.variant === 'primary',
      'bg-gray-50 text-rose-800 hover:bg-rose-800 hover:text-rose-100':
        props.variant === 'danger',
    }"
    :type="props.type"
  >
    <slot />
  </button>
</template>
