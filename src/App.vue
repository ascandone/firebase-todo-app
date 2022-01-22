<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { useAuth } from '@/stores/auth'
import { ref } from 'vue'

const store = useAuth()

const auth = getAuth()

const loadingUser = ref(true)
onAuthStateChanged(auth, (user) => {
  store.user = user
  loadingUser.value = false
})
</script>

<template>
  <div class="mx-auto max-w-md">
    <RouterView v-if="!loadingUser"></RouterView>
  </div>
</template>
