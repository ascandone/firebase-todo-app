<script setup lang="ts">
import { useAuth } from '@/stores/auth'
import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'
const authStore = useAuth()

const router = useRouter()
watchEffect(() => {
  if (authStore.user === null) {
    router.push('/login')
  }
})
</script>
<template>
  <slot v-if="authStore.user !== null" :user="authStore.user" />
</template>
