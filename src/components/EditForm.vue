<script setup lang="ts">
import FieldSet from './FieldSet.vue'
import Input from './Input.vue'
import TextArea from './TextArea.vue'
import { ref } from 'vue'
import { emit } from 'process'

export interface Props {
  submitLabel: string
  initialTitle?: string
  initialDescription?: string
}

const props = withDefaults(defineProps<Props>(), {
  initialTitle: '',
  initialDescription: '',
})

export interface Payload {
  title: string
  description?: string
}

export interface Emits {
  (e: 'submit', value: Payload): void
}

const title = ref(props.initialTitle)
const description = ref(props.initialDescription)

const emits = defineEmits<Emits>()

function handleSubmit() {
  const payloadDescription =
    description.value.trim().length === 0 ? undefined : description.value.trim()

  emits('submit', {
    title: title.value,
    description: payloadDescription,
  })
}
</script>
<template>
  <form @submit.prevent="handleSubmit">
    <FieldSet id="todoitem-title">
      <template #label>Title</template>
      <template #input="{ id }">
        <Input :id="id" v-model="title" />
      </template>
    </FieldSet>

    <div class="h-4"></div>

    <FieldSet id="todoitem-title">
      <template #label>Description</template>
      <template #input="{ id }">
        <TextArea :id="id" v-model="description" />
      </template>
    </FieldSet>

    <div class="h-5"></div>

    <div class="flex w-full justify-end">
      <button
        class="font-bold border leading-none px-3 py-2 rounded-md shadow-sm"
        type="submit"
      >
        {{ props.submitLabel }}
      </button>
    </div>
  </form>
</template>
