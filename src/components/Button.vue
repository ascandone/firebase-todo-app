<script setup lang="ts">
export type Variant = 'primary' | 'danger'
export type Size = 'medium' | 'small'

export interface Props {
  variant?: Variant
  size?: Size
  type?: 'button' | 'submit'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  type: 'button',
  size: 'medium',
})
</script>
<template>
  <button
    :class="{
      'font-semibold shadow border leading-none rounded-md transition-colors duration-100': true,
      ' px-3 py-2': props.size === 'medium',
      ' px-2 py-1.5 text-sm': props.size === 'small',
      ' bg-gray-50 hover:bg-gray-100': props.variant === 'primary',
      'bg-gray-50 text-rose-800 hover:bg-rose-800 hover:text-rose-100':
        props.variant === 'danger',
    }"
    :type="props.type"
  >
    <slot />
  </button>
</template>
