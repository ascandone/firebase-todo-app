<script setup lang="ts">
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import FieldSet from '@/components/FieldSet.vue'
import Alert from '@/components/Alert.vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useEmailValidation, usePasswordValidation } from '@/validations'

const router = useRouter()

type AuthResponse =
  | { type: 'NOT_ASKED' }
  | { type: 'LOADING' }
  | { type: 'GOT_ERROR'; message: string }

const authResponse = ref<AuthResponse>({ type: 'NOT_ASKED' })
const email = useEmailValidation()
const password = usePasswordValidation()

async function onSubmit() {
  email.validate()
  password.validate()

  if (
    email.validationMsg === undefined &&
    password.validationMsg === undefined
  ) {
    console.log(email.value, password.value)
    authResponse.value = { type: 'LOADING' }
    const auth = getAuth()
    try {
      const creds = await signInWithEmailAndPassword(
        auth,
        email.value,
        password.value
      )

      console.log(creds)

      router.push('/')
    } catch (e) {
      authResponse.value = {
        type: 'GOT_ERROR',
        message: (e as Error).message,
      }
    }
  }
}
</script>

<template>
  <div class="px-5 py-2">
    <div class="max-w-sm mx-auto">
      <h3 class="font-bold text-2xl mt-2 mb-4">Login</h3>

      <div v-if="authResponse.type === 'GOT_ERROR'">
        <Alert type="error">
          {{ authResponse.message }}
        </Alert>
        <div class="h-5"></div>
      </div>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <FieldSet id="email">
          <template #label>Email</template>
          <template #input>
            <Input
              v-model="email.value"
              type="email"
              :validation-msg="email.validationMsg"
              @blur="email.validate"
            />
          </template>
        </FieldSet>

        <FieldSet id="email">
          <template #label>Password</template>
          <template #input>
            <Input
              v-model="password.value"
              type="password"
              :validation-msg="password.validationMsg"
              @blur="password.validate"
            />
          </template>
        </FieldSet>

        <div class="flex justify-end w-full pt-5">
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  </div>
</template>
