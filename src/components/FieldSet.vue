<script setup lang="ts">
const props = defineProps<{ id: string }>()
</script>
<template>
  <fieldset>
    <label :for="props.id" class="font-bold text-sm">
      <span><slot name="label" /></span>
    </label>
    <div class="h-2"></div>
    <slot name="input" :id="props.id" />
  </fieldset>
</template>
