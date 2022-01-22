<script setup lang="ts">
import { ref } from 'vue'
import FieldSet from '@/components/FieldSet.vue'
import Input from '@/components/Input.vue'
import TextArea from '@/components/TextArea.vue'
import Button from '@/components/Button.vue'

export interface Props {
  submitLabel: string
  initialTitle?: string
  initialDescription?: string
}

export interface Payload {
  title: string
  description?: string
}

export interface Emits {
  (e: 'submit', value: Payload): void
}

const props = withDefaults(defineProps<Props>(), {
  initialTitle: '',
  initialDescription: '',
})

const title = ref(props.initialTitle)
const description = ref(props.initialDescription)

const emits = defineEmits<Emits>()

function handleSubmit() {
  const payloadDescription =
    description.value.trim().length === 0 ? undefined : description.value.trim()

  if (title.value.trim().length !== 0) {
    emits('submit', {
      title: title.value,
      description: payloadDescription,
    })
  }
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

    <div class="flex w-full justify-end gap-x-4">
      <slot name="secondary-cta" />
      <Button type="submit">
        {{ props.submitLabel }}
      </Button>
    </div>
  </form>
</template>
