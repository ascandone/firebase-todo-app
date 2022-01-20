<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import FieldSet from '@/components/FieldSet.vue'

const email = ref('')
const emailValidationMsg = ref<string | undefined>(undefined)

function validateEmail() {
  if (email.value === '' || !email.value.includes('@')) {
    emailValidationMsg.value = 'Insert a valid email'
  } else {
    emailValidationMsg.value = undefined
  }
}

const password = ref('')
const passwordValidationMsg = ref<string | undefined>(undefined)

function validatePassword() {
  if (password.value === '') {
    passwordValidationMsg.value = 'Insert a valid password'
  } else {
    passwordValidationMsg.value = undefined
  }
}

function onSubmit() {
  validateEmail()
  validatePassword()
  if (
    emailValidationMsg.value === undefined &&
    passwordValidationMsg.value === undefined
  ) {
    console.log(email.value, password.value)
  }
}
</script>

<template>
  <div class="px-5 py-2">
    <div class="max-w-sm mx-auto">
      <h3 class="font-bold text-2xl mt-2 mb-4">Login</h3>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <FieldSet id="email">
          <template #label>Email</template>
          <template #input>
            <Input
              v-model="email"
              type="email"
              :validation-msg="emailValidationMsg"
              @blur="validateEmail"
            />
          </template>
        </FieldSet>

        <FieldSet id="email">
          <template #label>Password</template>
          <template #input>
            <Input
              v-model="password"
              type="password"
              :validation-msg="passwordValidationMsg"
              @blur="validatePassword"
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
