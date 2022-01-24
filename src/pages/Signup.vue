<script setup lang="ts">
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import FieldSet from '@/components/FieldSet.vue'
import Alert from '@/components/Alert.vue'
import Link from '@/components/Link.vue'
import { useValidation } from '@/useValidation'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useEmailValidation, usePasswordValidation } from '@/validations'
import { RemoteLoading } from '@/remoteLoading'
const router = useRouter()

const authResponse = ref<RemoteLoading>({ type: 'NOT_ASKED' })
const email = useEmailValidation()
const password = usePasswordValidation()

const confirmPassword = useValidation((field) => {
  if (field !== password.value) {
    return 'This does not match the previous password'
  }
})

async function onSubmit() {
  email.validate()
  password.validate()
  confirmPassword.validate()

  if (
    email.validationMsg === undefined &&
    password.validationMsg === undefined &&
    confirmPassword.validationMsg === undefined
  ) {
    console.log(email.value, password.value)
    authResponse.value = { type: 'LOADING' }
    const auth = getAuth()
    try {
      const creds = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      )
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
      <h3 class="font-bold text-2xl mt-2 mb-4">Register</h3>

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
              :disabled="authResponse.type === 'LOADING'"
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
              :disabled="authResponse.type === 'LOADING'"
              type="password"
              :validation-msg="password.validationMsg"
              @blur="password.validate"
            />
          </template>
        </FieldSet>

        <FieldSet id="email">
          <template #label>Confirm password</template>
          <template #input>
            <Input
              v-model="confirmPassword.value"
              :disabled="authResponse.type === 'LOADING'"
              type="password"
              :validation-msg="confirmPassword.validationMsg"
              @blur="confirmPassword.validate"
            />
          </template>
        </FieldSet>

        <div class="flex justify-end w-full pt-5">
          <Button type="submit">Signup</Button>
        </div>
      </form>

      <div class="mt-10">
        <p class="text-sm text-center text-gray-700">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  </div>
</template>
