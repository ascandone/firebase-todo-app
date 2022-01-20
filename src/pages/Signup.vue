<script setup lang="ts">
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import FieldSet from '@/components/FieldSet.vue'
import { useValidation } from '@/useValidation'

const email = useValidation((field) => {
  if (!field.includes('@')) {
    return 'Insert a valid email'
  }
})

const password = useValidation((field) => {
  if (field === '') {
    return 'Insert a valid password'
  }
})

const confirmPassword = useValidation((field) => {
  if (field !== password.value) {
    return 'This does not match the previous password'
  }
})

function onSubmit() {
  email.validate()
  password.validate()
  confirmPassword.validate()

  if (
    email.validationMsg === undefined &&
    password.validationMsg === undefined &&
    confirmPassword.validationMsg === undefined
  ) {
    console.log(email.value, password.value)
  }
}
</script>

<template>
  <div class="px-5 py-2">
    <div class="max-w-sm mx-auto">
      <h3 class="font-bold text-2xl mt-2 mb-4">Register</h3>
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

        <FieldSet id="email">
          <template #label>Confirm password</template>
          <template #input>
            <Input
              v-model="confirmPassword.value"
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
    </div>
  </div>
</template>
