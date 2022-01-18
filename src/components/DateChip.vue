<script setup lang="ts">
import { CalendarIcon } from '@heroicons/vue/outline'
</script>

<template>
  <button
    class="rounded-lg border px-3 py-1.5 cursor-pointer inline-flex hover:bg-gray-50"
  >
    <CalendarIcon class="h-6 w-6 text-indigo-700" />
    <div class="w-2"></div>
    <span class="text-gray-600"> Fri, May 24 </span>
  </button>
</template>
