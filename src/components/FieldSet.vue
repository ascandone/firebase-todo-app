<script setup lang="ts">
export interface Props {
  id?: string
  validationMsg?: string
}

const props = defineProps<Props>()
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
