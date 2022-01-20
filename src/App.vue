<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { useAuth } from '@/stores/auth'

const store = useAuth()

const auth = getAuth()

onAuthStateChanged(auth, (user) => {
  store.user = user
})
</script>

<template>
  <RouterView></RouterView>
</template>
