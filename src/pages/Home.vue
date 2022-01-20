<script setup lang="ts">
import Tasks from '@/components/Tasks.vue'
import WithAuth from '@/components/WithAuth.vue'
</script>

<template>
  <WithAuth>
    <template #default="{ user }">
      <Tasks :user="user" />
    </template>
  </WithAuth>
</template>
