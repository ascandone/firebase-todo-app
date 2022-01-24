<script setup lang="ts">
import { RouterLink } from 'vue-router'

export interface Props {
  to: string
}

const props = defineProps<Props>()
</script>

<template>
  <RouterLink class="underline text-blue-800 font-semibold" :to="props.to">
    <slot />
  </RouterLink>
</template>
