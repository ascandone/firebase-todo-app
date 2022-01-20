<script setup lang="ts">
import { useAuth } from '@/stores/auth'
import { useRouter } from 'vue-router'
const authStore = useAuth()

const router = useRouter()
if (authStore.user === null) {
  console.log('redirecting..')
  router.push('/login')
}
</script>
<template>
  <slot v-if="authStore.user !== null" :user="authStore.user" />
</template>
